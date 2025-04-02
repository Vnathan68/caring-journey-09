
import { ROLES, UserRole } from '@/lib/utils';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  twoFactorEnabled?: boolean;
  [key: string]: any; // For additional properties
}

export interface AuthContextType {
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
