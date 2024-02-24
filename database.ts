import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('bloom.db');

database.transaction((transaction) => {
  transaction.executeSql('PRAGMA foreign_keys = ON');
});

export const dropAllTables = () => {
  database.transaction((transaction) => {
    transaction.executeSql('DELETE FROM application');
    transaction.executeSql('DELETE FROM exit');
    transaction.executeSql('DELETE FROM monitoring');
    transaction.executeSql('DELETE FROM property');
  });
};

export default database;
