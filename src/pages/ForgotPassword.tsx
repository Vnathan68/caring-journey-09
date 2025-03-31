
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, ArrowLeft, CheckCircle2, Shield, Key } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import PageTransition from '@/components/ui-custom/page-transition';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resetCode, setResetCode] = useState('');
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      toast({
        title: "Reset link sent",
        description: "Please check your email for password reset instructions.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send reset link. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would validate the code against an API
      if (resetCode === '123456') {
        setIsCodeVerified(true);
        toast({
          title: "Code verified",
          description: "Please set your new password.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Invalid code",
          description: "The verification code you entered is invalid. Please try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to verify code. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const validatePassword = (password: string): { strength: number; feedback: string } => {
    let strength = 0;
    let feedback = '';

    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    switch (strength) {
      case 0:
      case 1:
        feedback = 'Weak - Password is too simple';
        break;
      case 2:
      case 3:
        feedback = 'Moderate - Add more variety';
        break;
      case 4:
        feedback = 'Strong - Good password';
        break;
      case 5:
        feedback = 'Very Strong - Excellent password';
        break;
      default:
        feedback = '';
    }

    return { strength: (strength / 5) * 100, feedback };
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate passwords
      if (newPassword.length < 8) {
        toast({
          variant: "destructive",
          title: "Password too short",
          description: "Password must be at least 8 characters long.",
        });
        setIsSubmitting(false);
        return;
      }

      if (newPassword !== confirmPassword) {
        toast({
          variant: "destructive",
          title: "Passwords don't match",
          description: "Please ensure both passwords match.",
        });
        setIsSubmitting(false);
        return;
      }

      const { strength } = validatePassword(newPassword);
      if (strength < 40) {
        toast({
          variant: "destructive",
          title: "Password too weak",
          description: "Please use a stronger password with letters, numbers and symbols.",
        });
        setIsSubmitting(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Password reset successful",
        description: "Your password has been reset. You can now log in with your new password.",
      });
      
      // In a real app, we would redirect to login page after successful reset
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reset password. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const { strength, feedback } = validatePassword(newPassword);

  const renderEmailStep = () => (
    <form onSubmit={handleSubmitEmail} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      <Button
        type="submit"
        className="w-full bg-clinic-600 hover:bg-clinic-700 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Reset Link"}
      </Button>
    </form>
  );

  const renderCodeVerificationStep = () => (
    <form onSubmit={handleVerifyCode} className="space-y-4">
      <div className="text-center mb-4">
        <Shield className="h-10 w-10 mx-auto text-clinic-600 mb-2" />
        <p className="text-sm text-muted-foreground">
          We've sent a 6-digit verification code to {email}. Enter the code to continue.
        </p>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="resetCode" className="text-sm font-medium">
          Verification Code
        </label>
        <Input
          id="resetCode"
          type="text"
          placeholder="123456"
          className="text-center font-mono tracking-widest"
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          maxLength={6}
          required
        />
      </div>
      
      <div className="flex justify-between text-sm">
        <button 
          type="button" 
          className="text-clinic-600 hover:underline flex items-center"
          onClick={() => setIsSubmitted(false)}
        >
          <ArrowLeft className="h-3 w-3 mr-1" />
          Back
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
        className="w-full bg-clinic-600 hover:bg-clinic-700 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Verifying..." : "Verify Code"}
      </Button>
    </form>
  );

  const renderPasswordResetStep = () => (
    <form onSubmit={handleResetPassword} className="space-y-4">
      <div className="text-center mb-4">
        <Key className="h-10 w-10 mx-auto text-clinic-600 mb-2" />
        <p className="text-sm text-muted-foreground">
          Create a new password for your account.
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="newPassword" className="text-sm font-medium">
          New Password
        </Label>
        <Input
          id="newPassword"
          type="password"
          placeholder="••••••••"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        {newPassword && (
          <div className="space-y-1 mt-1">
            <Progress value={strength} className="h-1" />
            <p className="text-xs text-muted-foreground">{feedback}</p>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm Password
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {confirmPassword && newPassword !== confirmPassword && (
          <p className="text-xs text-destructive mt-1">Passwords do not match</p>
        )}
      </div>
      
      <Button
        type="submit"
        className="w-full bg-clinic-600 hover:bg-clinic-700 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  );

  const renderSuccessStep = () => (
    <div className="text-center py-6">
      <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
        <CheckCircle2 className="h-6 w-6 text-green-600" />
      </div>
      <h3 className="mt-4 text-lg font-medium">Check your email</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        We've sent a password reset link to {email}
      </p>
    </div>
  );

  const renderCurrentStep = () => {
    if (!isSubmitted) {
      return renderEmailStep();
    } else if (isSubmitted && !isCodeVerified) {
      return renderCodeVerificationStep();
    } else if (isCodeVerified) {
      return renderPasswordResetStep();
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[calc(100vh-14rem)]">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
              <CardDescription>
                {!isSubmitted 
                  ? "Enter your email address and we'll send you a link to reset your password."
                  : !isCodeVerified
                    ? "Verify your identity with the code we sent"
                    : "Create a new password for your account"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderCurrentStep()}
            </CardContent>
            <CardFooter>
              <div className="text-center w-full">
                <Link
                  to="/login"
                  className="text-sm text-clinic-600 hover:text-clinic-700"
                >
                  Back to login
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default ForgotPassword;
