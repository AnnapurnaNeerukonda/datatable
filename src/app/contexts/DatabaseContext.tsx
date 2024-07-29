'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

export interface DatabaseConfig {
  host: string;
  database: string;
  user: string;
  password: string;
}

interface DatabaseContextProps {
  databaseConfig: DatabaseConfig;
  globalTable: string;
  setDatabaseConfig: React.Dispatch<React.SetStateAction<DatabaseConfig>>;
  setGlobalTable: React.Dispatch<React.SetStateAction<string>>;
}

const DatabaseContext = createContext<DatabaseContextProps | undefined>(undefined);

interface DatabaseProviderProps {
  children: ReactNode;
}

export const DatabaseProvider = ({ children }: DatabaseProviderProps) => {
  const [databaseConfig, setDatabaseConfig] = useState<DatabaseConfig>({
    host: '',
    database: '',
    user: '',
    password: ''
  });
  
  const [globalTable, setGlobalTable] = useState<string>('');

  return (
    <DatabaseContext.Provider value={{ databaseConfig, globalTable , setDatabaseConfig, setGlobalTable }}>
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
