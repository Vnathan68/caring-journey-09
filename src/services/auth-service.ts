
import { apiService } from './api-service';
import { User } from '@/types/auth-types';
import { AUTH_ENDPOINTS } from './api-config';

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
    return apiService.post<User>(AUTH_ENDPOINTS.LOGIN, { email, password });
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
    return apiService.post<User>(AUTH_ENDPOINTS.REGISTER, userData);
  },

  /**
   * Verify two-factor authentication code
   * @param code - 2FA code
   * @returns Promise with user data
   */
  verifyTwoFactor: async (code: string): Promise<User> => {
    return apiService.post<User>(AUTH_ENDPOINTS.VERIFY_2FA, { code });
  },

  /**
   * Request password reset
   * @param email - User email
   */
  resetPassword: async (email: string): Promise<void> => {
    return apiService.post<void>(AUTH_ENDPOINTS.RESET_PASSWORD, { email });
  },

  /**
   * Change user password
   * @param currentPassword - Current password
   * @param newPassword - New password
   */
  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    return apiService.post<void>(AUTH_ENDPOINTS.CHANGE_PASSWORD, { currentPassword, newPassword });
  },

  /**
   * Enable two-factor authentication
   */
  enableTwoFactor: async (): Promise<void> => {
    return apiService.post<void>(AUTH_ENDPOINTS.ENABLE_2FA, {});
  },

  /**
   * Disable two-factor authentication
   */
  disableTwoFactor: async (): Promise<void> => {
    return apiService.post<void>(AUTH_ENDPOINTS.DISABLE_2FA, {});
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    return apiService.post<void>(AUTH_ENDPOINTS.LOGOUT, {});
  },
};
