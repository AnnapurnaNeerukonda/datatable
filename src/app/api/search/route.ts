import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '../../../lib/db';
import { DatabaseConfig } from '@/app/contexts/DatabaseContext';

export async function GET(req: NextRequest) {
  const searchParams = new URLSearchParams(req.nextUrl.search);
  const searchQuery = searchParams.get('searchQuery');

  if (!searchQuery) {
    return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
  }

  try {
    const pool = getPool();
    const connection = await pool.getConnection();
    const query = `
      SELECT name, status, email, amount, datecreated
      FROM {databaseConfig.tableName}
      WHERE LOWER(name) LIKE ? OR LOWER(email) LIKE ?
    `;
    const [rows] = await connection.query(query, [`%${searchQuery.toLowerCase()}%`, `%${searchQuery.toLowerCase()}%`]);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching search results:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
