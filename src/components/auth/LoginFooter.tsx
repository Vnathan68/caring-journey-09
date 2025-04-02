
import React from 'react';
import { Link } from 'react-router-dom';

const LoginFooter: React.FC = () => {
  return (
    <>
      <div className="mt-6 text-center text-sm">
        <p className="text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/signup" className="text-clinic-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
      
      <div className="text-center text-xs text-muted-foreground">
        <p>Demo Accounts:</p>
        <p>admin@example.com / doctor@example.com / cashier@example.com / patient@example.com</p>
        <p>All with password: password123</p>
        <p className="mt-1">(No 2FA is required for any account)</p>
      </div>
    </>
  );
};

export default LoginFooter;
