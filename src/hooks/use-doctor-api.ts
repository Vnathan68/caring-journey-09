
import { usePhpFetch, usePhpPost, usePhpUpdate, usePhpDelete } from './use-php-api';
import { PATIENT_ENDPOINTS } from '@/services/api-config';

// Interface for doctor data
export interface DoctorData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialty: string;
  bio?: string;
  consultationFee?: number;
  availability?: string[];
  profileImage?: string;
  status: 'active' | 'inactive' | 'on_leave';
  licenseNumber: string;
  startDate: string;
}

// Interface for doctor list response
export interface DoctorListResponse {
  status: string;
  data: DoctorData[];
}

// Interface for single doctor response
export interface DoctorResponse {
  status: string;
  data: DoctorData;
}

// Hook for getting a list of doctors
export function useDoctorList() {
  return usePhpFetch<DoctorListResponse>(
    'doctors/list', 
    ['doctors'],
    {
      meta: {
        onError: (error: Error) => {
          console.error('Error fetching doctors:', error);
        }
      }
    }
  );
}

// Hook for getting a single doctor
export function useDoctorDetails(doctorId: string) {
  return usePhpFetch<DoctorResponse>(
    `doctors/get?id=${doctorId}`,
    ['doctor', doctorId],
    {
      enabled: !!doctorId,
      meta: {
        onError: (error: Error) => {
          console.error(`Error fetching doctor ${doctorId}:`, error);
        }
      }
    }
  );
}

// Hook for registering a new doctor
export function useRegisterDoctor() {
  return usePhpPost<DoctorResponse, Omit<DoctorData, 'id'>>('doctors/register', {
    onSuccess: (data) => {
      console.log('Doctor registered successfully:', data);
    }
  });
}

// Hook for updating a doctor
export function useUpdateDoctor() {
  return usePhpUpdate<DoctorResponse, DoctorData>('doctors/update', {
    onSuccess: (data) => {
      console.log('Doctor updated successfully:', data);
    }
  });
}

// Hook for deleting a doctor
export function useDeleteDoctor() {
  return usePhpDelete<{ status: string }>('doctors/delete', {
    onSuccess: (data) => {
      console.log('Doctor deleted successfully:', data);
    }
  });
}
