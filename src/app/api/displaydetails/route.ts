import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '../../../lib/db';
import { useDatabase } from '@/app/contexts/DatabaseContext';

export async function GET(req: NextRequest) {
  const {databaseConfig} = useDatabase();

  try {
    const pool = getPool();
    const connection = await pool.getConnection();
   
    const [rows] = await pool.query('SELECT name, status, email, amount, datecreated FROM  ${databaseConfig.table} LIMIT 10');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
  
}