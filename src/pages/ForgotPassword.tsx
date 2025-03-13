
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import PageTransition from '@/components/ui-custom/page-transition';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[calc(100vh-14rem)]">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
              <CardDescription>
                Enter your email address and we'll send you a link to reset your password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
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
              ) : (
                <div className="text-center py-6">
                  <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">Check your email</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We've sent a password reset link to {email}
                  </p>
                </div>
              )}
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
