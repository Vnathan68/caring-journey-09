
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GlassCard from '@/components/ui-custom/glass-card';
import PageTransition from '@/components/ui-custom/page-transition';
import LoginForm from '@/components/auth/LoginForm';
import TwoFactorForm from '@/components/auth/TwoFactorForm';
import LoginHeader from '@/components/auth/LoginHeader';
import LoginFooter from '@/components/auth/LoginFooter';

const Login: React.FC = () => {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login("", ""); // These values are managed in the LoginForm component
      navigate('/dashboard');
    } catch (error) {
      // Error handling is done in the LoginForm component
    }
  };

  return (
    <PageTransition className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <LoginHeader />
        
        <GlassCard className="p-8">
          {showTwoFactor ? (
            <TwoFactorForm 
              onBack={() => setShowTwoFactor(false)}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              twoFactorCode={twoFactorCode}
              setTwoFactorCode={setTwoFactorCode}
            />
          ) : (
            <LoginForm 
              onShowTwoFactor={() => setShowTwoFactor(true)} 
            />
          )}
          
          <LoginFooter />
        </GlassCard>
      </div>
    </PageTransition>
  );
};

export default Login;
