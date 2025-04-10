
import React, { useState } from 'react';
import PageTransition from '@/components/ui-custom/page-transition';
import { Helmet } from 'react-helmet-async';
import BillingOverview from '@/components/dashboard/BillingOverview';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, FilePlus } from 'lucide-react';
import { ROLES } from '@/lib/utils';

const PaymentsPage: React.FC = () => {
  const { user } = useAuth();
  const [showNewPaymentModal, setShowNewPaymentModal] = useState(false);
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  
  // Check if user has permission to record payments and create invoices
  const canManageFinancials = user?.role === ROLES.ADMIN || 
                             user?.role === ROLES.DOCTOR || 
                             user?.role === ROLES.SECRETARY_NURSE;

  // Simple modal component for recording new payment
  const RecordPaymentModal = () => {
    if (!showNewPaymentModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">Record New Payment</h3>
          {/* Payment recording form would go here */}
          <p className="text-muted-foreground mb-4">
            Enter the payment details including patient information, amount, and payment method.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowNewPaymentModal(false)}>
              Cancel
            </Button>
            <Button className="bg-clinic-600 hover:bg-clinic-700 text-white" onClick={() => setShowNewPaymentModal(false)}>
              Save Payment
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // Simple modal component for creating new invoice
  const CreateInvoiceModal = () => {
    if (!showNewInvoiceModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">Create New Invoice</h3>
          {/* Invoice creation form would go here */}
          <p className="text-muted-foreground mb-4">
            Create a new invoice by selecting a patient and services provided.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowNewInvoiceModal(false)}>
              Cancel
            </Button>
            <Button className="bg-clinic-600 hover:bg-clinic-700 text-white" onClick={() => setShowNewInvoiceModal(false)}>
              Create Invoice
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Payments & Billing | Santa Matilda</title>
        <meta name="description" content="Manage your payments and review billing information at Santa Matilda Women's Health Clinic" />
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Payments & Billing</h1>
            <p className="text-muted-foreground">
              {canManageFinancials 
                ? "Manage invoices and record payments" 
                : "View your invoices and payment history"}
            </p>
          </div>
          
          {canManageFinancials && (
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setShowNewInvoiceModal(true)}
              >
                <FilePlus className="h-4 w-4" />
                New Invoice
              </Button>
              <Button 
                className="bg-clinic-600 hover:bg-clinic-700 text-white flex items-center gap-2"
                onClick={() => setShowNewPaymentModal(true)}
              >
                <PlusCircle className="h-4 w-4" />
                Record Payment
              </Button>
            </div>
          )}
        </div>
        
        {canManageFinancials ? (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Payment Management</CardTitle>
              <CardDescription>Record and track manual payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 border rounded-md">
                  <p className="text-2xl font-bold text-clinic-600">₱5,900</p>
                  <p className="text-sm text-muted-foreground">Payments Today</p>
                </div>
                <div className="p-4 border rounded-md">
                  <p className="text-2xl font-bold text-amber-600">₱23,400</p>
                  <p className="text-sm text-muted-foreground">Outstanding Balance</p>
                </div>
                <div className="p-4 border rounded-md">
                  <p className="text-2xl font-bold text-green-600">₱142,500</p>
                  <p className="text-sm text-muted-foreground">Total Revenue (Month)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null}
        
        <BillingOverview />

        {/* Payment modals */}
        <RecordPaymentModal />
        <CreateInvoiceModal />
      </div>
    </PageTransition>
  );
};

export default PaymentsPage;
