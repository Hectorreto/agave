import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { findProperties } from './propertyService';
import database from '../../database';
import getAllMonitoring from '../api/monitoring/getAllMonitoring';
import postMonitoring from '../api/monitoring/postMonitoring';

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
  propertyName: string;

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

export const updateMonitoring = async (monitoring: Partial<Monitoring>) => {
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
    search?: string;
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

  if (options.filter?.search) {
    where.push('propertyName LIKE ? COLLATE NOCASE');
    args.push(options.filter.search);
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
          SELECT monitoring.*, property.name AS propertyName
          FROM monitoring
          LEFT JOIN property ON 
            property.id   = monitoring.propertyId OR
            property.guid = monitoring.propertyId
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

export const syncMonitoring = async () => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  if (!accessToken) return;

  const remoteMonitoring: Monitoring[] = [];
  for (let skip = 0; true; skip += 50) {
    const data: any[] = await getAllMonitoring({
      accessToken,
      limit: 50,
      skip,
    });
    remoteMonitoring.push(...data);
    if (data.length < 50) break;
  }

  await pullMonitoring(remoteMonitoring);
  await pushMonitoring(remoteMonitoring, accessToken);
};

const pullMonitoring = async (remoteMonitoringArray: Monitoring[]) => {
  for (const remoteMonitoring of remoteMonitoringArray) {
    const queryLocalMonitoring: any = await database.execAsync(
      [{ sql: 'SELECT * FROM monitoring WHERE guid = ?', args: [remoteMonitoring.guid] }],
      true
    );
    const localMonitoring: Monitoring = queryLocalMonitoring[0].rows[0];

    if (!localMonitoring) {
      await createMonitoring({
        ...remoteMonitoring,
        id: uuid.v4() as string,
      });
    } else if (remoteMonitoring.updatedAt > localMonitoring.updatedAt) {
      await updateMonitoring({
        ...remoteMonitoring,
        id: localMonitoring.id,
      });
    }
  }
};

const pushMonitoring = async (remoteMonitoringArray: Monitoring[], accessToken: string) => {
  const localMonitoringArray = await findMonitoring({});
  const localProperties = await findProperties({});

  for (const localMonitoring of localMonitoringArray) {
    const remoteMonitoring = remoteMonitoringArray.find((v) => v.guid === localMonitoring.guid);

    if (!remoteMonitoring) {
      const property = localProperties.find(
        (v) => v.id === localMonitoring.propertyId || v.guid === localMonitoring.propertyId
      );
      if (!property) return;

      const guid = await postMonitoring({
        accessToken,
        monitoring: localMonitoring,
        property,
      });

      await updateMonitoring({
        id: localMonitoring.id,
        guid,
      });
    }
  }
};
