'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

export interface DatabaseConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  waitForConnections: boolean;
  connectionLimit: number;
  queueLimit: number;
  tableName: string;
}

interface DatabaseContextProps {
  databaseConfig: DatabaseConfig;
  setDatabaseConfig: React.Dispatch<React.SetStateAction<DatabaseConfig>>;
}

const DatabaseContext = createContext<DatabaseContextProps | undefined>(undefined);

interface DatabaseProviderProps {
  children: ReactNode;
}

export const DatabaseProvider = ({ children }: DatabaseProviderProps) => {
  const [databaseConfig, setDatabaseConfig] = useState<DatabaseConfig>({
    host: '',
    user: '',
    password: '',
    database: '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    tableName: '',
  });

  return (
    <DatabaseContext.Provider value={{ databaseConfig, setDatabaseConfig }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = (): DatabaseContextProps => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};
