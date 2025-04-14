
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions, QueryKey } from '@tanstack/react-query';
import apiService from '@/services/api-service';
import { toast } from '@/hooks/use-toast';
import { PATIENT_ENDPOINTS } from '@/services/api-config';

export interface PatientData {
  id?: string;
  firstName: string;
  lastName: string;
  name?: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  medicalHistory?: MedicalHistoryItem[];
  pregnancyData?: PregnancyData;
  lastVisit?: string;
  status?: 'active' | 'inactive' | 'pending';
}

export interface MedicalHistoryItem {
  id?: string;
  type: string;
  date: string;
  description: string;
  doctorName?: string;
  attachments?: string[];
}

export interface PregnancyData {
  id?: string;
  isPregnant: boolean;
  gestationalAge?: number;
  dueDate?: string;
  lastCheckup?: string;
  notes?: string;
}

/**
 * Hook for patient registration
 */
export function useRegisterPatient() {
  return useMutation<PatientData, Error, Omit<PatientData, 'id'>>({
    mutationFn: async (patientData) => {
      const response = await apiService.post<PatientData>(PATIENT_ENDPOINTS.REGISTER, patientData);
      return response.data as PatientData;
    },
    onSuccess: () => {
      toast({
        title: "Patient Registered",
        description: "Patient has been successfully registered.",
      });
    },
    onError: (error) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to register patient",
        variant: "destructive",
      });
    },
  });
}

/**
 * Hook for updating patient information
 */
export function useUpdatePatient() {
  return useMutation<PatientData, Error, PatientData>({
    mutationFn: async (patientData) => {
      const response = await apiService.put<PatientData>(PATIENT_ENDPOINTS.UPDATE, patientData);
      return response.data as PatientData;
    },
    onSuccess: () => {
      toast({
        title: "Patient Updated",
        description: "Patient information has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update patient information",
        variant: "destructive",
      });
    },
  });
}

/**
 * Hook for fetching patient data
 */
export function usePatientData(
  patientId?: string,
  options?: UseQueryOptions<PatientData, Error, PatientData, QueryKey>
) {
  return useQuery<PatientData, Error>({
    queryKey: ['patient', patientId],
    queryFn: async () => {
      if (!patientId) throw new Error('Patient ID is required');
      const response = await apiService.get<PatientData>(`${PATIENT_ENDPOINTS.GET_BY_ID}/${patientId}`);
      return response.data as PatientData;
    },
    enabled: !!patientId,
    ...options,
  });
}

/**
 * Hook for fetching patient list (for admin/doctor/secretary)
 */
export function usePatientList(options?: Omit<UseQueryOptions<PatientData[], Error, PatientData[], QueryKey>, 'queryKey' | 'queryFn'>) {
  return useQuery<PatientData[], Error>({
    queryKey: ['patients'],
    queryFn: async () => {
      const response = await apiService.get<PatientData[]>(PATIENT_ENDPOINTS.LIST);
      return response.data as PatientData[];
    },
    ...options,
  });
}

/**
 * Hook for updating patient medical history
 */
export function useUpdateMedicalHistory() {
  return useMutation<MedicalHistoryItem[], Error, { patientId: string, medicalHistory: MedicalHistoryItem[] }>({
    mutationFn: async ({ patientId, medicalHistory }) => {
      const response = await apiService.put<MedicalHistoryItem[]>(`${PATIENT_ENDPOINTS.MEDICAL_HISTORY}/${patientId}`, { medicalHistory });
      return response.data as MedicalHistoryItem[];
    },
    onSuccess: () => {
      toast({
        title: "Medical History Updated",
        description: "Patient medical history has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update medical history",
        variant: "destructive",
      });
    },
  });
}

/**
 * Hook for updating pregnancy data
 */
export function useUpdatePregnancyData() {
  return useMutation<PregnancyData, Error, { patientId: string, pregnancyData: PregnancyData }>({
    mutationFn: async ({ patientId, pregnancyData }) => {
      const response = await apiService.put<PregnancyData>(`${PATIENT_ENDPOINTS.PREGNANCIES}/${patientId}`, { pregnancyData });
      return response.data as PregnancyData;
    },
    onSuccess: () => {
      toast({
        title: "Pregnancy Data Updated",
        description: "Pregnancy information has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update pregnancy data",
        variant: "destructive",
      });
    },
  });
}
