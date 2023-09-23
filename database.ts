import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('bloom.db');

database.transaction((transaction) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS exit (
      id TEXT PRIMARY KEY,
      createdAt INTEGER,
      updatedAt INTEGER,
      property TEXT,
      type TEXT,
      plantCount INTEGER,
      notes TEXT
    );
  `;
  transaction.executeSql(sql);
});

export default database;
