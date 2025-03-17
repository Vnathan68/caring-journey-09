import React, { createContext, useContext, useState, useEffect } from 'react';
import { ROLES, UserRole } from '@/lib/utils';

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: "secretary-1",
    email: "secretary@example.com",
    password: "password123",
    name: "Secretary Nurse",
    role: ROLES.SECRETARY_NURSE,
  },
  {
    id: "doctor-1",
    email: "doctor@example.com",
    password: "password123",
    name: "Dr. Maria Santos",
    role: ROLES.DOCTOR,
    specialty: "Obstetrics and Gynecology",
  },
  {
    id: "patient-1",
    email: "patient@example.com",
    password: "password123",
    name: "Patient User",
    role: ROLES.PATIENT,
  },
];

// Define types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  [key: string]: any; // For additional properties
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  signUp: (userData: {
    email: string;
    password: string;
    name: string;
    role?: UserRole;
  }) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for existing user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);
  
  // Update local storage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);
  
  const login = async (email: string, password: string): Promise<User> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data
      const foundUser = MOCK_USERS.find(
        u => u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // Omit password from user object
      const { password: _, ...userWithoutPassword } = foundUser;
      const authenticatedUser = userWithoutPassword as User;
      
      setUser(authenticatedUser);
      return authenticatedUser;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
  };
  
  const signUp = async (userData: {
    email: string;
    password: string;
    name: string;
    role?: UserRole;
  }): Promise<User> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const userExists = MOCK_USERS.some(u => u.email === userData.email);
      
      if (userExists) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user (in a real app, this would be a server-side operation)
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: userData.email,
        name: userData.name,
        role: userData.role || ROLES.PATIENT, // Default to patient if no role specified
      };
      
      setUser(newUser);
      return newUser;
    } finally {
      setIsLoading(false);
    }
  };
  
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    signUp,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
