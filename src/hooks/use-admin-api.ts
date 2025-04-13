
import { usePhpFetch, usePhpPost, usePhpUpdate, usePhpDelete } from './use-php-api';
import { ADMIN_ENDPOINTS } from '@/services/api-config';

// Interface for admin data
export interface AdminData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  profileImage?: string;
  lastLogin?: string;
}

// Interface for admin list response
export interface AdminListResponse {
  status: string;
  data: AdminData[];
}

// Interface for single admin response
export interface AdminResponse {
  status: string;
  data: AdminData;
}

// Interface for dashboard stats
export interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  totalStaff: number;
  appointmentsToday: number;
  newRegistrationsThisWeek: number;
  revenueThisMonth: number;
}

// Hook for getting a list of admins
export function useAdminList() {
  return usePhpFetch<AdminListResponse>(
    'admins/list', 
    ['admins'],
    {
      meta: {
        onError: (error: Error) => {
          console.error('Error fetching admins:', error);
        }
      }
    }
  );
}

// Hook for getting a single admin
export function useAdminDetails(adminId: string) {
  return usePhpFetch<AdminResponse>(
    `admins/get?id=${adminId}`,
    ['admin', adminId],
    {
      enabled: !!adminId,
      meta: {
        onError: (error: Error) => {
          console.error(`Error fetching admin ${adminId}:`, error);
        }
      }
    }
  );
}

// Hook for registering a new admin
export function useRegisterAdmin() {
  return usePhpPost<AdminResponse, Omit<AdminData, 'id'>>('admins/register', {
    onSuccess: (data) => {
      console.log('Admin registered successfully:', data);
    }
  });
}

// Hook for updating an admin
export function useUpdateAdmin() {
  return usePhpUpdate<AdminResponse, AdminData>('admins/update', {
    onSuccess: (data) => {
      console.log('Admin updated successfully:', data);
    }
  });
}

// Hook for deleting an admin
export function useDeleteAdmin() {
  return usePhpDelete<{ status: string }>('admins/delete', {
    onSuccess: (data) => {
      console.log('Admin deleted successfully:', data);
    }
  });
}

// Hook for getting dashboard statistics
export function useDashboardStats() {
  return usePhpFetch<{ status: string, data: DashboardStats }>(
    'admins/stats', 
    ['dashboardStats'],
    {
      meta: {
        onError: (error: Error) => {
          console.error('Error fetching dashboard stats:', error);
        }
      }
    }
  );
}
