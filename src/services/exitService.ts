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
    values.push(`(${keys.map(() => '?').join(',')})`);
    args.push(...keys.map((key) => exit[key]));
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

export type FindExitOptions = {
  paging?: {
    limit: number;
    offset: number;
  };
  filter?: {
    createdAt?: {
      lower: Date;
      upper: Date;
    };
  };
  sorting?: {
    createdAt: 'ASC' | 'DESC';
  };
};

export const findExits = async (options: FindExitOptions): Promise<Exit[]> => {
  const args: any[] = [];
  const where: string[] = [];

  if (options.filter?.createdAt) {
    where.push('createdAt BETWEEN ? AND ?');
    args.push(options.filter.createdAt.lower.getTime());
    args.push(options.filter.createdAt.upper.getTime());
  }

  let whereSql = '';
  if (where.length) {
    whereSql = `WHERE ${where.map((value) => `(${value})`).join(' AND ')}`;
  }

  return new Promise((resolve) => {
    database.transaction((transaction) => {
      const sql = `
        SELECT *
        FROM exit
        ${whereSql}
        ORDER BY createdAt DESC
      `;
      transaction.executeSql(sql, args, (_, { rows }) => {
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
