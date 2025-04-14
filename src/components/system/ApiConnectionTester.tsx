
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import apiService from '@/services/api-service';
import { toast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/ui-custom/loading-spinner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ConnectionResponse {
  status: string;
  message: string;
  version?: string;
  timestamp?: string;
}

interface TestUserData {
  email: string;
  password: string;
  name: string;
}

const ApiConnectionTester = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [response, setResponse] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState('general');
  
  // Form data for user registration test
  const [testUser, setTestUser] = useState<TestUserData>({
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User'
  });

  // Test general API connection
  const testConnection = async () => {
    setIsLoading(true);
    try {
      const result = await apiService.get<ConnectionResponse>('index');
      setResponse(result);
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

  // Test database connection
  const testDatabase = async () => {
    setIsLoading(true);
    try {
      const result = await apiService.get<any>('config/database');
      setResponse(result);
      setConnectionStatus('success');
      toast({
        title: 'Database Connection Successful',
        description: 'Successfully connected to the MySQL database.',
      });
    } catch (error) {
      console.error('Database connection failed:', error);
      setConnectionStatus('error');
      toast({
        title: 'Database Connection Failed',
        description: 'Could not connect to the database. Please check your configuration.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Test registration endpoint
  const testRegistration = async () => {
    setIsLoading(true);
    try {
      const result = await apiService.post('auth/register', testUser);
      setResponse(result);
      setConnectionStatus('success');
      toast({
        title: 'Registration Test Successful',
        description: 'The registration endpoint is working correctly.',
      });
    } catch (error) {
      console.error('Registration test failed:', error);
      setConnectionStatus('error');
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setResponse({ status: 'error', message: errorMessage });
      toast({
        title: 'Registration Test Failed',
        description: `Error: ${errorMessage}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Test login endpoint
  const testLogin = async () => {
    setIsLoading(true);
    try {
      const result = await apiService.post('auth/login', {
        email: testUser.email,
        password: testUser.password
      });
      setResponse(result);
      setConnectionStatus('success');
      toast({
        title: 'Login Test Successful',
        description: 'The login endpoint is working correctly.',
      });
    } catch (error) {
      console.error('Login test failed:', error);
      setConnectionStatus('error');
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setResponse({ status: 'error', message: errorMessage });
      toast({
        title: 'Login Test Failed',
        description: `Error: ${errorMessage}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTestUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderResponseCard = () => {
    if (connectionStatus === 'idle') {
      return (
        <p className="text-center text-muted-foreground py-4">Select a test to run from the options above.</p>
      );
    }

    if (connectionStatus === 'error') {
      return (
        <div className="p-4 border border-red-300 bg-red-50 rounded-md text-red-800">
          <p className="font-medium">Error</p>
          <p className="text-sm">{response?.message || 'Unknown error'}</p>
          <p className="text-xs mt-2">Check PHP error logs for more details.</p>
        </div>
      );
    }

    // Success response
    return (
      <div className="p-4 border border-green-300 bg-green-50 rounded-md text-green-800">
        <p className="font-medium">Status: {response?.status}</p>
        <p className="text-sm">{response?.message}</p>
        {response?.data && (
          <div className="mt-2">
            <p className="font-medium">Response Data:</p>
            <pre className="text-xs mt-1 bg-green-100 p-2 rounded overflow-x-auto">
              {JSON.stringify(response.data, null, 2)}
            </pre>
          </div>
        )}
        {response?.version && <p className="text-xs mt-2">API Version: {response.version}</p>}
        {response?.timestamp && <p className="text-xs">Timestamp: {response.timestamp}</p>}
      </div>
    );
  };

  const renderAuthTestForm = () => (
    <div className="space-y-4 mb-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input 
          id="name"
          name="name"
          value={testUser.name}
          onChange={handleInputChange}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email"
          name="email"
          type="email"
          value={testUser.email}
          onChange={handleInputChange}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input 
          id="password"
          name="password"
          type="password"
          value={testUser.password}
          onChange={handleInputChange}
          className="mt-1"
        />
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>PHP API Connection Tester</CardTitle>
        <CardDescription>
          Test various aspects of your PHP backend connection
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <div className="py-2">
              <p className="text-sm text-muted-foreground">
                Test the basic API connection to verify the PHP server is running.
              </p>
            </div>
            <Button 
              onClick={testConnection} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
              Test API Connection
            </Button>
          </TabsContent>
          
          <TabsContent value="database" className="space-y-4">
            <div className="py-2">
              <p className="text-sm text-muted-foreground">
                Test the database connection to ensure MySQL is properly configured.
              </p>
            </div>
            <Button 
              onClick={testDatabase} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
              Test Database Connection
            </Button>
          </TabsContent>
          
          <TabsContent value="register" className="space-y-4">
            <div className="py-2">
              <p className="text-sm text-muted-foreground">
                Test the user registration endpoint.
              </p>
            </div>
            {renderAuthTestForm()}
            <Button 
              onClick={testRegistration} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
              Test Registration Endpoint
            </Button>
          </TabsContent>
          
          <TabsContent value="login" className="space-y-4">
            <div className="py-2">
              <p className="text-sm text-muted-foreground">
                Test the login endpoint with the credentials below.
              </p>
            </div>
            <div className="space-y-4 mb-4">
              <div>
                <Label htmlFor="loginEmail">Email</Label>
                <Input 
                  id="loginEmail"
                  name="email"
                  type="email"
                  value={testUser.email}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="loginPassword">Password</Label>
                <Input 
                  id="loginPassword"
                  name="password"
                  type="password"
                  value={testUser.password}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
            </div>
            <Button 
              onClick={testLogin} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
              Test Login Endpoint
            </Button>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6">
          {renderResponseCard()}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <p className="text-xs text-muted-foreground mt-2">
          API Base URL: {import.meta.env.DEV ? 'http://localhost/santa-matilda-api' : 'your production URL'}
        </p>
      </CardFooter>
    </Card>
  );
};

export default ApiConnectionTester;
