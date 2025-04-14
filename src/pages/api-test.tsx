
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ApiConnectionTester from '@/components/system/ApiConnectionTester';
import PageTransition from '@/components/ui-custom/page-transition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import MainLayout from '@/components/layout/main-layout';
import PhpConnectionTest from '@/components/system/PhpConnectionTest';

const ApiTestPage = () => {
  return (
    <>
      <Helmet>
        <title>API Test | Santa Matilda Clinic</title>
      </Helmet>
      
      <MainLayout>
        <PageTransition>
          <div className="container mx-auto py-10 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">API Connection Test</h1>
                <p className="text-muted-foreground mt-2">
                  This page helps you check if your PHP backend is properly configured and running.
                </p>
              </div>
              
              <Separator />
              
              <Card>
                <CardHeader>
                  <CardTitle>PHP Backend Configuration</CardTitle>
                  <CardDescription>
                    Before using this system, please ensure that your PHP backend is properly set up:
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Requirements:</h3>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>PHP 7.4 or higher</li>
                      <li>MySQL/MariaDB database</li>
                      <li>PDO PHP extension</li>
                      <li>Apache or Nginx web server</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Installation Steps:</h3>
                    <ol className="list-decimal list-inside text-sm space-y-1">
                      <li>Copy the <code>santa-matilda-api</code> folder to your web server's document root</li>
                      <li>Create a MySQL database called <code>santa_matilda</code></li>
                      <li>Update database connection settings in <code>config/database.php</code> if needed</li>
                      <li>Access the API at <code>http://localhost/santa-matilda-api/</code></li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Basic Connection Test</h2>
                  <PhpConnectionTest />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4">Advanced Testing Options</h2>
                  <Card>
                    <CardHeader>
                      <CardTitle>Looking for more?</CardTitle>
                      <CardDescription>Try the comprehensive API tester below.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        The advanced API tester provides more detailed diagnostics and allows 
                        testing of specific endpoints like login and registration.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <ApiConnectionTester />
            </div>
          </div>
        </PageTransition>
      </MainLayout>
    </>
  );
};

export default ApiTestPage;
