
import { useState } from 'react';
import { User } from '@/types/auth-types';
import { MOCK_USERS } from '@/data/mock-users';
import { ROLES, UserRole } from '@/lib/utils';

export function useAuthOperations() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [pendingUser, setPendingUser] = useState<any | null>(null);
  const [needsTwoFactor, setNeedsTwoFactor] = useState(false);
  
  // Login functionality
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
  
  // Verify two-factor code
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
  
  // Sign up functionality
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
  
  // Password operations
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
      return;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Two-factor authentication operations
  const enableTwoFactor = async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!user) {
        throw new Error('You must be logged in to enable two-factor authentication');
      }
      
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
  
  // Logout functionality
  const logout = () => {
    setUser(null);
    setPendingUser(null);
    setNeedsTwoFactor(false);
  };
  
  return {
    user,
    setUser,
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
}
