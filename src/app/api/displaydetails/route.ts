import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function GET(req: NextRequest) {
  try {
    const [rows] = await pool.query('SELECT name, email, status,  amount, date FROM users LIMIT 10');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}