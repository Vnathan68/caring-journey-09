
import React from 'react';
import ApiConnectionTester from '@/components/system/ApiConnectionTester';
import PageTransition from '@/components/ui-custom/page-transition';

const ApiTest = () => {
  return (
    <PageTransition className="min-h-screen p-6 bg-gray-50">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">API Connection Test</h1>
        <ApiConnectionTester />
      </div>
    </PageTransition>
  );
};

export default ApiTest;
