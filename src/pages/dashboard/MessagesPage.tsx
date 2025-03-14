
import React from 'react';
import { Card } from '@/components/ui/card';
import PageTransition from '@/components/ui-custom/page-transition';
import MessageCenter from '@/components/dashboard/MessageCenter';

const MessagesPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Communicate with your healthcare providers</p>
        </div>
        
        <MessageCenter />
      </div>
    </PageTransition>
  );
};

export default MessagesPage;
