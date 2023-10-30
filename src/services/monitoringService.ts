import database from '../../database';

database.transaction((transaction) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS monitoring (
      id TEXT PRIMARY KEY,
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
  const nowTime = new Date().getTime();
  const monitoringCopy = {
    ...monitoring,
    createdAt: nowTime,
    updatedAt: nowTime,
  };

  const keys = Object.keys(monitoringCopy) as (keyof Monitoring)[];
  const args: any[] = keys.map((key) => monitoringCopy[key]);

  return new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `
          INSERT INTO monitoring (${keys.join(',')})
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
