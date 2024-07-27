import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../lib/db';
import { parseISO, format } from 'date-fns';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ error: 'Missing date range parameters' });
    }

    try {
      const fromDate = parseISO(from as string);
      const toDate = parseISO(to as string);

      const connection = await pool.getConnection();
      const query = `
        SELECT name, status, email, amount, datecreated
        FROM data
        WHERE datecreated BETWEEN ? AND ?
      `;
      const [rows] = await connection.query(query, [fromDate, toDate]);
      connection.release();

      return res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching data:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
