import database from '../../database';

database.transaction((transaction) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS application (
      id TEXT PRIMARY KEY,
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
  createdAt: number;
  updatedAt: number;
  createdBy: string;
  updatedBy: string;
  applicationMonth: string;
  state: 'inProcess' | 'finalized';
  scheduledDate: number;
  concept: string;
  containerAmount: string;
  notes: string;
  videoUri: string;
  finalizeVideoUri: string;
  propertyId: string;
};

export const createApplication = (application: Application): Promise<void> => {
  const nowTime = new Date().getTime();
  const applicationCopy = {
    ...application,
    createdAt: nowTime,
    updatedAt: nowTime,
  };

  const keys = Object.keys(application) as (keyof Application)[];
  const args = keys.map((key) => applicationCopy[key]);

  return new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `
          INSERT INTO application (${keys.join(',')})
          VALUES (${keys.map(() => '?').join(',')})
        `,
        args,
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
