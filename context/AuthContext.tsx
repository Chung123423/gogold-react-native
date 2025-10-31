// AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { User, AuthState, LoginCredentials } from '../types';
import axios from 'axios';
import { SERVER_URL } from '../config';

interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<string>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: false,
    error: null,
  });

  const login = async ({ username, password }: LoginCredentials): Promise<string> => {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      try {
          const credentials: LoginCredentials = { username, password };
          const response = await axios.post(`${SERVER_URL}/api/app/auth/login`, credentials);
          if (response.data.token) {
              setAuthState({
                  user: username,
                  token: response.data.token,
                  isLoading: false,
                  error: null,
              });
              return response.data.token; 
          } else {
              throw new Error('No token received from server');
          }
      } catch (error) {
        setAuthState(prev => ({
            ...prev,
            isLoading: false,
            error: error instanceof Error ? error.message : 'Login failed',
        }));
        throw error;
      }
  };

  const logout = async () => {
    await setAuthState({
      user: null,
      token: null,
      isLoading: false,
      error: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;