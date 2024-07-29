import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import type { RowDataPacket } from 'mysql2';

export async function POST(req: NextRequest) {
  const { dbConfig, tableName, from, to } = await req.json();
  try {
    const connection = await mysql.createConnection(dbConfig);
    let query = `SELECT name, status, email, amount, datecreated FROM ${tableName}`;
    if (from && to) {
      query = `SELECT name, status, email, amount, datecreated FROM ${tableName} WHERE datecreated BETWEEN '${from}' AND '${to}' LIMIT 10`;
    }
    const [rows] = await connection.query<RowDataPacket[]>(query);
    connection.end();
    return NextResponse.json(rows);
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
}
