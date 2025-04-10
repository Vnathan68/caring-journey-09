
import React from 'react';
import { FileText, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/auth-context';
import { ROLES } from '@/lib/utils';

interface PaymentType {
  id: string;
  description: string;
  amount: number;
  dueDate: Date;
  isOverdue: boolean;
}

interface PaymentOverviewCardProps {
  pendingPayments: PaymentType[];
}

const PaymentOverviewCard: React.FC<PaymentOverviewCardProps> = ({ pendingPayments }) => {
  const { user } = useAuth();
  
  // Check if user has permission to record payments
  const canRecordPayments = user?.role === ROLES.ADMIN || 
                           user?.role === ROLES.DOCTOR || 
                           user?.role === ROLES.SECRETARY_NURSE;

  const handleViewInvoice = (id: string) => {
    toast({
      title: "Redirecting",
      description: "Opening invoice details...",
    });
    window.location.href = '/dashboard/payments';
  };

  const handleRecordPayment = (id: string) => {
    toast({
      title: "Record Payment",
      description: "Redirecting to payment recording form...",
    });
    window.location.href = '/dashboard/payments';
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-medium">Payment Overview</CardTitle>
            <CardDescription>Recent and pending invoices</CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-foreground" 
            onClick={() => window.location.href = '/dashboard/payments'}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {pendingPayments.map(payment => (
            <div key={payment.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{payment.description}</p>
                  <p className="text-xs text-muted-foreground">
                    Due: {payment.dueDate.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-2">${payment.amount.toFixed(2)}</span>
                <Badge variant={payment.isOverdue ? "destructive" : "outline"} className="mr-2">
                  {payment.isOverdue ? "Overdue" : "Pending"}
                </Badge>
                {canRecordPayments ? (
                  <Button size="sm" onClick={() => handleRecordPayment(payment.id)}>Record</Button>
                ) : (
                  <Button size="sm" onClick={() => handleViewInvoice(payment.id)}>View</Button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={() => window.location.href = '/dashboard/payments'}
          >
            View All Invoices
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentOverviewCard;
