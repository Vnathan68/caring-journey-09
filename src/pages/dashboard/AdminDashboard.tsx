
import React, { useState } from 'react';
import PageTransition from '@/components/ui-custom/page-transition';
import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, Calendar, Users, CreditCard, FileText, Bell, Stethoscope } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import AdminQuickStats from '@/components/dashboard/admin/AdminQuickStats';
import AdminAppointmentOverview from '@/components/dashboard/admin/AdminAppointmentOverview';
import AdminUserManagement from '@/components/dashboard/admin/AdminUserManagement';
import AdminAnnouncementManager from '@/components/dashboard/admin/AdminAnnouncementManager';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  if (!user) return null;

  return (
    <PageTransition>
      <Helmet>
        <title>Admin Dashboard | Santa Matilda</title>
        <meta name="description" content="Admin dashboard for managing the Santa Matilda Clinic operations" />
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage clinic operations, patients, staff, and more</p>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 md:grid-cols-5 lg:w-auto">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span className="hidden md:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden md:inline">Appointments</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden md:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="announcements" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden md:inline">Announcements</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Reports</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <AdminQuickStats />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-clinic-600" />
                    Upcoming Appointments
                  </CardTitle>
                  <CardDescription>Today's schedule and upcoming appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">You have 8 appointments scheduled for today.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-clinic-600" />
                    Recent Announcements
                  </CardTitle>
                  <CardDescription>Latest clinic announcements</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">No new announcements today.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6 mt-6">
            <AdminAppointmentOverview />
          </TabsContent>

          <TabsContent value="users" className="space-y-6 mt-6">
            <AdminUserManagement />
          </TabsContent>

          <TabsContent value="announcements" className="space-y-6 mt-6">
            <AdminAnnouncementManager />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Reports & Analytics</CardTitle>
                <CardDescription>Clinic performance insights</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Report generation will be available soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default AdminDashboard;
