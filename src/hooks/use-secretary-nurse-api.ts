
import { usePhpFetch, usePhpPost, usePhpUpdate, usePhpDelete } from './use-php-api';
import { SECRETARY_NURSE_ENDPOINTS } from '@/services/api-config';

// Interface for secretary/nurse data
export interface SecretaryNurseData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  isNurse: boolean;
  nursingLicense?: string;
  profileImage?: string;
  status: 'active' | 'inactive' | 'on_leave';
  hireDate: string;
}

// Interface for secretary/nurse list response
export interface SecretaryNurseListResponse {
  status: string;
  data: SecretaryNurseData[];
}

// Interface for single secretary/nurse response
export interface SecretaryNurseResponse {
  status: string;
  data: SecretaryNurseData;
}

// Hook for getting a list of secretary/nurses
export function useSecretaryNurseList() {
  return usePhpFetch<SecretaryNurseListResponse>(
    'secretary-nurses/list', 
    ['secretaryNurses'],
    {
      meta: {
        onError: (error: Error) => {
          console.error('Error fetching secretary/nurses:', error);
        }
      }
    }
  );
}

// Hook for getting a single secretary/nurse
export function useSecretaryNurseDetails(secretaryNurseId: string) {
  return usePhpFetch<SecretaryNurseResponse>(
    `secretary-nurses/get?id=${secretaryNurseId}`,
    ['secretaryNurse', secretaryNurseId],
    {
      enabled: !!secretaryNurseId,
      meta: {
        onError: (error: Error) => {
          console.error(`Error fetching secretary/nurse ${secretaryNurseId}:`, error);
        }
      }
    }
  );
}

// Hook for registering a new secretary/nurse
export function useRegisterSecretaryNurse() {
  return usePhpPost<SecretaryNurseResponse, Omit<SecretaryNurseData, 'id'>>('secretary-nurses/register', {
    onSuccess: (data) => {
      console.log('Secretary/Nurse registered successfully:', data);
    }
  });
}

// Hook for updating a secretary/nurse
export function useUpdateSecretaryNurse() {
  return usePhpUpdate<SecretaryNurseResponse, SecretaryNurseData>('secretary-nurses/update', {
    onSuccess: (data) => {
      console.log('Secretary/Nurse updated successfully:', data);
    }
  });
}

// Hook for deleting a secretary/nurse
export function useDeleteSecretaryNurse() {
  return usePhpDelete<{ status: string }>('secretary-nurses/delete', {
    onSuccess: (data) => {
      console.log('Secretary/Nurse deleted successfully:', data);
    }
  });
}
