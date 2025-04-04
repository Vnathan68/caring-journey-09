
import React from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Navigate } from 'react-router-dom';
import AdminUserManagement from '@/components/dashboard/admin/AdminUserManagement';
import PageTransition from '@/components/ui-custom/page-transition';
import { ROLES } from '@/lib/utils';

const UsersPage: React.FC = () => {
  const { user } = useAuth();

  // Redirect non-admin users
  if (user && user.role !== ROLES.ADMIN) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">User Management</h1>
        </div>
        <AdminUserManagement />
      </div>
    </PageTransition>
  );
};

export default UsersPage;
