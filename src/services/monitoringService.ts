import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import database from '../../database';
import getAllMonitoring from '../api/monitoring/getAllMonitoring';

database.transaction((transaction) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS monitoring (
      id TEXT PRIMARY KEY,
      guid TEXT,
      createdAt INTEGER,
      updatedAt INTEGER,
      createdBy TEXT,
      updatedBy TEXT,
      quadrantNumber TEXT,
      plantsPerQuadrant TEXT,
      quadrantQualification REAL,
      monitoringQualification REAL,
      comments TEXT,
      imageUri TEXT,
      latitude REAL,
      longitude REAL,
      propertyId TEXT,
      
      plantPerformanceKg TEXT,
      plagueType TEXT,
      plagueIncidence TEXT,
      diseaseType TEXT,
      diseaseIncidence TEXT,
      undergrowthName TEXT,
      undergrowthHeight TEXT,
      undergrowthLeafType TEXT,
      phytotoxicDamageHerbicideIncidence TEXT,
      phytotoxicDamagePesticideIncidence TEXT,
      phytotoxicDamageExcessSaltIncidence TEXT,
      environmentalDamageFrostIncidence TEXT,
      environmentalDamageStressIncidence TEXT,
      environmentalDamageFloodIncidence TEXT,
      environmentalDamageFireIncidence TEXT,
      environmentalDamageHailIncidence TEXT,
      environmentalDamageOtherIncidence TEXT,
      colorimetryIncidence TEXT,
      colorimetryComments TEXT,
      physicalDamageType TEXT,
      physicalDamageIncidence TEXT
    )
  `;
  transaction.executeSql(sql, [], undefined, (_, error) => {
    console.error(error);
    return true;
  });
});

export type Monitoring = {
  id: string;
  guid: string;
  createdAt: number;
  updatedAt: number;
  createdBy: string;
  updatedBy: string;
  quadrantNumber: string;
  plantsPerQuadrant: string;
  quadrantQualification: number;
  monitoringQualification: number;
  comments?: string;
  imageUri: string;
  latitude: number;
  longitude: number;
  propertyId: string;

  plantPerformanceKg?: string;
  plagueType?: string;
  plagueIncidence?: string;
  diseaseType?: string;
  diseaseIncidence?: string;
  undergrowthName?: string;
  undergrowthHeight?: string;
  undergrowthLeafType?: string;
  phytotoxicDamageHerbicideIncidence?: string;
  phytotoxicDamagePesticideIncidence?: string;
  phytotoxicDamageExcessSaltIncidence?: string;
  environmentalDamageFrostIncidence?: string;
  environmentalDamageStressIncidence?: string;
  environmentalDamageFloodIncidence?: string;
  environmentalDamageFireIncidence?: string;
  environmentalDamageHailIncidence?: string;
  environmentalDamageOtherIncidence?: string;
  colorimetryIncidence?: string;
  colorimetryComments?: string;
  physicalDamageType?: string;
  physicalDamageIncidence?: string;
};

export const createMonitoring = (monitoring: Monitoring): Promise<void> => {
  const keys = Object.keys(monitoring);
  const values = Object.values(monitoring);

  return new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `
          INSERT INTO monitoring (${keys.join(',')})
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

export const updateMonitoring = async (monitoring: Monitoring) => {
  const { id, ...update } = monitoring;
  const readOnly = false;

  const keys = Object.keys(update);
  const values = Object.values(update);

  await database.execAsync(
    [
      {
        sql: `
          UPDATE monitoring
          SET ${keys.map((key) => `${key} = ?`).join(',')}
          WHERE id = ?
        `,
        args: [values, id],
      },
    ],
    readOnly
  );
};

type FindMonitoringOptions = {
  filter?: {
    id?: string;
    createdAt?: {
      lower: Date;
      upper: Date;
    };
    property?: string;
  };
  sorting?: {
    createdAt?: 'ASC' | 'DESC';
  };
};

export const findMonitoring = (options: FindMonitoringOptions): Promise<Monitoring[]> => {
  const where: string[] = [];
  const args: any[] = [];

  if (options.filter?.id) {
    where.push('id = ?');
    args.push(options.filter.id);
  }

  if (options.filter?.createdAt) {
    where.push('createdAt BETWEEN ? AND ?');
    args.push(options.filter.createdAt.lower.getTime());
    args.push(options.filter.createdAt.upper.getTime());
  }

  if (options.filter?.property) {
    where.push('property LIKE ? COLLATE NOCASE');
    args.push(options.filter.property);
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
          FROM monitoring
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

export const pullMonitoring = async () => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  if (!accessToken) return;

  const monitoringArray: Monitoring[] = [];
  for (let skip = 0; true; skip += 50) {
    const data: any[] = await getAllMonitoring({
      accessToken,
      limit: 50,
      skip,
    });
    monitoringArray.push(...data);
    if (data.length < 50) break;
  }

  for (const monitoring of monitoringArray) {
    const queryLocalMonitoring: any = await database.execAsync(
      [
        {
          sql: 'SELECT * FROM monitoring WHERE guid = ?',
          args: [monitoring.guid],
        },
      ],
      true
    );
    const localMonitoring: Monitoring = queryLocalMonitoring[0].rows[0];

    if (!localMonitoring) {
      await createMonitoring({
        ...monitoring,
        id: uuid.v4() as string,
      });
    } else if (monitoring.updatedAt > localMonitoring.updatedAt) {
      await updateMonitoring({
        ...monitoring,
        id: localMonitoring.id,
      });
    }
  }
};
