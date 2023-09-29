import database from '../../database';

export type Exit = {
  id: string;
  createdAt: number;
  updatedAt: number;
  createdBy: string;
  updatedBy: string;
  property: string;
  type: string;
  plantCount: string;
  notes: string;
  imageUri: string;
  latitude: number;
  longitude: number;
};

export const createExits = async (exits: Exit[]): Promise<void> => {
  const keys: (keyof Exit)[] = [
    'id',
    'createdAt',
    'updatedAt',
    'createdBy',
    'updatedBy',
    'property',
    'type',
    'plantCount',
    'notes',
    'imageUri',
    'latitude',
    'longitude',
  ];

  const values: string[] = [];
  const args: any[] = [];

  exits.forEach((exit) => {
    const data: any[] = keys.map((key) => exit[key]);
    values.push(`(${Array(data.length).fill('?').join(',')})`);
    args.push(...data);
  });

  return new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `
        INSERT INTO exit (${keys.join(',')})
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

export const findExits = async (): Promise<Exit[]> => {
  return new Promise((resolve) => {
    database.transaction((transaction) => {
      const sql = `
        SELECT *
        FROM exit
        ORDER BY createdAt DESC
      `;
      transaction.executeSql(sql, [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
};

export const findOneExit = async (id: string): Promise<Exit> => {
  return new Promise((resolve) => {
    database.transaction((transaction) => {
      transaction.executeSql('SELECT * FROM exit WHERE id = ?', [id], (_, { rows }) => {
        resolve(rows._array[0]);
      });
    });
  });
};
