import AsyncStorage from '@react-native-async-storage/async-storage';

import database from '../../database';
import finalizeApplication from '../api/application/finalizeApplication';
import getAllApplications from '../api/application/getAllApplications';
import postApplication from '../api/application/postApplication';
import startApplication from '../api/application/startApplication';

database.transaction((transaction) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS application (
      id TEXT PRIMARY KEY,
      guid TEXT,
      createdAt INTEGER,
      updatedAt INTEGER,
      createdBy TEXT,
      updatedBy TEXT,
      applicationMonth TEXT,
      state TEXT,
      scheduledDate INTEGER,
      concept TEXT,
      containerAmount TEXT,
      notes TEXT,
      videoUri TEXT,
      finalizeVideoUri TEXT,
      products TEXT,
      propertyId TEXT,
      
      FOREIGN KEY(propertyId) REFERENCES property(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
    );
  `;
  transaction.executeSql(sql, [], undefined, (_, error) => {
    console.error(error);
    return true;
  });
});

export type Application = {
  id: string;
  guid: string;
  createdAt: number;
  updatedAt: number;
  createdBy: string;
  updatedBy: string;
  applicationMonth: string;
  state: 'scheduled' | 'inProcess' | 'finalized';
  scheduledDate: number;
  concept: string;
  containerAmount: string;
  notes: string;
  videoUri: string;
  finalizeVideoUri: string;
  products: string;
  propertyId: string;
  propertyName?: string;
};

export type Product = {
  name: string;
  amount: string;
  realAmount?: string;
};

export const getProducts = (value: string): Product[] => {
  try {
    return JSON.parse(value);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createApplication = (application: Application): Promise<void> => {
  const keys = Object.keys(application);
  const values = Object.values(application);

  return new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `
          INSERT INTO application (${keys.join(',')})
          VALUES (${keys.map(() => '?').join(',')})
        `,
        values,
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
  });
};

export const updateApplication = async (application: Partial<Application>) => {
  const { id, ...update } = application;
  const readOnly = false;

  const keys = Object.keys(update);
  const values = Object.values(update);

  await database.execAsync(
    [
      {
        sql: `
          UPDATE application
          SET ${keys.map((key) => `${key} = ?`).join(',')}
          WHERE id = ?
        `,
        args: [...values, id],
      },
    ],
    readOnly
  );
};

export type FindApplicationOptions = {
  filter?: {
    search?: string;
  };
  sorting?: {
    createdAt?: 'ASC' | 'DESC';
  };
};

export const findApplications = async (options: FindApplicationOptions): Promise<Application[]> => {
  const where: string[] = [];
  const args: any[] = [];

  if (options.filter?.search) {
    where.push('propertyName LIKE ? COLLATE NOCASE');
    args.push(options.filter.search);
  }

  let whereSql = '';
  if (where.length) {
    whereSql = `WHERE ${where.map((value) => `(${value})`).join(' AND ')}`;
  }

  let orderSql = '';
  if (options.sorting?.createdAt === 'ASC') {
    orderSql = 'ORDER BY createdAt ASC';
  }
  if (options.sorting?.createdAt === 'DESC') {
    orderSql = 'ORDER BY createdAt DESC';
  }

  return new Promise((resolve) => {
    database.transaction((transaction) => {
      const sql = `
        SELECT application.*, property.name AS propertyName
        FROM application
        LEFT JOIN property ON 
          property.id = application.propertyId OR 
          property.guid = application.propertyId
        ${whereSql}
        ${orderSql}
      `;
      transaction.executeSql(sql, args, (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
};

export const syncApplications = async () => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  if (!accessToken) return;

  const remoteApplications: Application[] = [];
  for (let skip = 0; true; skip += 50) {
    const data: any[] = await getAllApplications({
      accessToken,
      limit: 50,
      skip,
    });
    remoteApplications.push(...data);
    if (data.length < 50) break;
  }

  await pullApplications(remoteApplications);
  await pushApplications(remoteApplications, accessToken);
};

const pullApplications = async (remoteApplications: Application[]) => {
  for (const remoteApplication of remoteApplications) {
    const queryLocalApplication: any = await database.execAsync(
      [{ sql: 'SELECT * FROM application WHERE guid = ?', args: [remoteApplication.guid] }],
      true
    );
    const localApplication: Application = queryLocalApplication[0].rows[0];

    if (!localApplication) {
      await createApplication(remoteApplication);
    } else if (remoteApplication.updatedAt > localApplication.updatedAt) {
      await updateApplication({
        ...remoteApplication,
        id: localApplication.id,
      });
    }
  }
};

const pushApplications = async (remoteApplications: Application[], accessToken: string) => {
  const localApplications = await findApplications({});

  for (const localApplication of localApplications) {
    const remoteApplication = remoteApplications.find((v) => v.guid === localApplication.guid);

    if (!remoteApplication) {
      const products = getProducts(localApplication.products);

      const guid = await postApplication({
        accessToken,
        application: localApplication,
        products,
      });

      await database.execAsync(
        [
          {
            sql: 'UPDATE application SET guid = ? WHERE id = ?',
            args: [guid, localApplication.id],
          },
        ],
        false
      );
    } else if (localApplication.videoUri && !remoteApplication.videoUri) {
      await startApplication({ accessToken, application: localApplication });
    } else if (localApplication.finalizeVideoUri && !remoteApplication.finalizeVideoUri) {
      const products = getProducts(localApplication.products);
      await finalizeApplication({ accessToken, application: localApplication, products });
    } else if (localApplication.updatedAt > remoteApplication.updatedAt) {
      console.log('update remote application');
    }
  }
};
