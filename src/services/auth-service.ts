import apiService, { ApiResponse } from './api-service';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  twoFactorEnabled: boolean;
}

export interface LoginResponse {
  status: string;
  data?: User;
  message?: string;
  needsTwoFactor?: boolean;
}

export interface TwoFactorVerifyResponse {
  status: string;
  data?: User;
  message?: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      // Use the actual API endpoint for login
      const response = await apiService.post<LoginResponse>('auth/login', credentials);
      
      // Check for two-factor authentication requirement
      if (response.status === 'two_factor_required') {
        return {
          status: 'two_factor_required',
          needsTwoFactor: true,
          message: 'Two-factor authentication required'
        };
      }
      
      return {
        status: response.status,
        data: response.data,
        message: response.message,
        needsTwoFactor: false
      };
    } catch (error) {
      console.error('Login API call failed:', error);
      
      // If the API is unreachable, fall back to mock service for development
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.warn('API unreachable. Falling back to mock authentication service.');
        return this.mockLogin(credentials);
      }
      
      throw error;
    }
  }

  async logout(): Promise<ApiResponse<any>> {
    try {
      // Use the actual API endpoint for logout
      return await apiService.post('auth/logout', {});
    } catch (error) {
      console.error('Logout API call failed:', error);
      
      // If the API is unreachable, fall back to mock service for development
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.warn('API unreachable. Falling back to mock authentication service.');
        return this.mockLogout();
      }
      
      throw error;
    }
  }

  async verifyTwoFactorCode(code: string): Promise<TwoFactorVerifyResponse> {
    try {
      // Use the actual API endpoint for 2FA verification
      const response = await apiService.post<TwoFactorVerifyResponse>('auth/verify-2fa', { code });
      
      return {
        status: response.status,
        data: response.data,
        message: response.message
      };
    } catch (error) {
      console.error('2FA verification API call failed:', error);
      
      // If the API is unreachable, fall back to mock service for development
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.warn('API unreachable. Falling back to mock authentication service.');
        return this.mockVerifyTwoFactorCode(code);
      }
      
      throw error;
    }
  }
  
  // Mock implementations for development when API is unreachable
  private mockLogin(credentials: LoginCredentials): Promise<LoginResponse> {
    console.log('Using mock auth service - login attempt for:', credentials.email);
    
    // Mock response based on credentials
    const mockUsers = {
      'admin@example.com': {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
        twoFactorEnabled: false,
      },
      'doctor@example.com': {
        id: '2',
        name: 'Dr. Maria Santos',
        email: 'doctor@example.com',
        role: 'doctor',
        twoFactorEnabled: false,
      },
      'cashier@example.com': {
        id: '3',
        name: 'Reception Staff',
        email: 'cashier@example.com',
        role: 'secretary_nurse',
        twoFactorEnabled: false,
      },
      'patient@example.com': {
        id: '4',
        name: 'Test Patient',
        email: 'patient@example.com',
        role: 'patient',
        twoFactorEnabled: false,
      },
    };

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For testing purposes, use 'password123' as the valid password for all mock users
        if (credentials.password !== 'password123') {
          reject(new Error('Invalid email or password'));
          return;
        }

        const user = mockUsers[credentials.email as keyof typeof mockUsers];
        if (!user) {
          reject(new Error('Invalid email or password'));
          return;
        }

        resolve({
          status: 'success',
          data: user,
        });
      }, 500); // Simulate network delay
    });
  }

  private mockLogout(): Promise<ApiResponse<any>> {
    console.log('Using mock auth service - logout');
    
    return Promise.resolve({
      status: 'success',
      message: 'Logged out successfully',
    });
  }

  private mockVerifyTwoFactorCode(code: string): Promise<TwoFactorVerifyResponse> {
    console.log('Using mock auth service - 2FA verify:', code);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (code === '123456') {
          resolve({
            status: 'success',
            data: {
              id: '1',
              name: 'Admin User',
              email: 'admin@example.com',
              role: 'admin',
              twoFactorEnabled: true,
            },
          });
        } else {
          reject(new Error('Invalid verification code'));
        }
      }, 500);
    });
  }
}

const authService = new AuthService();
export default authService;
