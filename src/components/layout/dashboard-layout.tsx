
import React, { useEffect } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import LoadingSpinner from '@/components/ui-custom/loading-spinner';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from './dashboard-sidebar';
import { ROLES } from '@/lib/utils';

const DashboardLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect to the appropriate dashboard based on user role
  useEffect(() => {
    if (user && isAuthenticated) {
      // If we're at exactly /dashboard, redirect based on role
      if (window.location.pathname === '/dashboard') {
        if (user.role === ROLES.DOCTOR) {
          // Already on the doctor dashboard, no redirect needed
        } else if (user.role === ROLES.PATIENT) {
          navigate('/dashboard/patient', { replace: true });
        }
        // Add other roles as needed
      }
    }
  }, [user, isAuthenticated, navigate]);

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
    <SidebarProvider>
      <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-900">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto py-8 px-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
