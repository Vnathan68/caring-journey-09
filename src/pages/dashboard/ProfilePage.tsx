
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import PageTransition from '@/components/ui-custom/page-transition';
import { User, Mail, Phone, MapPin, Calendar, FileText, MessageSquare } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground">Manage your personal information</p>
          </div>
          <Button className="bg-clinic-600 hover:bg-clinic-700 text-white">
            Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Personal Information</CardTitle>
              <CardDescription>Your basic personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{user?.name || 'Jane Doe'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user?.email || 'jane.doe@example.com'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">(555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium">January 15, 1985</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Medical Information</CardTitle>
              <CardDescription>Your health record summary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Blood Type</p>
                  <p className="font-medium">A+</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Allergies</p>
                  <p className="font-medium">Penicillin, Peanuts</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Current Medications</p>
                  <p className="font-medium">Prenatal vitamins</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Last Checkup</p>
                  <p className="font-medium">May 15, 2023</p>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Medical History</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">Appendectomy - 2010</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">Pregnancy - 2018</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Address Information</CardTitle>
              <CardDescription>Your current contact address</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
                <div>
                  <p className="font-medium">123 Main Street, Apt 4B</p>
                  <p className="text-muted-foreground">San Francisco, CA 94105</p>
                  <p className="text-muted-foreground">United States</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Recent Messages</CardTitle>
              <CardDescription>Latest communications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-start gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground mt-1" />
                    <div>
                      <p className="text-sm font-medium">Dr. Maria Santos</p>
                      <p className="text-xs text-muted-foreground">Your test results look good...</p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-start gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground mt-1" />
                    <div>
                      <p className="text-sm font-medium">Front Desk</p>
                      <p className="text-xs text-muted-foreground">Your insurance has been verified...</p>
                      <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Link to="/dashboard/messages">
                <Button variant="outline" size="sm" className="w-full mt-2">
                  View All Messages
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProfilePage;
