// promptvault-frontend/src/contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/api';

interface UserContextType {
  userId: string;
  email: string;
  username?: string;
  role: string;
  bio?: string;
  image?: string;
}

interface AuthContextProps {
  user: UserContextType | null;
  setUser: React.Dispatch<React.SetStateAction<UserContextType | null>>;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserContextType | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async (isInitialLoad = false) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // This endpoint MUST return an object with a 'userId' field
        const response = await api.get('/users/profile'); 
        setUser(response.data); // Assuming response.data has userId, username, role etc.
      } catch (error) {
        console.error("Failed to fetch user:", error);
        if (isInitialLoad) {
          localStorage.removeItem('access_token');
        }
        setUser(null);
      }
    } else {
      setUser(null);
    }
    if (isInitialLoad) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(true);
  }, []);

  const login = async (token: string) => {
    localStorage.setItem('access_token', token);
    await fetchUser(false);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};