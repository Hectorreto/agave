import database from '../../database';

database.transaction((transaction) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS product (
      id TEXT PRIMARY KEY,
      name TEXT,
      amount TEXT,
      realAmount TEXT,
      applicationId TEXT
    );
  `;
  transaction.executeSql(sql, [], undefined, (_, error) => {
    console.error(error);
    return true;
  });
});

export type Product = {
  id: string;
  name: string;
  amount: string;
  realAmount?: string;
  applicationId: string;
};

export const keys: (keyof Product)[] = ['id', 'name', 'amount', 'realAmount', 'applicationId'];
export type FindProductOptions = {
  filter?: {
    applicationId?: string;
  };
};

export const findProducts = async (options: FindProductOptions): Promise<Product[]> => {
  const where: string[] = [];
  const args: any[] = [];

  if (options.filter?.applicationId) {
    where.push('applicationId = ?');
    args.push(options.filter.applicationId);
  }

  let whereSql = '';
  if (where.length) {
    whereSql = `WHERE ${where.map((value) => `(${value})`).join(' AND ')}`;
  }

  return new Promise((resolve) => {
    database.transaction((transaction) => {
      const sql = `
        SELECT *
        FROM product
        ${whereSql}
      `;
      transaction.executeSql(sql, args, (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
};

export const createProducts = (products: Product[]): Promise<void> => {
  const values: string[] = [];
  const args: any[] = [];

  products.forEach((product) => {
    values.push('(?, ?, ?, ?)');
    args.push(product.id, product.name, product.amount, product.applicationId);
  });

  return new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `
          INSERT INTO product (id, name, amount, applicationId)
          VALUES ${values.join(',')}
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

export const finalizeProducts = (products: Product[]): Promise<void> => {
  const cases: string[] = [];
  const args: any[] = [];

  products.forEach((product) => {
    cases.push(`WHEN id = ? THEN ?`);
    args.push(product.id, product.realAmount);
  });

  args.push(...products.map((product) => product.id));

  return new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `
          UPDATE product
          SET realAmount = CASE ${cases.join(' ')} END
          WHERE id IN (${products.map(() => '?').join(',')})
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
