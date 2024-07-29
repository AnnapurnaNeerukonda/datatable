import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import type { RowDataPacket } from 'mysql2';

export async function POST(req: NextRequest) {
  const { dbConfig, tableName } = await req.json();
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [columns] = await connection.query<RowDataPacket[]>(`SHOW COLUMNS FROM ${tableName}`);
    const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM ${tableName}`);
    connection.end();
    return NextResponse.json({ columns, rows });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
}