
import apiService from './api-service';

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
  // In production, this would use the real API
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // For development, let's use mock responses due to CORS issues
    // In production, you'd uncomment this:
    // return apiService.post<User>('/auth/login', credentials);
    
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

  async logout(): Promise<{ status: string; message: string }> {
    // For development, let's use a mock response
    // In production, you'd use:
    // return apiService.post('/auth/logout', {});
    
    console.log('Using mock auth service - logout');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'success',
          message: 'Logged out successfully',
        });
      }, 300);
    });
  }

  async verifyTwoFactorCode(code: string): Promise<TwoFactorVerifyResponse> {
    // For development, let's use a mock response
    // In production, you'd use:
    // return apiService.post('/auth/verify-2fa', { code });
    
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
