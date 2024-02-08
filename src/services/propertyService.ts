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
  const lastPullRaw = await AsyncStorage.getItem('propertiesLastPull');
  const lastPull = lastPullRaw ?? '0';

  const accessToken = await AsyncStorage.getItem('accessToken');
  if (!accessToken) return;

  const properties = [];
  for (let skip = 0; true; skip += 10) {
    const data: any[] = await getAllProperties({
      accessToken,
      limit: 10,
      skip,
    });
    if (!data.length) break;
    properties.push(...data);
  }
  const newProperties = properties.filter((property) => property.updated_date > lastPull);

  for (const property of newProperties) {
    const localProperty = await new Promise((resolve, reject) => {
      database.transaction((transaction) => {
        transaction.executeSql(
          `SELECT guid FROM property WHERE guid = ?`,
          [property.guid],
          (_, { rows }) => {
            resolve(rows._array[0]);
          },
          (_, error) => {
            reject(error);
            return true;
          }
        );
      });
    });

    if (!localProperty) {
      await new Promise((resolve, reject) => {
        database.transaction((transaction) => {
          transaction.executeSql(
            `
              INSERT INTO property (
                id,
                guid,
                createdAt,
                updatedAt,
                createdBy,
                updatedBy,
                name,
                plantingYear,
                cropType,
                location,
                hectareNumber,
                plantsPlantedNumber,
                invoice,
                registry,
                internalIdentifier,
                boardsPerProperty,
                active
              )
              VALUES (
                ?,?,?,?,?,
                ?,?,?,?,?,
                ?,?,?,?,?,
                ?,?
              )
            `,
            [
              uuid.v4() as string,
              property.guid,
              property.created_date,
              property.updated_date,
              JSON.stringify(property.created_by),
              JSON.stringify(property.created_by),
              property.name,
              property.plantation_year,
              JSON.stringify(property.crop_types),
              JSON.stringify(property.place),
              property.place.area,
              property.planted_plants,
              property.folio,
              property.registry_number,
              property.internal_identifier,
              property.tables_by_property,
              property.enabled ? 1 : 0,
            ],
            () => {
              resolve(undefined);
            },
            (_, error) => {
              reject(error);
              return true;
            }
          );
        });
      });
    } else {
      await new Promise((resolve, reject) => {
        database.transaction((transaction) => {
          transaction.executeSql(
            `
              UPDATE property
              SET
                updatedAt = ?,
                createdBy = ?,
                updatedBy = ?,
                name = ?,
                plantingYear = ?,
                cropType = ?,
                location = ?,
                hectareNumber = ?,
                plantsPlantedNumber = ?,
                invoice = ?,
                registry = ?,
                internalIdentifier = ?,
                boardsPerProperty = ?,
                active = ?
              WHERE id = ?
            `,
            [
              property.updated_date,
              JSON.stringify(property.created_by),
              JSON.stringify(property.created_by),
              property.name,
              property.plantation_year,
              JSON.stringify(property.crop_types),
              JSON.stringify(property.place),
              property.place.area,
              property.planted_plants,
              property.folio,
              property.registry_number,
              property.internal_identifier,
              property.tables_by_property,
              property.enabled ? 1 : 0,
              property.guid,
            ],
            () => {
              resolve(undefined);
            },
            (_, error) => {
              reject(error);
              return true;
            }
          );
        });
      });
    }
  }

  const now = Date.now();
  await AsyncStorage.setItem('propertiesLastPull', String(now));
};
