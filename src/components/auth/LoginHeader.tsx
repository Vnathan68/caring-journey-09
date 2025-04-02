
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const LoginHeader: React.FC = () => {
  return (
    <div className="text-center">
      <Link to="/" className="inline-flex items-center justify-center mb-6">
        <Heart className="h-10 w-10 text-clinic-600" />
      </Link>
      <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
      <p className="text-muted-foreground">Sign in to access your account</p>
    </div>
  );
};

export default LoginHeader;
