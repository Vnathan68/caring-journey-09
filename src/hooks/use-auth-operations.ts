
import { useState } from 'react';
import { User } from '@/types/auth-types';
import { authService } from '@/services/auth-service';
import { toast } from '@/components/ui/use-toast';
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
      // Use the actual PHP API endpoint for login
      const response = await authService.login(email, password);
      
      // Handle two-factor authentication if required
      if (response.status === 'two_factor_required') {
        setPendingUser({ email, password });
        setNeedsTwoFactor(true);
        setIsLoading(false);
        throw new Error('Two-factor authentication required');
      }
      
      // Check for successful login
      if (response.status === 'success' && response.data) {
        // Get the authenticated user
        const authenticatedUser = response.data;
        
        // Reset 2FA state
        setPendingUser(null);
        setNeedsTwoFactor(false);
        
        setUser(authenticatedUser);
        return authenticatedUser;
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Verify two-factor code
  const verifyTwoFactorCode = async (code: string): Promise<User> => {
    setIsLoading(true);
    
    try {
      if (!pendingUser) {
        throw new Error('No pending authentication');
      }
      
      // Use the actual PHP API endpoint for 2FA verification
      const response = await authService.verifyTwoFactor(code);
      
      if (response.status === 'success' && response.data) {
        const authenticatedUser = response.data;
        
        // Reset 2FA state
        setPendingUser(null);
        setNeedsTwoFactor(false);
        
        setUser(authenticatedUser);
        return authenticatedUser;
      } else {
        throw new Error(response.message || 'Verification failed');
      }
    } catch (error) {
      console.error('2FA verification error:', error);
      throw error;
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
      // Use the actual PHP API endpoint for registration
      const response = await authService.register(userData);
      
      if (response.status === 'success' && response.data) {
        const newUser = response.data;
        setUser(newUser);
        return newUser;
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Password reset operation
  const resetPassword = async (email: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      await authService.resetPassword(email);
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Change password operation
  const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      await authService.changePassword(currentPassword, newPassword);
    } catch (error) {
      console.error('Password change error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Two-factor authentication operations
  const enableTwoFactor = async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      await authService.enableTwoFactor();
      
      // Update user object with 2FA enabled
      if (user) {
        setUser({
          ...user,
          twoFactorEnabled: true,
        });
      }
    } catch (error) {
      console.error('Enable 2FA error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const disableTwoFactor = async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      await authService.disableTwoFactor();
      
      // Update user object with 2FA disabled
      if (user) {
        setUser({
          ...user,
          twoFactorEnabled: false,
        });
      }
    } catch (error) {
      console.error('Disable 2FA error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout functionality
  const logout = () => {
    // Call the logout API endpoint (in a real app)
    authService.logout().catch(error => {
      console.error('Logout error:', error);
    });
    
    // Clear user state
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
