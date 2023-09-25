import database from '../../database';

export type Exit = {
  id: string;
  createdAt: number;
  updatedAt: number;
  property: string;
  type: string;
  plantCount: number;
  notes: string;
};

export const createExits = (exits: Exit[]) => {
  const keys: (keyof Exit)[] = [
    'id',
    'createdAt',
    'updatedAt',
    'property',
    'type',
    'plantCount',
    'notes',
  ];

  const values: string[] = [];
  const args: any[] = [];

  exits.forEach((exit) => {
    const data: any[] = keys.map((key) => exit[key]);
    values.push(`(${Array(data.length).fill('?').join(',')})`);
    args.push(...data);
  });

  database.transaction((transaction) => {
    transaction.executeSql(
      `
        INSERT INTO exit (${keys.join(',')})
        VALUES ${values.join(',')};
      `,
      args
    );
  });
};

export const findExits = async (): Promise<Exit[]> => {
  return new Promise((resolve) => {
    database.transaction((transaction) => {
      transaction.executeSql('SELECT * FROM exit', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
};
