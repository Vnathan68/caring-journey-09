
/**
 * API configuration for connecting to PHP backend
 */

// Base URL for PHP backend (ensure this matches your XAMPP setup)
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

// Endpoints for secretary/nurse management
export const SECRETARY_NURSE_ENDPOINTS = {
  REGISTER: '/secretary-nurses/register',
  UPDATE: '/secretary-nurses/update',
  GET_BY_ID: '/secretary-nurses/get',
  LIST: '/secretary-nurses/list',
  SCHEDULE: '/secretary-nurses/schedule',
};

// Endpoints for admin management
export const ADMIN_ENDPOINTS = {
  REGISTER: '/admins/register',
  UPDATE: '/admins/update',
  GET_BY_ID: '/admins/get',
  LIST: '/admins/list',
  SYSTEM_LOGS: '/admins/logs',
  DASHBOARD_STATS: '/admins/stats',
};

// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  VERIFY_2FA: '/auth/verify-2fa',
  RESET_PASSWORD: '/auth/reset-password',
  CHANGE_PASSWORD: '/auth/change-password',
  ENABLE_2FA: '/auth/enable-2fa',
  DISABLE_2FA: '/auth/disable-2fa',
  LOGOUT: '/auth/logout',
};
