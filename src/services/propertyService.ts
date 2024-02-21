import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import database from '../../database';
import getAllProperties from '../api/property/getAllProperties';

database.transaction((transaction) => {
  transaction.executeSql(
    `
      CREATE TABLE IF NOT EXISTS property (
        id TEXT PRIMARY KEY,
        guid TEXT,
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
  guid: string;
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
        args: [values, id],
      },
    ],
    readOnly
  );
};

type FindPropertyOptions = {
  filter?: {
    id?: string;
    name?: string;
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

  if (options.filter?.name) {
    where.push('name LIKE ? COLLATE NOCASE');
    args.push(options.filter.name);
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

export const pullProperties = async () => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  if (!accessToken) return;

  const properties: Property[] = [];
  for (let skip = 0; true; skip += 50) {
    const data = await getAllProperties({
      accessToken,
      limit: 50,
      skip,
    });
    properties.push(...data);
    if (data.length < 50) break;
  }

  for (const property of properties) {
    const queryLocalProperty: any = await database.execAsync(
      [{ sql: 'SELECT * FROM property WHERE guid = ?', args: [property.guid] }],
      true
    );
    const localProperty: Property = queryLocalProperty[0].rows[0];

    if (!localProperty) {
      await createProperty({
        ...property,
        id: uuid.v4() as string,
      });
    } else if (property.updatedAt > localProperty.updatedAt) {
      await updateProperty({
        ...property,
        id: localProperty.id,
      });
    }
  }
};
