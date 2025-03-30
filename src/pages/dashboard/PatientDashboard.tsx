import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, Clock, CreditCard, FileText, Heart, MessageSquare, 
  User, AlertCircle, Bell, Check, X, ChevronRight, 
  CalendarPlus, Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/auth-context';
import { toast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import PageTransition from '@/components/ui-custom/page-transition';
import LoadingSpinner from '@/components/ui-custom/loading-spinner';
import AppointmentList from '@/components/dashboard/AppointmentList';
import HealthSummary from '@/components/dashboard/HealthSummary';
import MessageCenter from '@/components/dashboard/MessageCenter';
import BillingOverview from '@/components/dashboard/BillingOverview';
import AppointmentBooking from '@/components/dashboard/appointments/AppointmentBooking';
import MedicalRecords from '@/components/dashboard/records/MedicalRecords';
import AnnouncementFeed from '@/components/dashboard/AnnouncementFeed';
import PregnancyTracker from '@/components/dashboard/pregnancy/PregnancyTracker';

type AnnouncementPriority = 'high' | 'normal' | 'low';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  
  const isPregnant = true;
  const gestationalAge = 22;
  const dueDate = new Date('2023-09-15');
  
  const upcomingAppointments = [
    {
      id: 'apt-1',
      type: 'Prenatal Checkup',
      provider: 'Dr. Maria Santos',
      date: new Date('2023-05-28T10:00:00'),
      status: 'confirmed'
    },
    {
      id: 'apt-2',
      type: 'Ultrasound',
      provider: 'Dr. James Wilson',
      date: new Date('2023-06-15T14:30:00'),
      status: 'confirmed'
    }
  ];
  
  const recentTests = [
    {
      id: 'test-1',
      name: 'Blood Test',
      date: new Date('2023-05-15'),
      status: 'completed',
      hasAbnormalities: false
    },
    {
      id: 'test-2',
      name: 'Glucose Tolerance',
      date: new Date('2023-05-20'),
      status: 'pending',
      hasAbnormalities: null
    }
  ];
  
  const pendingPayments = [
    {
      id: 'inv-1',
      description: 'Office Visit',
      amount: 75.00,
      dueDate: new Date('2023-06-01'),
      isOverdue: false
    },
    {
      id: 'inv-2',
      description: 'Lab Services',
      amount: 120.00,
      dueDate: new Date('2023-05-15'),
      isOverdue: true
    }
  ];
  
  const announcements = [
    {
      id: 'ann-1',
      title: 'Holiday Hours',
      content: 'The clinic will be closed on May 29th for Memorial Day.',
      date: new Date('2023-05-20'),
      priority: 'normal' as AnnouncementPriority,
      isRead: false
    },
    {
      id: 'ann-2',
      title: 'New Prenatal Classes',
      content: 'We are now offering virtual prenatal yoga classes. Register today!',
      date: new Date('2023-05-18'),
      priority: 'low' as AnnouncementPriority,
      isRead: true
    }
  ];

  if (!user) {
    return <LoadingSpinner />;
  }
  
  const handleBookAppointment = () => {
    setShowAppointmentModal(true);
  };
  
  const handleRescheduleAppointment = (id: string) => {
    toast({
      title: "Reschedule requested",
      description: "You can now select a new date and time for your appointment.",
    });
    setShowAppointmentModal(true);
  };
  
  const handleCancelAppointment = (id: string) => {
    toast({
      title: "Appointment cancelled",
      description: "Your appointment has been cancelled successfully.",
    });
  };
  
  const handleViewTest = (id: string) => {
    toast({
      title: "Viewing test results",
      description: "Redirecting to your test results...",
    });
    setActiveTab('records');
  };
  
  const handlePayInvoice = (id: string) => {
    toast({
      title: "Processing payment",
      description: "Redirecting to payment gateway...",
    });
    setActiveTab('billing');
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
            <p className="text-muted-foreground">Here's an overview of your health information</p>
          </div>
          <Button 
            className="bg-clinic-600 hover:bg-clinic-700 text-white flex items-center gap-2"
            onClick={handleBookAppointment}
          >
            <CalendarPlus className="w-4 h-4" />
            Book Appointment
          </Button>
        </div>

        {/* Announcement Banner (if there are unread important announcements) */}
        {announcements.some(a => !a.isRead && a.priority === 'high' as AnnouncementPriority) && (
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-amber-500" />
                <div className="flex-1">
                  <p className="font-medium">Important Clinic Updates</p>
                  <p className="text-sm text-muted-foreground">You have unread important announcements</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setActiveTab('announcements')}>
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-2">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden md:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden md:inline">Appointments</span>
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden md:inline">Records</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden md:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span className="hidden md:inline">Billing</span>
            </TabsTrigger>
            <TabsTrigger value="announcements" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden md:inline">Announcements</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden md:inline">Profile</span>
            </TabsTrigger>
            {isPregnant && (
              <TabsTrigger value="pregnancy" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span className="hidden md:inline">Pregnancy</span>
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-medium">Next Appointment</CardTitle>
                      <CardDescription>Your upcoming schedule</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={() => setActiveTab('appointments')}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {upcomingAppointments.length > 0 ? (
                    <div className="flex items-center gap-4">
                      <div className="bg-clinic-50 p-3 rounded-full">
                        <Calendar className="h-6 w-6 text-clinic-600" />
                      </div>
                      <div>
                        <p className="font-medium">{upcomingAppointments[0].type}</p>
                        <p className="text-sm text-muted-foreground">
                          {upcomingAppointments[0].date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • {
                            upcomingAppointments[0].date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
                          }
                        </p>
                        <p className="text-sm text-muted-foreground">{upcomingAppointments[0].provider}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center py-6">
                      <div className="text-center">
                        <p className="text-muted-foreground">No upcoming appointments</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2" 
                          onClick={handleBookAppointment}
                        >
                          <Plus className="h-3 w-3 mr-1" /> Book Now
                        </Button>
                      </div>
                    </div>
                  )}
                  {upcomingAppointments.length > 0 && (
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => handleRescheduleAppointment(upcomingAppointments[0].id)}>
                        <Clock className="h-3 w-3" /> Reschedule
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-destructive border-destructive/20 hover:bg-destructive/10"
                        onClick={() => handleCancelAppointment(upcomingAppointments[0].id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {isPregnant ? (
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg font-medium">Pregnancy Progress</CardTitle>
                        <CardDescription>Week {gestationalAge} of 40</CardDescription>
                      </div>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={() => setActiveTab('pregnancy')}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <Progress value={(gestationalAge / 40) * 100} className="h-2" />
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>1st Trimester</span>
                        <span>2nd Trimester</span>
                        <span>3rd Trimester</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-clinic-50 p-3 rounded-full">
                        <Heart className="h-6 w-6 text-clinic-600" />
                      </div>
                      <div>
                        <p className="font-medium">Week {gestationalAge}</p>
                        <p className="text-sm text-muted-foreground">
                          Due date: {dueDate.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
                        </p>
                        <p className="text-sm text-muted-foreground">Second Trimester</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab('pregnancy')}>
                        View Pregnancy Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Health Summary</CardTitle>
                    <CardDescription>Recent metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Blood Pressure</span>
                          <span className="text-sm font-medium">120/80</span>
                        </div>
                        <Progress value={70} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Weight</span>
                          <span className="text-sm font-medium">65 kg</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Heart Rate</span>
                          <span className="text-sm font-medium">72 bpm</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab('records')}>
                        View Full Health Records
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-medium">Recent Test Results</CardTitle>
                      <CardDescription>Your latest medical tests</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={() => setActiveTab('records')}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentTests.map(test => (
                      <div key={test.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{test.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {test.date.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {test.status === 'completed' ? (
                            <Badge variant={test.hasAbnormalities ? "destructive" : "secondary"} className="ml-2">
                              {test.hasAbnormalities ? "Review" : "Normal"}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="ml-2">Pending</Badge>
                          )}
                          {test.status === 'completed' && (
                            <Button variant="ghost" size="icon" className="ml-1 text-muted-foreground" onClick={() => handleViewTest(test.id)}>
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab('records')}>
                      View All Test Results
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-medium">Payment Overview</CardTitle>
                    <CardDescription>Recent and pending invoices</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={() => setActiveTab('billing')}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingPayments.map(payment => (
                    <div key={payment.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{payment.description}</p>
                          <p className="text-xs text-muted-foreground">
                            Due: {payment.dueDate.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">${payment.amount.toFixed(2)}</span>
                        <Badge variant={payment.isOverdue ? "destructive" : "outline"} className="mr-2">
                          {payment.isOverdue ? "Overdue" : "Pending"}
                        </Badge>
                        <Button size="sm" onClick={() => handlePayInvoice(payment.id)}>Pay</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab('billing')}>
                    View All Invoices
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-medium">Clinic Announcements</CardTitle>
                    <CardDescription>Latest updates from the clinic</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={() => setActiveTab('announcements')}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.slice(0, 2).map(announcement => (
                    <div key={announcement.id} className={`p-3 rounded-md ${announcement.isRead ? 'bg-slate-50' : 'bg-clinic-50'}`}>
                      <div className="flex justify-between">
                        <h4 className="font-medium">{announcement.title}</h4>
                        <span className="text-xs text-muted-foreground">
                          {announcement.date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{announcement.content}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab('announcements')}>
                    View All Announcements
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments">
            <AppointmentBooking 
              isOpen={showAppointmentModal} 
              onClose={() => setShowAppointmentModal(false)} 
            />
            <AppointmentList />
          </TabsContent>

          <TabsContent value="records">
            <MedicalRecords />
          </TabsContent>

          <TabsContent value="messages">
            <MessageCenter />
          </TabsContent>

          <TabsContent value="billing">
            <BillingOverview />
          </TabsContent>
          
          <TabsContent value="announcements">
            <AnnouncementFeed announcements={announcements} />
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-6">Your Profile is currently being viewed in the Profile page</h3>
                <Button onClick={() => window.location.href = '/dashboard/profile'}>Go to Profile Page</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {isPregnant && (
            <TabsContent value="pregnancy">
              <PregnancyTracker 
                gestationalAge={gestationalAge} 
                dueDate={dueDate} 
              />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default PatientDashboard;
