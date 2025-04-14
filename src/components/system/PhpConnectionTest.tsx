
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import apiService, { ApiResponse } from '@/services/api-service';
import { useToast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/ui-custom/loading-spinner';

interface ConnectionResponse {
  status: string;
  message: string;
  version?: string;
  timestamp?: string;
}

const PhpConnectionTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [response, setResponse] = useState<ConnectionResponse | null>(null);
  const { toast } = useToast();

  const testConnection = async () => {
    setIsLoading(true);
    try {
      const result = await apiService.get<ApiResponse<ConnectionResponse>>('index');
      
      // Create a proper response object that satisfies the ConnectionResponse interface
      const connectionResponse: ConnectionResponse = {
        status: result.status,
        message: result.message || 'API is running', // Ensure message is not undefined
        version: result.data?.version,
        timestamp: result.data?.timestamp
      };
      
      setResponse(connectionResponse);
      setConnectionStatus('success');
      toast({
        title: 'Connection Successful',
        description: 'The PHP backend is running correctly.',
      });
    } catch (error) {
      console.error('Connection failed:', error);
      setConnectionStatus('error');
      toast({
        title: 'Connection Failed',
        description: 'Could not connect to the PHP backend. Please check your server.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>PHP Backend Connection Test</CardTitle>
        <CardDescription>
          Test the connection to your PHP backend at {import.meta.env.DEV ? 'http://localhost/santa-matilda-api' : 'your production URL'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {connectionStatus === 'idle' ? (
          <p className="text-center text-muted-foreground py-4">Click the button below to test your connection.</p>
        ) : connectionStatus === 'success' ? (
          <div className="p-4 border border-green-300 bg-green-50 rounded-md text-green-800">
            <p className="font-medium">Status: {response?.status}</p>
            <p className="text-sm">{response?.message}</p>
            <p className="text-xs mt-2">API Version: {response?.version}</p>
            <p className="text-xs">Timestamp: {response?.timestamp}</p>
          </div>
        ) : (
          <div className="p-4 border border-red-300 bg-red-50 rounded-md text-red-800">
            <p className="font-medium">Connection Failed</p>
            <p className="text-sm">Could not connect to PHP backend. Please check:</p>
            <ul className="list-disc list-inside text-sm mt-2">
              <li>Apache/PHP server is running</li>
              <li>Project files are in the correct location</li>
              <li>URL configuration is correct</li>
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={testConnection} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
          Test PHP Connection
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PhpConnectionTest;
