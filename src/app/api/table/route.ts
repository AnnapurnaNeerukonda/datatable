// pages/api/table/[table].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getPool } from '../../../lib/db';
import { useDatabase } from '@/app/contexts/DatabaseContext'; // Adjust the import path as needed


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {databaseConfig} = useDatabase();

  

  try {
    const pool = getPool();
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`SELECT name, status, email, amount, datecreated FROM ${databaseConfig.table} LIMIT 10`);
    connection.release();
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
