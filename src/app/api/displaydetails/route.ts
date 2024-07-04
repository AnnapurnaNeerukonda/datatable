import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function GET(req: NextRequest) {
  try {
<<<<<<< HEAD
    const [rows] = await pool.query('SELECT name, status, email, amount, date FROM users LIMIT 10');
=======
    const [rows] = await pool.query('SELECT name, status, email, amount, datecreated FROM data');
>>>>>>> 4696adba53cf64574db406d825e1ceb14927116b
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
