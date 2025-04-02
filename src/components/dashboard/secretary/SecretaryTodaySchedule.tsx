
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, CheckCircle, AlertCircle, XCircle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type AppointmentStatus = 'scheduled' | 'in-progress' | 'completed' | 'no-show' | 'cancelled';

interface Appointment {
  id: string;
  patientName: string;
  patientAvatar?: string;
  doctorName: string;
  time: string;
  duration: string;
  reason: string;
  status: AppointmentStatus;
  isUrgent?: boolean;
}

const SecretaryTodaySchedule: React.FC = () => {
  // Mock data for demonstration
  const initialAppointments: Appointment[] = [
    {
      id: 'appt-1',
      patientName: 'Maria Rodriguez',
      patientAvatar: '',
      doctorName: 'Dr. Maria Santos',
      time: '09:00 AM',
      duration: '30 min',
      reason: 'Prenatal Checkup',
      status: 'completed',
      isUrgent: false
    },
    {
      id: 'appt-2',
      patientName: 'Sofia Garcia',
      patientAvatar: '',
      doctorName: 'Dr. Maria Santos',
      time: '10:00 AM',
      duration: '45 min',
      reason: 'Ultrasound',
      status: 'completed',
      isUrgent: false
    },
    {
      id: 'appt-3',
      patientName: 'Elena Martinez',
      patientAvatar: '',
      doctorName: 'Dr. Maria Santos',
      time: '11:00 AM',
      duration: '30 min',
      reason: 'Postpartum Checkup',
      status: 'in-progress',
      isUrgent: true
    },
    {
      id: 'appt-4',
      patientName: 'Ana Lopez',
      patientAvatar: '',
      doctorName: 'Dr. Maria Santos',
      time: '01:00 PM',
      duration: '30 min',
      reason: 'Annual Exam',
      status: 'scheduled',
      isUrgent: false
    },
    {
      id: 'appt-5',
      patientName: 'Isabella Hernandez',
      patientAvatar: '',
      doctorName: 'Dr. Maria Santos',
      time: '02:00 PM',
      duration: '45 min',
      reason: 'Fertility Consultation',
      status: 'scheduled',
      isUrgent: false
    },
    {
      id: 'appt-6',
      patientName: 'Camila Gonzalez',
      patientAvatar: '',
      doctorName: 'Dr. Maria Santos',
      time: '03:00 PM',
      duration: '30 min',
      reason: 'Gynecological Exam',
      status: 'scheduled',
      isUrgent: false
    }
  ];

  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);

  const handleStatusChange = (id: string, newStatus: AppointmentStatus) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? { ...appointment, status: newStatus } : appointment
    ));
  };

  const handleMarkUrgent = (id: string, isUrgent: boolean) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? { ...appointment, isUrgent } : appointment
    ));
  };

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Scheduled</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">In Progress</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Completed</Badge>;
      case 'no-show':
        return <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200">No Show</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Cancelled</Badge>;
    }
  };

  const getStatusActions = (appointment: Appointment) => {
    switch (appointment.status) {
      case 'scheduled':
        return (
          <div className="flex flex-wrap gap-2">
            <Button 
              size="sm" 
              variant="outline"
              className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
              onClick={() => handleStatusChange(appointment.id, 'in-progress')}
            >
              Check In
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              onClick={() => handleStatusChange(appointment.id, 'no-show')}
            >
              No Show
            </Button>
          </div>
        );
      case 'in-progress':
        return (
          <Button 
            size="sm" 
            variant="outline"
            className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
            onClick={() => handleStatusChange(appointment.id, 'completed')}
          >
            Complete
          </Button>
        );
      case 'completed':
      case 'no-show':
      case 'cancelled':
        return (
          <Button 
            size="sm" 
            variant="outline"
            className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
          >
            View Details
          </Button>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Today's Schedule</CardTitle>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>View Calendar</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div 
              key={appointment.id} 
              className={cn(
                "flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border",
                appointment.isUrgent ? "border-red-200 bg-red-50" : "border-slate-200 bg-white"
              )}
            >
              <div className="flex items-start gap-4 mb-4 md:mb-0">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={appointment.patientAvatar} alt={appointment.patientName} />
                  <AvatarFallback className="bg-clinic-100 text-clinic-600">
                    {appointment.patientName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{appointment.patientName}</h3>
                    {appointment.isUrgent && (
                      <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                        Urgent
                      </Badge>
                    )}
                    {getStatusBadge(appointment.status)}
                  </div>
                  
                  <div className="text-sm text-muted-foreground">{appointment.reason}</div>
                  
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {appointment.time}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span className="mr-1">•</span>
                      {appointment.duration}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span className="mr-1">•</span>
                      {appointment.doctorName}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                {appointment.status === 'scheduled' && !appointment.isUrgent && (
                  <Button 
                    size="sm"
                    variant="outline"
                    className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                    onClick={() => handleMarkUrgent(appointment.id, true)}
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Mark Urgent
                  </Button>
                )}
                
                {appointment.status === 'scheduled' && appointment.isUrgent && (
                  <Button 
                    size="sm"
                    variant="outline"
                    className="bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    onClick={() => handleMarkUrgent(appointment.id, false)}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Clear Urgent
                  </Button>
                )}
                
                {getStatusActions(appointment)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SecretaryTodaySchedule;
