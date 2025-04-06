
import { API_BASE_URL, getRequestOptions } from './api-config';

/**
 * Generic API service to communicate with PHP backend
 */
export const apiService = {
  /**
   * Performs a GET request to the PHP backend
   * @param endpoint - API endpoint path
   * @returns Promise with response data
   */
  get: async <T>(endpoint: string): Promise<T> => {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, getRequestOptions('GET'));
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API GET request failed:', error);
      throw error;
    }
  },

  /**
   * Performs a POST request to the PHP backend
   * @param endpoint - API endpoint path
   * @param data - Data to send in request body
   * @returns Promise with response data
   */
  post: async <T>(endpoint: string, data: any): Promise<T> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/${endpoint}`,
        getRequestOptions('POST', data)
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API POST request failed:', error);
      throw error;
    }
  },

  /**
   * Performs a PUT request to the PHP backend
   * @param endpoint - API endpoint path
   * @param data - Data to send in request body
   * @returns Promise with response data
   */
  put: async <T>(endpoint: string, data: any): Promise<T> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/${endpoint}`,
        getRequestOptions('PUT', data)
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API PUT request failed:', error);
      throw error;
    }
  },

  /**
   * Performs a DELETE request to the PHP backend
   * @param endpoint - API endpoint path
   * @returns Promise with response data
   */
  delete: async <T>(endpoint: string): Promise<T> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/${endpoint}`,
        getRequestOptions('DELETE')
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API DELETE request failed:', error);
      throw error;
    }
  },
};
