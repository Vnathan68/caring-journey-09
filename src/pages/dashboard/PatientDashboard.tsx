
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, CreditCard, FileText, Heart, MessageSquare, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { toast } from '@/hooks/use-toast';
import PageTransition from '@/components/ui-custom/page-transition';
import LoadingSpinner from '@/components/ui-custom/loading-spinner';
import AppointmentList from '@/components/dashboard/AppointmentList';
import HealthSummary from '@/components/dashboard/HealthSummary';
import MessageCenter from '@/components/dashboard/MessageCenter';
import BillingOverview from '@/components/dashboard/BillingOverview';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
            <p className="text-muted-foreground">Here's an overview of your health information</p>
          </div>
          <Button className="bg-clinic-600 hover:bg-clinic-700 text-white flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Book Appointment
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden md:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden md:inline">Appointments</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden md:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span className="hidden md:inline">Billing</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Next Appointment</CardTitle>
                  <CardDescription>Your upcoming schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="bg-clinic-50 p-3 rounded-full">
                      <Calendar className="h-6 w-6 text-clinic-600" />
                    </div>
                    <div>
                      <p className="font-medium">Prenatal Checkup</p>
                      <p className="text-sm text-muted-foreground">May 28, 2023 • 10:00 AM</p>
                      <p className="text-sm text-muted-foreground">Dr. Maria Santos</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Reschedule
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive border-destructive/20 hover:bg-destructive/10">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Pregnancy Progress</CardTitle>
                  <CardDescription>Current status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="bg-clinic-50 p-3 rounded-full">
                      <Heart className="h-6 w-6 text-clinic-600" />
                    </div>
                    <div>
                      <p className="font-medium">Week 22</p>
                      <p className="text-sm text-muted-foreground">Due date: September 15, 2023</p>
                      <p className="text-sm text-muted-foreground">Second Trimester</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      View Pregnancy Details
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Recent Files</CardTitle>
                  <CardDescription>Your latest medical documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Blood Test Results</p>
                        <p className="text-xs text-muted-foreground">May 15, 2023</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Ultrasound Scan</p>
                        <p className="text-xs text-muted-foreground">May 10, 2023</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Prescription</p>
                        <p className="text-xs text-muted-foreground">May 2, 2023</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Documents
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <HealthSummary />
          </TabsContent>

          <TabsContent value="appointments">
            <AppointmentList />
          </TabsContent>

          <TabsContent value="messages">
            <MessageCenter />
          </TabsContent>

          <TabsContent value="billing">
            <BillingOverview />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default PatientDashboard;
