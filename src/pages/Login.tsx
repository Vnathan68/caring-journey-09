import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GlassCard from '@/components/ui-custom/glass-card';
import PageTransition from '@/components/ui-custom/page-transition';
import { toast } from '@/hooks/use-toast';
import { 
  Heart, Loader2, Mail, Key, Shield, 
  Smartphone, CheckCircle2, AlertCircle 
} from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderLoginForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="yourname@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 pl-10 focus-visible:ring-clinic-500/30 focus-visible:border-clinic-500"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link to="/forgot-password" className="text-xs text-clinic-600 hover:underline">
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-12 pl-10 focus-visible:ring-clinic-500/30 focus-visible:border-clinic-500"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox 
          id="remember-me" 
          checked={rememberMe} 
          onCheckedChange={() => setRememberMe(!rememberMe)}
        />
        <label
          htmlFor="remember-me"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Remember me
        </label>
      </div>
      
      <Button 
        type="submit" 
        className="w-full h-12 bg-clinic-600 hover:bg-clinic-700 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : 'Sign in'}
      </Button>
    </form>
  );

  const renderTwoFactorForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-4">
        <Shield className="h-12 w-12 mx-auto text-clinic-600 mb-2" />
        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
        <p className="text-sm text-muted-foreground">
          We've sent a 6-digit code to your registered device. 
          Enter the code to continue.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="twoFactorCode">Verification Code</Label>
        <div className="relative">
          <Smartphone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="twoFactorCode"
            type="text"
            placeholder="123456"
            value={twoFactorCode}
            onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            required
            maxLength={6}
            className="h-12 pl-10 focus-visible:ring-clinic-500/30 focus-visible:border-clinic-500 text-center font-mono text-lg tracking-widest"
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <button 
          type="button" 
          className="text-clinic-600 hover:underline"
          onClick={() => setShowTwoFactor(false)}
        >
          Back to login
        </button>
        <button 
          type="button" 
          className="text-clinic-600 hover:underline"
        >
          Resend code
        </button>
      </div>

      <Button 
        type="submit" 
        className="w-full h-12 bg-clinic-600 hover:bg-clinic-700 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verifying...
          </>
        ) : 'Verify'}
      </Button>
    </form>
  );

  return (
    <PageTransition className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center justify-center mb-6">
            <Heart className="h-10 w-10 text-clinic-600" />
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to access your account</p>
        </div>
        
        <GlassCard className="p-8">
          {showTwoFactor ? renderTwoFactorForm() : renderLoginForm()}
          
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="text-clinic-600 hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </GlassCard>
        
        <div className="text-center text-xs text-muted-foreground">
          <p>Demo Accounts:</p>
          <p>admin@example.com / doctor@example.com / cashier@example.com / patient@example.com</p>
          <p>All with password: password123</p>
          <p className="mt-1">(No 2FA is required for any account)</p>
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;
