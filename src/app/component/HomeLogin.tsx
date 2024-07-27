"use client"
import { useState } from 'react';

interface DbConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}

interface TableData {
  columns: { Field: string }[];
  rows: Record<string, any>[];
}

export default function Home() {
  const [dbConfig, setDbConfig] = useState<DbConfig>({ host: '', user: '', password: '', database: '' });
  const [tables, setTables] = useState<string[]>([]);
  const [tableData, setTableData] = useState<TableData>({ columns: [], rows: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const connectToDatabase = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dbConfig),
      });
      if (!res.ok) throw new Error(`Error: ${res.statusText}`);
      const data = await res.json();
      setTables(data);
    } catch (err) {
      setError('Error connecting to database');
      console.error('Error connecting to database:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTableData = async (tableName: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/table', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dbConfig, tableName }),
      });
      if (!res.ok) throw new Error(`Error: ${res.statusText}`);
      const data = await res.json();
      setTableData(data);
    } catch (err) {
      setError('Error fetching table data');
      console.error('Error fetching table data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Database Connector</h1>
      <input
        type="text"
        placeholder="Host"
        value={dbConfig.host}
        onChange={(e) => setDbConfig({ ...dbConfig, host: e.target.value })}
      />
      <input
        type="text"
        placeholder="User"
        value={dbConfig.user}
        onChange={(e) => setDbConfig({ ...dbConfig, user: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={dbConfig.password}
        onChange={(e) => setDbConfig({ ...dbConfig, password: e.target.value })}
      />
      <input
        type="text"
        placeholder="Database"
        value={dbConfig.database}
        onChange={(e) => setDbConfig({ ...dbConfig, database: e.target.value })}
      />
      <button onClick={connectToDatabase} disabled={loading}>
        {loading ? 'Connecting...' : 'Connect'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Tables</h2>
      <ul>
        {tables.map((table) => (
          <li key={table} onClick={() => getTableData(table)}>
            {table}
          </li>
        ))}
      </ul>
      {tableData.columns.length > 0 && (
        <div>
          <h2>Table Data</h2>
          <table>
            <thead>
              <tr>
                {tableData.columns.map((col) => (
                  <th key={col.Field}>{col.Field}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.rows.map((row, index) => (
                <tr key={index}>
                  {tableData.columns.map((col) => (
                    <td key={col.Field}>{row[col.Field]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
