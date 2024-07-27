import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function GET(req: NextRequest) {
  const searchParams = new URLSearchParams(req.nextUrl.search);
  const searchQuery = searchParams.get('searchQuery');

  if (!searchQuery) {
    return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
  }

  try {
    const query = `
      SELECT name, status, email, amount, datecreated
      FROM  ${databaseConfig.tableName}
      WHERE LOWER(name) LIKE ? OR LOWER(email) LIKE ?
    `;
    const [rows] = await pool.query(query, [`%${searchQuery.toLowerCase()}%`, `%${searchQuery.toLowerCase()}%`]);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching search results:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
