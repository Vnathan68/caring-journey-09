
import React from 'react';
import PageTransition from '@/components/ui-custom/page-transition';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/auth-context';
import { CalendarCheck, Clock, Users, CreditCard, Bell } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/overview/DashboardHeader';
import AppointmentList from '@/components/dashboard/AppointmentList';
import { Button } from '@/components/ui/button';
import { createPortal } from 'react-dom';
import SecretaryAppointmentView from '@/components/dashboard/secretary/SecretaryAppointmentView';
import SecretaryPatientList from '@/components/dashboard/secretary/SecretaryPatientList';
import SecretaryQuickStats from '@/components/dashboard/secretary/SecretaryQuickStats';
import SecretaryTodaySchedule from '@/components/dashboard/secretary/SecretaryTodaySchedule';

const SecretaryDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = React.useState('overview');

  return (
    <PageTransition>
      <Helmet>
        <title>Secretary Dashboard | Santa Matilda</title>
        <meta 
          name="description" 
          content="Secretary dashboard for Santa Matilda Women's Health Clinic"
        />
      </Helmet>

      <DashboardHeader
        title={`Welcome back, ${user?.name?.split(' ')[0] || 'Secretary'}`}
        description="Manage patients, appointments, and clinic operations"
      />

      <Tabs 
        defaultValue="overview" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full mt-6"
      >
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-5 gap-2 mb-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="appointments" className="flex items-center gap-2">
            <CalendarCheck className="h-4 w-4" />
            <span className="hidden md:inline">Appointments</span>
          </TabsTrigger>
          <TabsTrigger value="patients" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden md:inline">Patients</span>
          </TabsTrigger>
          <TabsTrigger value="today" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden md:inline">Today</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden md:inline">Payments</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <SecretaryQuickStats />
          <SecretaryTodaySchedule />
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <SecretaryAppointmentView />
        </TabsContent>

        <TabsContent value="patients" className="space-y-4">
          <SecretaryPatientList />
        </TabsContent>

        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <SecretaryTodaySchedule />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Manage patient invoices, payments, and financial records.
              </p>
              {/* Payment management interface will be implemented in a later phase */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageTransition>
  );
};

export default SecretaryDashboard;
