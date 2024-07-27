'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

export interface DatabaseConfig {
  host: string;
  database: string;
  user: string;
  password: string;
  dbport:number,
  port:number,
  
 
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
    database: '',
    user: '',
    password: '',
    dbport:0,
    port:0,
    
   
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
