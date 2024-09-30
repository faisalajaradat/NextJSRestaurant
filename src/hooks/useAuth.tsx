'use client'; // Mark as a Client Component

import { useEffect, useState, useContext, createContext, ReactNode } from 'react';

// Define the User interface
export interface User {
  uuid: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => void;
  setUser: (user: User | null) => void; // Expose a setter to manually update the user state
}

// Create AuthContext using `createContext`
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// The AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/auth/me', {
          method: 'GET',
          credentials: 'include',
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const signOut = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      localStorage.removeItem('token');
      setUser(null); // Reset the user state
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
