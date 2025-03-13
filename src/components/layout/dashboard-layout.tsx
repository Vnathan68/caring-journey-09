
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import DashboardSidebar from './dashboard-sidebar';
import { useAuth } from '@/contexts/auth-context';
import LoadingSpinner from '@/components/ui-custom/loading-spinner';

const DashboardLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto py-8 px-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
