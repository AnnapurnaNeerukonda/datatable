import mysql from 'mysql2/promise';
import { DatabaseConfig } from '../app/contexts/DatabaseContext';

let pool: mysql.Pool;

export const createPool = (databaseConfig: DatabaseConfig) => {
  pool = mysql.createPool({
    host: databaseConfig.host,
    user: databaseConfig.user,
    password: databaseConfig.password,
    database: databaseConfig.database,
    waitForConnections: databaseConfig.waitForConnections,
    connectionLimit: databaseConfig.connectionLimit,
    queueLimit: databaseConfig.queueLimit,
   
  });
};

export const getPool = () => {
  if (!pool) {
    throw new Error('Database pool has not been created. Please initialize the pool using createPool.');
  }
  return pool;
};
