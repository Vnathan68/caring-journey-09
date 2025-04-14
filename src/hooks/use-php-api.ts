
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
  return useQuery<T, Error, T, QueryKey>({
    queryKey,
    queryFn: async () => apiService.get<T>(endpoint),
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
    mutationFn: (data: TData) => apiService.post<T>(endpoint, data),
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
    mutationFn: (data: TData) => apiService.put<T>(endpoint, data),
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
    mutationFn: (id: string) => apiService.delete<T>(`${endpoint}/${id}`),
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
