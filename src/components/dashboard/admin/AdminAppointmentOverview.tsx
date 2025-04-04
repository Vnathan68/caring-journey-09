
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Search, User, FileText, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const mockAppointments = [
  {
    id: 'apt-1',
    patientName: 'María Garcia',
    doctorName: 'Dr. Maria Santos',
    date: '2025-04-05',
    time: '09:00 AM',
    status: 'confirmed',
    type: 'Prenatal Checkup',
  },
  {
    id: 'apt-2',
    patientName: 'Luisa Hernandez',
    doctorName: 'Dr. Maria Santos',
    date: '2025-04-05',
    time: '10:30 AM',
    status: 'confirmed',
    type: 'Ultrasound',
  },
  {
    id: 'apt-3',
    patientName: 'Carmen Rodriguez',
    doctorName: 'Dr. Maria Santos',
    date: '2025-04-05',
    time: '01:00 PM',
    status: 'rescheduled',
    type: 'Gynecological Exam',
  },
  {
    id: 'apt-4',
    patientName: 'Isabella Lopez',
    doctorName: 'Dr. Juan Martinez',
    date: '2025-04-05',
    time: '02:30 PM',
    status: 'cancelled',
    type: 'Postpartum Checkup',
  },
  {
    id: 'apt-5',
    patientName: 'Sofia Mendez',
    doctorName: 'Dr. Juan Martinez',
    date: '2025-04-06',
    time: '09:00 AM',
    status: 'confirmed',
    type: 'Prenatal Checkup',
  },
  {
    id: 'apt-6',
    patientName: 'Elena Torres',
    doctorName: 'Dr. Juan Martinez',
    date: '2025-04-06',
    time: '10:30 AM',
    status: 'confirmed',
    type: 'Fertility Consultation',
  },
];

const AdminAppointmentOverview: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const dateString = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const nextDay = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 1);
    setCurrentDate(next);
  };

  const prevDay = () => {
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 1);
    setCurrentDate(prev);
  };

  const filteredAppointments = mockAppointments.filter(apt => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          apt.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'rescheduled': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0">
            <div>
              <CardTitle>Appointment Manager</CardTitle>
              <CardDescription>Manage and schedule appointments</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={prevDay}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                <CalendarIcon className="h-4 w-4 mr-1" /> Today
              </Button>
              <Button variant="outline" size="sm" onClick={nextDay}>
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">{dateString}</h3>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search appointments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="rescheduled">Rescheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_120px_100px_120px] py-3 px-4 font-medium border-b hidden md:grid">
                <div>Patient</div>
                <div>Doctor</div>
                <div>Time</div>
                <div>Status</div>
                <div className="text-right">Actions</div>
              </div>
              {filteredAppointments.length > 0 ? (
                <div className="divide-y">
                  {filteredAppointments.map((appointment) => (
                    <div key={appointment.id} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_120px_100px_120px] py-3 px-4 items-center">
                      <div className="flex items-center gap-2 font-medium md:font-normal">
                        <User className="h-4 w-4 text-muted-foreground md:hidden" />
                        <div>{appointment.patientName}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-muted-foreground md:hidden" />
                        <div>{appointment.doctorName}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground md:hidden" />
                        <div>{appointment.time}</div>
                      </div>
                      <div className="py-1">
                        <Badge variant="outline" className={`${getStatusColor(appointment.status)}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <AlertCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-muted-foreground">
                  No appointments found matching your filters.
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Export List</Button>
          <Button className="bg-clinic-600 hover:bg-clinic-700">+ Add New Appointment</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminAppointmentOverview;
