
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions, QueryKey } from '@tanstack/react-query';
import apiService from '@/services/api-service';
import { toast } from '@/hooks/use-toast';

/**
 * Hook for fetching data from the PHP backend
 */
export function usePhpFetch<T>(
  endpoint: string,
  queryKey: string[],
  options?: Omit<UseQueryOptions<T, Error, T, QueryKey>, 'queryKey' | 'queryFn'>
) {
  return useQuery<T, Error>({
    queryKey,
    queryFn: async () => {
      const response = await apiService.get<T>(endpoint);
      // Return the data property directly as T
      return response.data as T;
    },
    ...options,
  });
}

/**
 * Hook for posting data to the PHP backend
 */
export function usePhpPost<T, TData = any>(
  endpoint: string,
  options?: UseMutationOptions<T, Error, TData>
) {
  return useMutation<T, Error, TData>({
    mutationFn: async (data: TData) => {
      const response = await apiService.post<T>(endpoint, data);
      return response.data as T;
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to process request",
        variant: "destructive",
      });
    },
    ...options,
  });
}

/**
 * Hook for updating data in the PHP backend
 */
export function usePhpUpdate<T, TData = any>(
  endpoint: string,
  options?: UseMutationOptions<T, Error, TData>
) {
  return useMutation<T, Error, TData>({
    mutationFn: async (data: TData) => {
      const response = await apiService.put<T>(endpoint, data);
      return response.data as T;
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update data",
        variant: "destructive",
      });
    },
    ...options,
  });
}

/**
 * Hook for deleting data from the PHP backend
 */
export function usePhpDelete<T>(
  endpoint: string,
  options?: UseMutationOptions<T, Error, string>
) {
  return useMutation<T, Error, string>({
    mutationFn: async (id: string) => {
      const response = await apiService.delete<T>(`${endpoint}/${id}`);
      return response.data as T;
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete item",
        variant: "destructive",
      });
    },
    ...options,
  });
}
