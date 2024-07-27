import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '../../../lib/db';

export async function GET(req: NextRequest) {
  try {
    const pool = getPool();
    const connection = await pool.getConnection();
   
    const [rows] = await pool.query('SELECT name, status, email, amount, datecreated FROM  ${databaseConfig.tableName} LIMIT 10');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
  
}