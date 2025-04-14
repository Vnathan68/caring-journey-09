
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService, { User } from '@/services/auth-service';
import { toast } from '@/hooks/use-toast';

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => Promise<void>;
  verifyTwoFactorCode: (code: string) => Promise<User | null>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => null,
  logout: async () => {},
  verifyTwoFactorCode: async () => null,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<User | null> => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });

      if (response.needsTwoFactor) {
        throw new Error('Two-factor authentication required');
      }

      if (response.status === 'success' && response.data) {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
      }

      return null;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      localStorage.removeItem('user');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyTwoFactorCode = async (code: string): Promise<User | null> => {
    setIsLoading(true);
    try {
      const response = await authService.verifyTwoFactorCode(code);
      
      if (response.status === 'success' && response.data) {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
      }
      
      return null;
    } catch (error) {
      console.error('Two-factor verification error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        verifyTwoFactorCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
