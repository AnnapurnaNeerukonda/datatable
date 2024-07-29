'use client'
import { useRouter } from 'next/navigation';
import { useDatabase } from "../contexts/DatabaseContext";
import { useState } from 'react';

export default function Home() {
  const { databaseConfig, setDatabaseConfig,  setGlobalTable } = useDatabase();
  const router = useRouter();
  const [dbConfig, setDbConfig] = useState({
    host: '',
    user: '',
    password: '',
    database: ''
  });
  const [tables, setTables] = useState<string[]>([]);
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
      setDatabaseConfig(dbConfig); // Store the config in context
    } catch (err) {
      setError('Error connecting to database');
      console.error('Error connecting to database:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTableClick = async (table: string) => {
    console.log(table);

    setGlobalTable(table);

    // Navigate to the new page using Next.js router
    router.push('/component/DisplayDetails');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-row bg-white p-10 rounded-lg shadow-lg">
        <div className="mr-10">
          <h1 className="text-2xl font-bold mb-4">Database Connector</h1>
          <input
            type="text"
            placeholder="Host"
            value={dbConfig.host}
            onChange={(e) => setDbConfig({ ...dbConfig, host: e.target.value })}
            className="block mb-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="User"
            value={dbConfig.user}
            onChange={(e) => setDbConfig({ ...dbConfig, user: e.target.value })}
            className="block mb-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={dbConfig.password}
            onChange={(e) => setDbConfig({ ...dbConfig, password: e.target.value })}
            className="block mb-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Database"
            value={dbConfig.database}
            onChange={(e) => setDbConfig({ ...dbConfig, database: e.target.value })}
            className="block mb-4 p-2 border border-gray-300 rounded"
          />
          
          
          <button
            onClick={connectToDatabase}
            disabled={loading}
            className={`p-2 w-full text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'}`}
          >
            {loading ? 'Connecting...' : 'Connect'}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Tables</h2>
          <ul>
            {tables.map((table) => (
              <li
                key={table}
                onClick={() => handleTableClick(table)}
                className="cursor-pointer text-blue-500 hover:underline"
              >
                {table}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
