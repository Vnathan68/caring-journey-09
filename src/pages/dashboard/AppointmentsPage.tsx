
import React from 'react';
import PageTransition from '@/components/ui-custom/page-transition';
import { Helmet } from 'react-helmet-async';
import AppointmentList from '@/components/dashboard/AppointmentList';
import AppointmentBooking from '@/components/dashboard/appointments/AppointmentBooking';
import { Button } from '@/components/ui/button';
import { CalendarPlus } from 'lucide-react';
import { useState } from 'react';

const AppointmentsPage: React.FC = () => {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  return (
    <PageTransition>
      <Helmet>
        <title>Appointments | Santa Matilda</title>
        <meta name="description" content="Manage your appointments at Santa Matilda Women's Health Clinic" />
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Appointments</h1>
            <p className="text-muted-foreground">Schedule and manage your appointments</p>
          </div>
          <Button 
            className="bg-clinic-600 hover:bg-clinic-700 text-white flex items-center gap-2"
            onClick={() => setShowAppointmentModal(true)}
          >
            <CalendarPlus className="w-4 h-4" />
            Book New Appointment
          </Button>
        </div>
        
        <AppointmentList />
        
        <AppointmentBooking 
          isOpen={showAppointmentModal} 
          onClose={() => setShowAppointmentModal(false)} 
        />
      </div>
    </PageTransition>
  );
};

export default AppointmentsPage;
