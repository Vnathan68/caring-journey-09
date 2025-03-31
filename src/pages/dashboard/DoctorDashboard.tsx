
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/ui-custom/page-transition';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatDate, formatTime } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { 
  Calendar, Clock, User, Users, CheckCircle, 
  AlertCircle, TimerOff, FileText, Heart, 
  BadgeAlert, Search, Plus, MoreVertical, Filter, 
  ChevronRight, ChevronLeft
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Sample data for the dashboard
const mockAppointments = [
  {
    id: 'apt-1',
    patientName: 'Maria Garcia',
    patientId: 'P1001',
    type: 'Prenatal Checkup',
    time: new Date(new Date().setHours(9, 0, 0)),
    status: 'waiting', // waiting, in-progress, completed, cancelled, no-show
    urgency: 'normal', // normal, urgent
    notes: 'First trimester checkup',
    avatar: 'https://randomuser.me/api/portraits/women/79.jpg'
  },
  {
    id: 'apt-2',
    patientName: 'Jennifer Williams',
    patientId: 'P1002',
    type: 'Gynecological Exam',
    time: new Date(new Date().setHours(10, 0, 0)),
    status: 'waiting',
    urgency: 'urgent',
    notes: 'Patient reported severe pain',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 'apt-3',
    patientName: 'Sarah Johnson',
    patientId: 'P1003',
    type: 'Ultrasound',
    time: new Date(new Date().setHours(11, 30, 0)),
    status: 'in-progress',
    urgency: 'normal',
    notes: '20-week anatomy scan',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
  {
    id: 'apt-4',
    patientName: 'Emily Brown',
    patientId: 'P1004',
    type: 'Postnatal Checkup',
    time: new Date(new Date().setHours(13, 0, 0)),
    status: 'waiting',
    urgency: 'normal',
    notes: '6-week postnatal checkup',
    avatar: 'https://randomuser.me/api/portraits/women/9.jpg'
  },
  {
    id: 'apt-5',
    patientName: 'Sophia Martinez',
    patientId: 'P1005',
    type: 'Fertility Consultation',
    time: new Date(new Date().setHours(14, 30, 0)),
    status: 'waiting',
    urgency: 'normal',
    notes: 'Initial consultation',
    avatar: 'https://randomuser.me/api/portraits/women/37.jpg'
  },
  {
    id: 'apt-6',
    patientName: 'Isabella Lopez',
    patientId: 'P1006',
    type: 'Gynecological Exam',
    time: new Date(new Date().setHours(15, 30, 0)),
    status: 'cancelled',
    urgency: 'normal',
    notes: 'Annual checkup',
    avatar: 'https://randomuser.me/api/portraits/women/26.jpg'
  },
  {
    id: 'apt-7',
    patientName: 'Olivia Wilson',
    patientId: 'P1007',
    type: 'Prenatal Checkup',
    time: new Date(new Date().setHours(16, 30, 0)),
    status: 'no-show',
    urgency: 'normal',
    notes: 'Second trimester checkup',
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg'
  },
  {
    id: 'apt-8',
    patientName: 'Emma Taylor',
    patientId: 'P1008',
    type: 'IUD Insertion',
    time: new Date(new Date().setHours(17, 0, 0)),
    status: 'completed',
    urgency: 'normal',
    notes: 'Copper IUD insertion',
    avatar: 'https://randomuser.me/api/portraits/women/90.jpg'
  }
];

const mockUrgentCases = [
  {
    id: 'case-1',
    patientName: 'Jennifer Williams',
    patientId: 'P1002',
    reason: 'Severe abdominal pain',
    reportedAt: new Date(new Date().setHours(8, 15, 0)),
    appointmentId: 'apt-2',
    status: 'flagged', // flagged, addressed
    reportedBy: 'Nurse Rodriguez'
  },
  {
    id: 'case-2',
    patientName: 'Ava Moore',
    patientId: 'P1010',
    reason: 'Suspected preeclampsia',
    reportedAt: new Date(new Date().setHours(7, 45, 0)),
    appointmentId: null,
    status: 'flagged',
    reportedBy: 'Dr. Johnson'
  }
];

const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState(mockAppointments);
  const [urgentCases, setUrgentCases] = useState(mockUrgentCases);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);

  // Filter appointments based on search query and status filter
  const filteredAppointments = appointments
    .filter(apt => 
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.patientId.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(apt => statusFilter === 'all' || apt.status === statusFilter);

  // Count appointments by status
  const appointmentCounts = {
    waiting: appointments.filter(a => a.status === 'waiting').length,
    inProgress: appointments.filter(a => a.status === 'in-progress').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    noShow: appointments.filter(a => a.status === 'no-show').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
    total: appointments.length,
    urgent: appointments.filter(a => a.urgency === 'urgent').length
  };

  const handleStartAppointment = (id: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === id ? { ...apt, status: 'in-progress' } : apt
      )
    );
    toast.success('Appointment started');
  };

  const handleCompleteAppointment = (id: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === id ? { ...apt, status: 'completed' } : apt
      )
    );
    toast.success('Appointment completed');
  };

  const handleNoShowAppointment = (id: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === id ? { ...apt, status: 'no-show' } : apt
      )
    );
    toast.success('Patient marked as no-show');
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === id ? { ...apt, status: 'cancelled' } : apt
      )
    );
    toast.success('Appointment cancelled');
  };

  const handleAddNote = (id: string) => {
    // In a real app, this would open a modal to add notes
    toast.success('Note added to appointment');
  };

  const handleAddressUrgentCase = (id: string) => {
    setUrgentCases(prev => 
      prev.map(c => 
        c.id === id ? { ...c, status: 'addressed' } : c
      )
    );
    toast.success('Case marked as addressed');
  };

  const handleViewPatient = (patientId: string) => {
    navigate(`/dashboard/patients?id=${patientId}`);
  };

  const formatAppointmentDate = (date: Date) => {
    return formatDate(date);
  };

  const handlePreviousDay = () => {
    const prevDay = new Date(currentDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setCurrentDate(prevDay);
    // In a real app, this would fetch appointments for the previous day
  };

  const handleNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setCurrentDate(nextDay);
    // In a real app, this would fetch appointments for the next day
  };

  const handleTodayClick = () => {
    setCurrentDate(new Date());
    // In a real app, this would fetch appointments for today
  };

  // Status badge color mapping
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'waiting': return 'secondary';
      case 'in-progress': return 'default';
      case 'completed': return 'success';
      case 'cancelled': return 'outline';
      case 'no-show': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'waiting': return 'Waiting';
      case 'in-progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      case 'no-show': return 'No Show';
      default: return status;
    }
  };

  const getAvailableActions = (status: string) => {
    switch (status) {
      case 'waiting':
        return ['start', 'cancel', 'no-show', 'note'];
      case 'in-progress':
        return ['complete', 'cancel', 'note'];
      case 'completed':
        return ['note'];
      case 'no-show':
        return ['reschedule', 'note'];
      case 'cancelled':
        return ['reschedule', 'note'];
      default:
        return [];
    }
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Doctor Dashboard | Santa Matilda</title>
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name || 'Doctor'}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousDay}
              className="px-2 py-1"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleTodayClick}
                className={formatAppointmentDate(currentDate) === formatAppointmentDate(new Date()) ? 'bg-slate-100' : ''}
              >
                Today
              </Button>
              <div className="text-sm font-medium">
                {formatAppointmentDate(currentDate)}
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextDay}
              className="px-2 py-1"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Appointments</p>
                <h3 className="text-2xl font-bold mt-1">{appointmentCounts.total}</h3>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Waiting</p>
                <h3 className="text-2xl font-bold mt-1">{appointmentCounts.waiting}</h3>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <h3 className="text-2xl font-bold mt-1">{appointmentCounts.completed}</h3>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Urgent Cases</p>
                <h3 className="text-2xl font-bold mt-1">{appointmentCounts.urgent}</h3>
              </div>
              <div className="bg-red-100 p-2 rounded-full">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Urgent Cases */}
        {urgentCases.filter(c => c.status === 'flagged').length > 0 && (
          <Card className="border-red-200 bg-red-50 dark:bg-red-900/10">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium flex items-center">
                  <BadgeAlert className="text-red-600 mr-2 h-5 w-5" />
                  Urgent Cases
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {urgentCases
                .filter(c => c.status === 'flagged')
                .map(urgentCase => (
                  <div key={urgentCase.id} className="bg-white dark:bg-slate-800 p-3 rounded-md shadow-sm border border-red-200 flex justify-between items-center">
                    <div>
                      <div className="font-medium">{urgentCase.patientName}</div>
                      <div className="text-sm text-red-600">{urgentCase.reason}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Flagged by {urgentCase.reportedBy} at {formatTime(urgentCase.reportedAt)}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewPatient(urgentCase.patientId)}
                      >
                        View Patient
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleAddressUrgentCase(urgentCase.id)}
                      >
                        Address
                      </Button>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        )}

        {/* Appointments Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle className="text-lg font-medium">Today's Appointments</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search appointments..."
                    className="pl-8 h-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-full sm:w-36 h-10">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="waiting">Waiting</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="no-show">No Show</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredAppointments.length === 0 ? (
                <div className="text-center py-6">
                  <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-3 text-lg font-medium">No appointments found</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {searchQuery || statusFilter !== 'all' 
                      ? 'Try changing your search or filter' 
                      : 'You have no appointments scheduled for today'}
                  </p>
                </div>
              ) : (
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b bg-slate-50 dark:bg-slate-800">
                          <th className="h-12 px-4 text-left align-middle font-medium">
                            <div className="flex items-center space-x-2">
                              <span>Time</span>
                            </div>
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium">
                            <div className="flex items-center space-x-2">
                              <span>Patient</span>
                            </div>
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium">
                            <div className="flex items-center space-x-2">
                              <span>Type</span>
                            </div>
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium">
                            <div className="flex items-center space-x-2">
                              <span>Status</span>
                            </div>
                          </th>
                          <th className="h-12 px-4 text-right align-middle font-medium">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAppointments.map((appointment) => (
                          <tr 
                            key={appointment.id} 
                            className="border-b hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            onClick={() => setSelectedAppointment(appointment.id === selectedAppointment ? null : appointment.id)}
                          >
                            <td className="p-4 align-middle">
                              <div className="flex flex-col">
                                <span className="font-medium">{formatTime(appointment.time)}</span>
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full overflow-hidden">
                                  <img 
                                    src={appointment.avatar}
                                    alt={appointment.patientName}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="font-medium">{appointment.patientName}</div>
                                  <div className="text-xs text-muted-foreground">{appointment.patientId}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex items-start">
                                <div>
                                  <div>{appointment.type}</div>
                                  {appointment.notes && (
                                    <div className="text-xs text-muted-foreground max-w-xs truncate">{appointment.notes}</div>
                                  )}
                                </div>
                                {appointment.urgency === 'urgent' && (
                                  <Badge className="ml-2 bg-red-500" variant="default">Urgent</Badge>
                                )}
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <Badge variant={getStatusBadgeVariant(appointment.status)}>
                                {getStatusLabel(appointment.status)}
                              </Badge>
                            </td>
                            <td className="p-4 align-middle text-right">
                              <div className="flex items-center justify-end gap-2">
                                {getAvailableActions(appointment.status).includes('start') && (
                                  <Button 
                                    size="sm" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleStartAppointment(appointment.id);
                                    }}
                                  >
                                    Start
                                  </Button>
                                )}
                                {getAvailableActions(appointment.status).includes('complete') && (
                                  <Button 
                                    size="sm"
                                    variant="outline"
                                    className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCompleteAppointment(appointment.id);
                                    }}
                                  >
                                    Complete
                                  </Button>
                                )}
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button 
                                      size="icon" 
                                      variant="ghost"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={() => handleViewPatient(appointment.patientId)}
                                    >
                                      View Patient
                                    </DropdownMenuItem>
                                    {getAvailableActions(appointment.status).includes('note') && (
                                      <DropdownMenuItem
                                        onClick={() => handleAddNote(appointment.id)}
                                      >
                                        Add Note
                                      </DropdownMenuItem>
                                    )}
                                    {getAvailableActions(appointment.status).includes('cancel') && (
                                      <DropdownMenuItem
                                        onClick={() => handleCancelAppointment(appointment.id)}
                                        className="text-red-600"
                                      >
                                        Cancel
                                      </DropdownMenuItem>
                                    )}
                                    {getAvailableActions(appointment.status).includes('no-show') && (
                                      <DropdownMenuItem
                                        onClick={() => handleNoShowAppointment(appointment.id)}
                                      >
                                        Mark No-Show
                                      </DropdownMenuItem>
                                    )}
                                    {getAvailableActions(appointment.status).includes('reschedule') && (
                                      <DropdownMenuItem>
                                        Reschedule
                                      </DropdownMenuItem>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredAppointments.length} of {appointments.length} appointments
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/appointments')}>
              View All Appointments
            </Button>
          </CardFooter>
        </Card>
      </div>
    </PageTransition>
  );
};

export default DoctorDashboard;
