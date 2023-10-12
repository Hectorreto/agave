import database from '../../database';

database.transaction((transaction) => {
  transaction.executeSql(
    `
      CREATE TABLE IF NOT EXISTS property (
        id TEXT PRIMARY KEY,
        createdAt INTEGER,
        updatedAt INTEGER,
        createdBy TEXT,
        updatedBy TEXT,
        name TEXT,
        plantingYear INTEGER,
        cropType TEXT,
        location TEXT,
        hectareNumber TEXT,
        plantsPlantedNumber TEXT,
        invoice TEXT,
        registry TEXT,
        internalIdentifier TEXT,
        boardsPerProperty TEXT,
        active INTEGER
      )
    `,
    [],
    undefined,
    (_, error) => {
      console.error(error);
      return true;
    }
  );
});

export type Property = {
  id: string;
  createdAt: number;
  updatedAt: number;
  createdBy: string;
  updatedBy: string;
  name: string;
  plantingYear: number;
  cropType: string;
  location: string;
  hectareNumber: string;
  plantsPlantedNumber: string;
  invoice: string;
  registry: string;
  internalIdentifier: string;
  boardsPerProperty: string;
  active: number;
};

export const createProperty = (property: Property): Promise<void> => {
  const nowTime = new Date().getTime();
  const propertyCopy: Property = {
    ...property,
    createdAt: nowTime,
    updatedAt: nowTime,
  };

  const keys = Object.keys(propertyCopy) as (keyof Property)[];
  const args: any[] = keys.map((key) => propertyCopy[key]);

  return new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `
          INSERT INTO property (${keys.join(',')})
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

type FindPropertyOptions = {
  filter?: {
    id?: string;
    name?: string;
  };
};

export const findProperties = (options: FindPropertyOptions): Promise<Property[]> => {
  const where: string[] = [];
  const args: any[] = [];

  if (options.filter?.id) {
    where.push('id = ?');
    args.push(options.filter.id);
  }

  if (options.filter?.name) {
    where.push('name LIKE ? COLLATE NOCASE');
    args.push(options.filter.name);
  }

  let whereSql = '';
  if (where.length) {
    whereSql = `WHERE ${where.map((value) => `(${value})`).join(' AND ')}`;
  }

  return new Promise((resolve) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `
          SELECT *
          FROM property
          ${whereSql}
        `,
        args,
        (_, { rows }) => {
          resolve(rows._array);
        }
      );
    });
  });
};
