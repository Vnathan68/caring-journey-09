
import React, { createContext, useContext } from 'react';
import { AuthContextType } from '@/types/auth-types';
import { useAuthOperations } from '@/hooks/use-auth-operations';
import { usePersistentUser } from '@/hooks/use-persistent-user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const persistentUser = usePersistentUser();
  const authOperations = useAuthOperations();
  
  // Use the persistent user
  React.useEffect(() => {
    if (persistentUser.user && !authOperations.user) {
      authOperations.setUser(persistentUser.user);
    }
  }, [persistentUser.user]);
  
  // Update persistent user when auth user changes
  React.useEffect(() => {
    if (authOperations.user) {
      persistentUser.setUser(authOperations.user);
    } else if (authOperations.user === null) {
      persistentUser.setUser(null);
    }
  }, [authOperations.user]);
  
  const value: AuthContextType = {
    user: authOperations.user,
    isAuthenticated: !!authOperations.user,
    isLoading: authOperations.isLoading,
    needsTwoFactor: authOperations.needsTwoFactor,
    login: authOperations.login,
    logout: authOperations.logout,
    signUp: authOperations.signUp,
    verifyTwoFactorCode: authOperations.verifyTwoFactorCode,
    resetPassword: authOperations.resetPassword,
    changePassword: authOperations.changePassword,
    enableTwoFactor: authOperations.enableTwoFactor,
    disableTwoFactor: authOperations.disableTwoFactor,
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
