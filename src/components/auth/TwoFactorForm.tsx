
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Shield, Smartphone } from 'lucide-react';

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
  return (
    <form onSubmit={onSubmit} className="space-y-6">
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
  );
};

export default TwoFactorForm;
