
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// Base API URL should be configured correctly - adjust this to match your XAMPP setup
const API_BASE_URL = 'http://localhost/santa-matilda-api'; // No trailing slash

interface ApiResponse<T> {
  status: string;
  data?: T;
  message?: string;
  version?: string;
  timestamp?: string;
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
    // Remove leading slash from endpoint if it exists
    const normalizedEndpoint = endpoint.startsWith('/')
      ? endpoint.slice(1)
      : endpoint;

    return `${API_BASE_URL}/${normalizedEndpoint}`;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const url = this.normalizeUrl(endpoint);
      console.log(`Fetching from URL: ${url}`);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      // Check if the response is valid JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Non-JSON response:", await response.text());
        throw new Error(`API returned non-JSON response. Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API GET request failed:', error);
      throw error;
    }
  }

  async post<T, D = any>(endpoint: string, data: D): Promise<ApiResponse<T>> {
    try {
      const url = this.normalizeUrl(endpoint);
      console.log(`Posting to URL: ${url}`);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      // Check if the response is valid JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const responseText = await response.text();
        console.error("Non-JSON response:", responseText);
        throw new Error(`API returned non-JSON response. Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API POST request failed:', error);
      throw error;
    }
  }

  async put<T, D = any>(endpoint: string, data: D): Promise<ApiResponse<T>> {
    try {
      const url = this.normalizeUrl(endpoint);
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      // Check if the response is valid JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Non-JSON response:", await response.text());
        throw new Error(`API returned non-JSON response. Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API PUT request failed:', error);
      throw error;
    }
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const url = this.normalizeUrl(endpoint);
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      // Check if the response is valid JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Non-JSON response:", await response.text());
        throw new Error(`API returned non-JSON response. Status: ${response.status}`);
      }

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
// Also export type for use in other files
export type { ApiResponse };
