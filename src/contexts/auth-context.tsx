import React, { createContext, useContext, useState, useEffect } from 'react';
import { ROLES, UserRole } from '@/lib/utils';

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: "admin-1",
    email: "admin@example.com",
    password: "password123",
    name: "Admin User",
    role: ROLES.ADMIN,
    twoFactorEnabled: false,
  },
  {
    id: "doctor-1",
    email: "doctor@example.com",
    password: "password123",
    name: "Dr. Maria Santos",
    role: ROLES.DOCTOR,
    specialty: "Obstetrics and Gynecology",
    twoFactorEnabled: false,
  },
  {
    id: "secretary-1",
    email: "secretary@example.com",
    password: "password123",
    name: "Ana Ramirez",
    role: ROLES.SECRETARY_NURSE,
    twoFactorEnabled: false,
  },
  {
    id: "patient-1",
    email: "patient@example.com",
    password: "password123",
    name: "Patient User",
    role: ROLES.PATIENT,
    twoFactorEnabled: false,
    pregnancyStatus: {
      isPregnant: true,
      gestationalAge: 22,
      dueDate: new Date('2023-09-15')
    }
  },
];

// Define types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  twoFactorEnabled?: boolean;
  [key: string]: any; // For additional properties
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  needsTwoFactor: boolean;
  login: (email: string, password: string, twoFactorCode?: string) => Promise<User>;
  logout: () => void;
  signUp: (userData: {
    email: string;
    password: string;
    name: string;
    role?: UserRole;
  }) => Promise<User>;
  verifyTwoFactorCode: (code: string) => Promise<User>;
  resetPassword: (email: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  enableTwoFactor: () => Promise<void>;
  disableTwoFactor: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingUser, setPendingUser] = useState<any | null>(null);
  const [needsTwoFactor, setNeedsTwoFactor] = useState(false);
  
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
  
  const login = async (email: string, password: string, twoFactorCode?: string): Promise<User> => {
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
      
      // Check if 2FA is required
      if (foundUser.twoFactorEnabled && !twoFactorCode) {
        setPendingUser(foundUser);
        setNeedsTwoFactor(true);
        setIsLoading(false);
        throw new Error('Two-factor authentication required');
      }
      
      // If 2FA code is provided, verify it
      if (foundUser.twoFactorEnabled && twoFactorCode) {
        // In a real app, this would validate the code against a backend
        if (twoFactorCode !== '123456') {
          throw new Error('Invalid verification code');
        }
      }
      
      // Omit password from user object
      const { password: _, ...userWithoutPassword } = foundUser;
      const authenticatedUser = userWithoutPassword as User;
      
      // Reset 2FA state
      setPendingUser(null);
      setNeedsTwoFactor(false);
      
      setUser(authenticatedUser);
      return authenticatedUser;
    } finally {
      setIsLoading(false);
    }
  };
  
  const verifyTwoFactorCode = async (code: string): Promise<User> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!pendingUser) {
        throw new Error('No pending authentication');
      }
      
      // In a real app, this would validate the code against a backend
      if (code !== '123456') {
        throw new Error('Invalid verification code');
      }
      
      // Omit password from user object
      const { password: _, ...userWithoutPassword } = pendingUser;
      const authenticatedUser = userWithoutPassword as User;
      
      // Reset 2FA state
      setPendingUser(null);
      setNeedsTwoFactor(false);
      
      setUser(authenticatedUser);
      return authenticatedUser;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    setPendingUser(null);
    setNeedsTwoFactor(false);
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
        twoFactorEnabled: false,
      };
      
      setUser(newUser);
      return newUser;
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetPassword = async (email: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists
      const userExists = MOCK_USERS.some(u => u.email === email);
      
      if (!userExists) {
        throw new Error('No account found with this email');
      }
      
      // In a real app, this would send a password reset email
      // For demo purposes, we'll just return success
      return;
    } finally {
      setIsLoading(false);
    }
  };
  
  const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!user) {
        throw new Error('You must be logged in to change your password');
      }
      
      // Find user in mock data to verify current password
      const foundUser = MOCK_USERS.find(
        u => u.id === user.id && u.password === currentPassword
      );
      
      if (!foundUser) {
        throw new Error('Current password is incorrect');
      }
      
      // In a real app, this would update the password in the database
      // For demo purposes, we'll just return success
      return;
    } finally {
      setIsLoading(false);
    }
  };
  
  const enableTwoFactor = async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!user) {
        throw new Error('You must be logged in to enable two-factor authentication');
      }
      
      // In a real app, this would set up 2FA with a TOTP app or SMS
      // and return a secret or QR code to display to the user
      
      // Update user object with 2FA enabled
      setUser({
        ...user,
        twoFactorEnabled: true,
      });
      
      return;
    } finally {
      setIsLoading(false);
    }
  };
  
  const disableTwoFactor = async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!user) {
        throw new Error('You must be logged in to disable two-factor authentication');
      }
      
      // Update user object with 2FA disabled
      setUser({
        ...user,
        twoFactorEnabled: false,
      });
      
      return;
    } finally {
      setIsLoading(false);
    }
  };
  
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    needsTwoFactor,
    login,
    logout,
    signUp,
    verifyTwoFactorCode,
    resetPassword,
    changePassword,
    enableTwoFactor,
    disableTwoFactor,
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
