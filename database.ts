import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('bloom.db');

export default database;
