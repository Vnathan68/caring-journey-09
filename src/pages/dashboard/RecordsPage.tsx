
import React from 'react';
import PageTransition from '@/components/ui-custom/page-transition';
import { Helmet } from 'react-helmet-async';
import MedicalRecords from '@/components/dashboard/records/MedicalRecords';

const RecordsPage: React.FC = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Medical Records | Santa Matilda</title>
        <meta name="description" content="Access and manage your medical records at Santa Matilda Women's Health Clinic" />
      </Helmet>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Medical Records</h1>
          <p className="text-muted-foreground">View and download your medical information</p>
        </div>
        
        <MedicalRecords />
      </div>
    </PageTransition>
  );
};

export default RecordsPage;
