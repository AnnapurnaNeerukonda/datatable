// src/lib/db.ts
import mysql from 'mysql2/promise';

let pool: mysql.Pool;

export const createPool = (databaseConfig: { host: string; user: string; password: string; database: string }) => {
  if (!pool) {
    console.log('Creating new database pool...');
    pool = mysql.createPool({
      host: databaseConfig.host,
      user: databaseConfig.user,
      password: databaseConfig.password,
      database: databaseConfig.database,
    });
  } else {
    console.log('Database pool already created.');
  }
};


export const getPool = () => {
  if (!pool) {
    throw new Error('Database pool has not been created. Please initialize the pool using createPool.');
  }
  return pool;
};
