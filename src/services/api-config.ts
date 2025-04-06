
/**
 * API configuration for connecting to PHP backend
 */

// Base URL for PHP backend (modify this to match your local PHP server)
export const API_BASE_URL = 'http://localhost/api';

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
