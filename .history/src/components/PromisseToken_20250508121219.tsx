import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthService } from '@/backend/services/apis/session';

type SessionContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (tokens: string) => Promise<void>;
  logout: () => Promise<void>;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const token = await AuthService.;
      if (token) {



      }
      setIsLoading(false);
    };

    checkSession();


    const interval = setInterval(checkSession, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const login = async (tokens: string) => {
    try {

      
      // Validar imediatamente após o login
      await new Promise((resolve) => setTimeout(resolve, 100));
   
      
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    setIsAuthenticated(false);
  };

  return (
    <SessionContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
