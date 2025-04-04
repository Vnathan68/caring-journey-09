
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
import { ROLES } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { verifyTwoFactorCode } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (showTwoFactor) {
        const user = await verifyTwoFactorCode(twoFactorCode);
        toast.success('Login successful');
        
        // Redirect based on user role after 2FA verification
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
      } 
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Verification failed');
    } finally {
      setIsSubmitting(false);
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
