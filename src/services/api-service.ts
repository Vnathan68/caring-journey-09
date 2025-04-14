
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// Base API URL should be configured correctly
const API_BASE_URL = 'http://localhost/santa-matilda-api'; // No trailing slash

interface ApiResponse<T> {
  status: string;
  data?: T;
  message?: string;
}

class ApiService {
  private static instance: ApiService;

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  /**
   * Normalize the URL by ensuring we don't have double slashes
   */
  private normalizeUrl(endpoint: string): string {
    // Ensure the endpoint starts with a single slash
    const normalizedEndpoint = endpoint.startsWith('/')
      ? endpoint
      : `/${endpoint}`;

    return `${API_BASE_URL}${normalizedEndpoint}`;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(this.normalizeUrl(endpoint), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      return await response.json();
    } catch (error) {
      console.error('API GET request failed:', error);
      throw error;
    }
  }

  async post<T, D = any>(endpoint: string, data: D): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(this.normalizeUrl(endpoint), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      return await response.json();
    } catch (error) {
      console.error('API POST request failed:', error);
      throw error;
    }
  }

  async put<T, D = any>(endpoint: string, data: D): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(this.normalizeUrl(endpoint), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      return await response.json();
    } catch (error) {
      console.error('API PUT request failed:', error);
      throw error;
    }
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(this.normalizeUrl(endpoint), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      return await response.json();
    } catch (error) {
      console.error('API DELETE request failed:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const apiService = ApiService.getInstance();
export default apiService;
