
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Shield, Smartphone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
  onBack: () => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  twoFactorCode: string;
  setTwoFactorCode: (code: string) => void;
}

const TwoFactorForm: React.FC<TwoFactorFormProps> = ({
  onBack,
  isSubmitting,
  onSubmit,
  twoFactorCode,
  setTwoFactorCode
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      twoFactorCode: twoFactorCode
    },
  });

  const handleSubmit = async (data: FormValues) => {
    setTwoFactorCode(data.twoFactorCode);
    
    // We need to create a synthetic event to pass to the original onSubmit
    const event = {
      preventDefault: () => {},
    } as React.FormEvent;
    
    await onSubmit(event);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="text-center mb-4">
          <Shield className="h-12 w-12 mx-auto text-clinic-600 mb-2" />
          <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
          <p className="text-sm text-muted-foreground">
            We've sent a 6-digit code to your registered device. 
            Enter the code to continue.
          </p>
        </div>

        <FormField
          control={form.control}
          name="twoFactorCode"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Verification Code</FormLabel>
              <div className="relative">
                <Smartphone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="123456"
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                      field.onChange(value);
                      setTwoFactorCode(value);
                    }}
                    className="h-12 pl-10 focus-visible:ring-clinic-500/30 focus-visible:border-clinic-500 text-center font-mono text-lg tracking-widest"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between text-sm">
          <button 
            type="button" 
            className="text-clinic-600 hover:underline"
            onClick={onBack}
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
    </Form>
  );
};

export default TwoFactorForm;
