
/**
 * API configuration for connecting to PHP backend
 */

// Base URL for PHP backend (modify this to match your local PHP server)
export const API_BASE_URL = 'http://localhost/santa-matilda-api';

// Default headers for API requests
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

/**
 * Configures request options with appropriate headers
 */
export const getRequestOptions = (method: string, data?: any) => {
  const options: RequestInit = {
    method,
    headers: DEFAULT_HEADERS,
    credentials: 'include', // Includes cookies in requests
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  return options;
};

// Endpoints for patient management
export const PATIENT_ENDPOINTS = {
  REGISTER: '/patients/register',
  UPDATE: '/patients/update',
  GET_BY_ID: '/patients/get',
  LIST: '/patients/list',
  MEDICAL_HISTORY: '/patients/medical-history',
  APPOINTMENTS: '/patients/appointments',
  PREGNANCIES: '/patients/pregnancies',
  DOCUMENTS: '/patients/documents',
};

// Endpoints for doctor management
export const DOCTOR_ENDPOINTS = {
  REGISTER: '/doctors/register',
  UPDATE: '/doctors/update',
  GET_BY_ID: '/doctors/get',
  LIST: '/doctors/list',
  SCHEDULE: '/doctors/schedule',
  PATIENTS: '/doctors/patients',
  AVAILABILITY: '/doctors/availability',
};
