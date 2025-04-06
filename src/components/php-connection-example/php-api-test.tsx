
import React, { useState } from 'react';
import { usePhpFetch, usePhpPost } from '@/hooks/use-php-api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import LoadingSpinner from '@/components/ui-custom/loading-spinner';

interface TestResponse {
  status: string;
  message: string;
}

interface TestPostData {
  name: string;
  email: string;
}

const PhpApiTest = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Example of fetching data from PHP API
  const { data: testData, isLoading, isError, error, refetch } = usePhpFetch<TestResponse>(
    'index', // Endpoint: will call API_BASE_URL/index
    ['php-test'],
    {
      // Only fetch when component mounts, don't auto-refetch
      enabled: false,
    }
  );

  // Example of posting data to PHP API
  const { mutate: submitData, isPending: isSubmitting } = usePhpPost<TestResponse, TestPostData>(
    'submit', // Endpoint: will call API_BASE_URL/submit
    {
      onSuccess: (data) => {
        toast({
          title: 'Success',
          description: data.message || 'Data submitted successfully',
        });
        setName('');
        setEmail('');
      }
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitData({ name, email });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>PHP API Connection Test</CardTitle>
        <CardDescription>
          Test your connection to the PHP backend
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center p-4">
            <LoadingSpinner />
          </div>
        ) : isError ? (
          <div className="p-4 border border-red-300 bg-red-50 rounded-md text-red-800">
            <p className="font-medium">Connection Error</p>
            <p className="text-sm">{error?.message || 'Failed to connect to PHP API'}</p>
          </div>
        ) : testData ? (
          <div className="p-4 border border-green-300 bg-green-50 rounded-md text-green-800">
            <p className="font-medium">Status: {testData.status}</p>
            <p className="text-sm">{testData.message}</p>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="name" className="text-sm font-medium block mb-1">Name</label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium block mb-1">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => refetch()} 
          disabled={isLoading}
        >
          Test Connection
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting || !name || !email}
        >
          {isSubmitting ? <LoadingSpinner size="sm" className="mr-2" /> : null}
          Submit Test Data
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PhpApiTest;
