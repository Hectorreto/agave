import database from '../../database';

database.transaction((transaction) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS exit (
      id TEXT PRIMARY KEY,
      createdAt INTEGER,
      updatedAt INTEGER,
      createdBy TEXT,
      updatedBy TEXT,
      property TEXT,
      type TEXT,
      plantCount TEXT,
      notes TEXT,
      imageUri TEXT,
      latitude REAL,
      longitude REAL
    );      
  `;
  transaction.executeSql(sql, [], undefined, (_, error) => {
    console.error(error);
    return true;
  });
});

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

export const createExits = async (exits: Exit[]): Promise<void> => {
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
          return true;
        }
      );
    });
  });
};

export type FindExitOptions = {
  filter?: {
    createdAt?: {
      lower: Date;
      upper: Date;
    };
    property?: string;
    type?: string;
    plantCount?: string;
  };
  sorting?: {
    createdAt: 'ASC' | 'DESC';
  };
};

export const findExits = (options: FindExitOptions): Promise<Exit[]> => {
  const where: string[] = [];
  const args: any[] = [];

  if (options.filter?.createdAt) {
    where.push('createdAt BETWEEN ? AND ?');
    args.push(options.filter.createdAt.lower.getTime());
    args.push(options.filter.createdAt.upper.getTime());
  }

  // search
  const whereOr: string[] = [];
  if (options.filter?.property) {
    whereOr.push('property LIKE ? COLLATE NOCASE');
    args.push(options.filter.property);
  }
  if (options.filter?.type) {
    whereOr.push('type LIKE ? COLLATE NOCASE');
    args.push(options.filter.type);
  }
  if (options.filter?.plantCount) {
    whereOr.push('plantCount LIKE ? COLLATE NOCASE');
    args.push(options.filter.plantCount);
  }
  if (whereOr.length) {
    where.push(whereOr.join(' OR '));
  }

  let whereSql = '';
  if (where.length) {
    whereSql = `WHERE ${where.map((value) => `(${value})`).join(' AND ')}`;
  }

  let orderSql = 'ORDER BY createdAt DESC';
  if (options.sorting?.createdAt === 'ASC') {
    orderSql = 'ORDER BY createdAt ASC';
  }

  return new Promise((resolve) => {
    database.transaction((transaction) => {
      const sql = `
        SELECT *
        FROM exit
        ${whereSql}
        ${orderSql}
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
