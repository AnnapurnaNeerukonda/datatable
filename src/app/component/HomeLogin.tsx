// src/app/page.tsx
'use client';

import { useState } from 'react';
import { useDatabase } from '../contexts/DatabaseContext';

export default function HomeLogin() {
  const { databaseConfig, setDatabaseConfig } = useDatabase();
  const [isConnected, setIsConnected] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatabaseConfig((prevConfig) => ({
      ...prevConfig,
      [name]: value,
    }));
    console.log(databaseConfig);
  };

  const handleConnect = () => {
    // Perform any necessary actions, such as sending the data to the server
    console.log('Database Configuration:', databaseConfig);
    setIsConnected(true);
    window.location.href = 'component/DisplayDetails/'; // Redirect to the DisplayDetails page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Database Configuration</h1>
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Host Name</span>
            <input
              name="host"
              value={databaseConfig.host}
              onChange={handleChange}
              placeholder="Enter Host Name"
              className="mt-1 block w-full p-2 border rounded"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Database</span>
            <input
              name="database"
              value={databaseConfig.database}
              onChange={handleChange}
              placeholder="Enter Database"
              className="mt-1 block w-full p-2 border rounded"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">User</span>
            <input
              name="user"
              value={databaseConfig.user}
              onChange={handleChange}
              placeholder="Enter User Name"
              className="mt-1 block w-full p-2 border rounded"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Password</span>
            <input
              name="password"
              type="password"
              value={databaseConfig.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="mt-1 block w-full p-2 border rounded"
            />
          </label>
          
          <label className="block">
            <span className="text-gray-700">waitForConnections</span>
            <input
              name="dbport"
              value={databaseConfig.dbport}
              onChange={handleChange}
              placeholder="Enter waitForConnections"
              className="mt-1 block w-full p-2 border rounded"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">connectionLimit</span>
            <input
              name="port"
              value={databaseConfig.port}
              onChange={handleChange}
              placeholder="Enter connectionLimit"
              className="mt-1 block w-full p-2 border rounded"
            />
          </label>
         
          
          <button
            onClick={handleConnect}
            className="w-full mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Connect
          </button>
        </div>
        {isConnected && (
          <p className="mt-4 text-green-500 text-center">Connected successfully!</p>
        )}
      </div>
    </div>
  );
}
