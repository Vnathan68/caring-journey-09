
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { Loader2, Mail, Key } from 'lucide-react';

interface LoginFormProps {
  onShowTwoFactor: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onShowTwoFactor }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

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
      // Note: Navigation happens in the parent component
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
};

export default LoginForm;
