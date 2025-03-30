
import React from 'react';
import PageTransition from '@/components/ui-custom/page-transition';
import { Helmet } from 'react-helmet-async';
import BillingOverview from '@/components/dashboard/BillingOverview';

const PaymentsPage: React.FC = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Payments & Billing | Santa Matilda</title>
        <meta name="description" content="Manage your payments and review billing information at Santa Matilda Women's Health Clinic" />
      </Helmet>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Payments & Billing</h1>
          <p className="text-muted-foreground">Manage invoices and payment methods</p>
        </div>
        
        <BillingOverview />
      </div>
    </PageTransition>
  );
};

export default PaymentsPage;
