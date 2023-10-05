import database from '../../database';

database.transaction((transaction) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS application (
      id TEXT PRIMARY KEY,
      createdAt INTEGER,
      updatedAt INTEGER,
      createdBy TEXT,
      updatedBy TEXT,
      property TEXT,
      applicationMonth TEXT,
      state TEXT,
      scheduledDate INTEGER,
      concept TEXT,
      containerAmount TEXT,
      notes TEXT
    );
  `;
  transaction.executeSql(sql, [], undefined, (_, error) => {
    console.error(error);
    return false;
  });
});

export type Application = {
  id: string;
  createdAt: number;
  updatedAt: number;
  createdBy: string;
  updatedBy: string;
  property: string;
  applicationMonth: string;
  state: 'inProcess' | 'finalized';
  scheduledDate: number;
  concept: string;
  containerAmount: string;
  notes: string;
};

const keys: (keyof Application)[] = [
  'id',
  'createdAt',
  'updatedAt',
  'createdBy',
  'updatedBy',
  'property',
  'applicationMonth',
  'state',
  'scheduledDate',
  'concept',
  'containerAmount',
  'notes',
];

export const createApplications = async (applications: Application[]): Promise<void> => {
  const values: string[] = [];
  const args: any[] = [];

  applications.forEach((application) => {
    values.push(`(${keys.map(() => '?').join(',')})`);
    args.push(...keys.map((key) => application[key]));
  });

  return new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `
          INSERT INTO application (${keys.join(',')})
          VALUES ${values.join(',')};
        `,
        args,
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const findApplications = async (): Promise<Application[]> => {
  return new Promise((resolve) => {
    database.transaction((transaction) => {
      const sql = `
        SELECT *
        FROM application
      `;
      transaction.executeSql(sql, [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
};
