import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('bloom.db');

database.transaction((transaction) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS exit (
      id TEXT PRIMARY KEY,
      createdAt INTEGER,
      updatedAt INTEGER,
      createdBy TEXT,
      updatedBy TEXT,
      property TEXT,
      type TEXT,
      plantCount TEXT,
      notes TEXT,
      imageUri TEXT,
      latitude REAL,
      longitude REAL
    );      
  `;
  transaction.executeSql(sql, [], undefined, (_, error) => {
    console.error(error);
    return false;
  });
});

export default database;
