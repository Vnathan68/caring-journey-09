
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import LoginForm from '@/components/auth/LoginForm';
import TwoFactorForm from '@/components/auth/TwoFactorForm';
import LoginHeader from '@/components/auth/LoginHeader';
import LoginFooter from '@/components/auth/LoginFooter';

const Login = () => {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const { isAuthenticated, user } = useAuth();

  // If already authenticated, redirect to appropriate dashboard
  if (isAuthenticated && user) {
    let redirectPath = '/dashboard';
    
    switch (user.role) {
      case 'admin':
        redirectPath = '/dashboard/admin';
        break;
      case 'doctor':
        redirectPath = '/dashboard';
        break;
      case 'secretary_nurse':
        redirectPath = '/dashboard/secretary';
        break;
      case 'patient':
        redirectPath = '/dashboard/patient';
        break;
    }
    
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {!showTwoFactor ? (
            <>
              <LoginHeader />
              <div className="mt-8">
                <LoginForm onShowTwoFactor={() => setShowTwoFactor(true)} />
              </div>
              <LoginFooter />
            </>
          ) : (
            <TwoFactorForm onCancel={() => setShowTwoFactor(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
