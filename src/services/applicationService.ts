import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import database from '../../database';
import getAllApplications from '../api/application/getAllApplications';

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

export const updateApplication = async (application: Application) => {
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
        args: [values, id],
      },
    ],
    readOnly
  );
};

export type FindApplicationOptions = {
  filter?: {
    property?: string;
  };
};

export const findApplications = async (options: FindApplicationOptions): Promise<Application[]> => {
  const where: string[] = [];
  const args: any[] = [];

  if (options.filter?.property) {
    where.push('property LIKE ? COLLATE NOCASE');
    args.push(options.filter.property);
  }

  let whereSql = '';
  if (where.length) {
    whereSql = `WHERE ${where.map((value) => `(${value})`).join(' AND ')}`;
  }

  return new Promise((resolve) => {
    database.transaction((transaction) => {
      const sql = `
        SELECT *
        FROM application
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

export const pullApplications = async () => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  if (!accessToken) return;

  const applications: Application[] = [];
  for (let skip = 0; true; skip += 50) {
    const data: any[] = await getAllApplications({
      accessToken,
      limit: 50,
      skip,
    });
    applications.push(...data);
    if (data.length < 50) break;
  }

  for (const application of applications) {
    const queryLocalApplication: any = await database.execAsync(
      [{ sql: 'SELECT * FROM application WHERE guid = ?', args: [application.guid] }],
      true
    );
    const localApplication: Application = queryLocalApplication[0].rows[0];

    if (!localApplication) {
      await createApplication({
        ...application,
        id: uuid.v4() as string,
      });
    } else if (application.updatedAt > localApplication.updatedAt) {
      await updateApplication({
        ...application,
        id: localApplication.id,
      });
    }
  }
};
