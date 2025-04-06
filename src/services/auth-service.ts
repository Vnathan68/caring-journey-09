
import { apiService } from './api-service';
import { User } from '@/types/auth-types';

/**
 * Service for authentication-related API calls to PHP backend
 */
export const authService = {
  /**
   * Login user via PHP backend
   * @param email - User email
   * @param password - User password
   * @returns Promise with user data
   */
  login: async (email: string, password: string): Promise<User> => {
    return apiService.post<User>('auth/login', { email, password });
  },

  /**
   * Register new user via PHP backend
   * @param userData - User registration data
   * @returns Promise with created user
   */
  register: async (userData: {
    email: string;
    password: string;
    name: string;
    role?: string;
  }): Promise<User> => {
    return apiService.post<User>('auth/register', userData);
  },

  /**
   * Verify two-factor authentication code
   * @param code - 2FA code
   * @returns Promise with user data
   */
  verifyTwoFactor: async (code: string): Promise<User> => {
    return apiService.post<User>('auth/verify-2fa', { code });
  },

  /**
   * Request password reset
   * @param email - User email
   */
  resetPassword: async (email: string): Promise<void> => {
    return apiService.post<void>('auth/reset-password', { email });
  },

  /**
   * Change user password
   * @param currentPassword - Current password
   * @param newPassword - New password
   */
  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    return apiService.post<void>('auth/change-password', { currentPassword, newPassword });
  },

  /**
   * Enable two-factor authentication
   */
  enableTwoFactor: async (): Promise<void> => {
    return apiService.post<void>('auth/enable-2fa', {});
  },

  /**
   * Disable two-factor authentication
   */
  disableTwoFactor: async (): Promise<void> => {
    return apiService.post<void>('auth/disable-2fa', {});
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    return apiService.post<void>('auth/logout', {});
  },
};
