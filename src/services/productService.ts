import database from '../../database';

database.transaction((transaction) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS product (
      id TEXT PRIMARY KEY,
      name TEXT,
      amount TEXT,
      applicationId TEXT
    );
  `;
  transaction.executeSql(sql, [], undefined, (_, error) => {
    console.error(error);
    return false;
  });
});

export type Product = {
  id: string;
  name: string;
  amount: string;
  applicationId: string;
};

const keys: (keyof Product)[] = ['id', 'name', 'amount', 'applicationId'];

export const createProducts = async (products: Product[]): Promise<void> => {
  const values: string[] = [];
  const args: any[] = [];

  products.forEach((product) => {
    values.push(`(${keys.map(() => '?').join(',')})`);
    args.push(...keys.map((key) => product[key]));
  });

  return new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `
          INSERT INTO product (${keys.join(',')})
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
