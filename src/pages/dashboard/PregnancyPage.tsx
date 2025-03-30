
import React from 'react';
import PageTransition from '@/components/ui-custom/page-transition';
import { Helmet } from 'react-helmet-async';
import PregnancyTracker from '@/components/dashboard/pregnancy/PregnancyTracker';

const PregnancyPage: React.FC = () => {
  // Mock data - in a real app, this would come from an API/context
  const gestationalAge = 22;
  const dueDate = new Date('2023-09-15');

  return (
    <PageTransition>
      <Helmet>
        <title>Pregnancy Tracker | Santa Matilda</title>
        <meta name="description" content="Track your pregnancy journey at Santa Matilda Women's Health Clinic" />
      </Helmet>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Pregnancy Tracker</h1>
          <p className="text-muted-foreground">Follow your pregnancy journey</p>
        </div>
        
        <PregnancyTracker 
          gestationalAge={gestationalAge} 
          dueDate={dueDate} 
        />
      </div>
    </PageTransition>
  );
};

export default PregnancyPage;
