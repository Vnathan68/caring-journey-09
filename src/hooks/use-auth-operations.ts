
import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '@/lib/utils';

export const useAuthOperations = () => {
  const { login: authLogin, logout: authLogout, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isTwoFactorRequired, setIsTwoFactorRequired] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      const user = await authLogin(email, password);
      toast({
        title: 'Login successful',
        description: `Welcome back, ${user?.name || 'User'}!`,
      });

      // Redirect based on user role
      if (user) {
        switch(user.role) {
          case ROLES.ADMIN:
            navigate('/dashboard/admin', { replace: true });
            break;
          case ROLES.DOCTOR:
            navigate('/dashboard', { replace: true });
            break;
          case ROLES.PATIENT:
            navigate('/dashboard/patient', { replace: true });
            break;
          case ROLES.SECRETARY_NURSE:
            navigate('/dashboard/secretary', { replace: true });
            break;
          default:
            navigate('/dashboard', { replace: true });
        }
      }
      
      return user;
    } catch (error) {
      console.log('Login error:', error);
      if (error instanceof Error && error.message === 'Two-factor authentication required') {
        setIsTwoFactorRequired(true);
        return null;
      }

      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'Invalid email or password',
        variant: 'destructive',
      });
      
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authLogout();
      navigate('/login', { replace: true });
    } catch (error) {
      toast({
        title: 'Logout failed',
        description: 'An error occurred during logout',
        variant: 'destructive',
      });
    }
  };

  return {
    login,
    logout,
    isTwoFactorRequired,
    setIsTwoFactorRequired,
    user,
  };
};
