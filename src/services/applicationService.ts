import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { findProducts } from './productService';
import { findProperties } from './propertyService';
import database from '../../database';
import getAllApplications from '../api/application/getAllApplications';
import postApplication from '../api/application/postApplication';

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
      propertyId TEXT
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
  propertyId: string;
  propertyName: string;
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

  return new Promise((resolve) => {
    database.transaction((transaction) => {
      const sql = `
        SELECT application.*, property.name AS propertyName
        FROM application
        LEFT JOIN property ON
          property.id   = application.propertyId OR
          property.guid = application.propertyId
        ${whereSql}
      `;
      transaction.executeSql(sql, args, (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
};

export const finalizeApplication = (
  applicationId: string,
  finalizeVideoUri: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `
          UPDATE application
          SET 
            state = 'finalized',
            finalizeVideoUri = ?,
            updatedAt = ?
          WHERE id = ?
        `,
        [finalizeVideoUri, new Date().getTime(), applicationId],
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
      await createApplication({
        ...remoteApplication,
        id: uuid.v4() as string,
      });
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
  const localProducts = await findProducts({});
  const localProperties = await findProperties({});

  for (const localApplication of localApplications) {
    const remoteApplication = remoteApplications.find((v) => v.guid === localApplication.guid);

    if (!remoteApplication) {
      const products = localProducts.filter((v) => v.applicationId === localApplication.id);
      const property = localProperties.find(
        (v) => v.id === localApplication.propertyId || v.guid === localApplication.propertyId
      );
      if (!property) continue;

      const guid = await postApplication({
        accessToken,
        application: localApplication,
        products,
        property,
      });

      await updateApplication({
        id: localApplication.id,
        guid,
      });
    }
  }
};
