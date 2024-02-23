import AsyncStorage from '@react-native-async-storage/async-storage';

import database from '../../database';
import getAllProperties from '../api/property/getAllProperties';

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
        plantingYear TEXT,
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
  plantingYear: string;
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
  const keys = Object.keys(property);
  const values = Object.values(property);

  return new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `
          INSERT INTO property (${keys.join(',')})
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

export const updateProperty = async (property: Property): Promise<void> => {
  const { id, ...update } = property;
  const readOnly = false;

  const keys = Object.keys(update);
  const values = Object.values(update);

  await database.execAsync(
    [
      {
        sql: `
          UPDATE property
          SET ${keys.map((key) => `${key} = ?`).join(',')}
          WHERE id = ?
        `,
        args: [...values, id],
      },
    ],
    readOnly
  );
};

type FindPropertyOptions = {
  filter?: {
    id?: string;
    search?: string;
  };
  sorting?: {
    createdAt?: 'ASC' | 'DESC';
  };
};

export const findProperties = (options: FindPropertyOptions): Promise<Property[]> => {
  const where: string[] = [];
  const args: any[] = [];

  if (options.filter?.id) {
    where.push('id = ?');
    args.push(options.filter.id);
  }

  if (options.filter?.search) {
    where.push(
      [
        'name LIKE ? COLLATE NOCASE',
        'registry LIKE ? COLLATE NOCASE',
        'internalIdentifier LIKE ? COLLATE NOCASE',
        'plantingYear LIKE ? COLLATE NOCASE',
      ].join(' OR ')
    );
    args.push(
      options.filter.search,
      options.filter.search,
      options.filter.search,
      options.filter.search
    );
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
      transaction.executeSql(
        `
          SELECT *
          FROM property
          ${whereSql}
          ${orderSql}
        `,
        args,
        (_, { rows }) => {
          resolve(rows._array);
        }
      );
    });
  });
};

export const syncProperties = async () => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  if (!accessToken) return;

  const remoteProperties: Property[] = [];
  for (let skip = 0; true; skip += 50) {
    const data = await getAllProperties({
      accessToken,
      limit: 50,
      skip,
    });
    remoteProperties.push(...data);
    if (data.length < 50) break;
  }

  await pullProperties(remoteProperties);
};

export const pullProperties = async (remoteProperties: Property[]) => {
  for (const remoteProperty of remoteProperties) {
    const queryLocalProperty: any = await database.execAsync(
      [{ sql: 'SELECT * FROM property WHERE id = ?', args: [remoteProperty.id] }],
      true
    );
    const localProperty: Property = queryLocalProperty[0].rows[0];

    if (!localProperty) {
      await createProperty(remoteProperty);
    } else if (remoteProperty.updatedAt > localProperty.updatedAt) {
      await updateProperty(remoteProperty);
    }
  }
};
