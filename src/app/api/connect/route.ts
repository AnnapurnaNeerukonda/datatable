import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import type { RowDataPacket } from 'mysql2';

export async function POST(req: NextRequest) {
  const dbConfig = await req.json();
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [tables] = await connection.query<RowDataPacket[]>("SHOW TABLES");
    connection.end();
    return NextResponse.json(tables.map(row => Object.values(row)[0]));
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
}