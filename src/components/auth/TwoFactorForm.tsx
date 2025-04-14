
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Shield } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/auth-context';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { ROLES } from '@/lib/utils';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  twoFactorCode: z.string()
    .min(6, 'Code must be 6 digits')
    .max(6, 'Code must be 6 digits')
    .regex(/^\d+$/, 'Code must contain only numbers')
});

type FormValues = z.infer<typeof formSchema>;

interface TwoFactorFormProps {
  onCancel: () => void;
}

const TwoFactorForm: React.FC<TwoFactorFormProps> = ({ onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { verifyTwoFactorCode } = useAuth();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      twoFactorCode: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const user = await verifyTwoFactorCode(data.twoFactorCode);
      toast.success('Two-factor verification successful');
      
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
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Verification failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Shield className="mx-auto h-12 w-12 text-blue-500 mb-4" />
        <h2 className="text-2xl font-bold">Two-Factor Authentication</h2>
        <p className="text-muted-foreground mt-2">
          Enter the verification code from your authenticator app
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="twoFactorCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123456"
                    className="text-center text-xl h-12 letter-spacing-wide font-mono"
                    {...field}
                    maxLength={6}
                    autoComplete="one-time-code"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Back
            </Button>
            
            <Button 
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : 'Verify'}
            </Button>
          </div>
        </form>
      </Form>
      
      <div className="text-center text-sm text-muted-foreground">
        <p>Use code <span className="font-mono bg-muted px-1 py-0.5 rounded">123456</span> for testing</p>
      </div>
    </div>
  );
};

export default TwoFactorForm;
