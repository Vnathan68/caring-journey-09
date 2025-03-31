
import React from 'react';
import { CalendarPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  userName: string;
  onBookAppointment: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName, onBookAppointment }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold">Welcome, {userName}</h1>
        <p className="text-muted-foreground">Here's an overview of your health information</p>
      </div>
      <Button 
        className="bg-clinic-600 hover:bg-clinic-700 text-white flex items-center gap-2"
        onClick={onBookAppointment}
      >
        <CalendarPlus className="w-4 h-4" />
        Book Appointment
      </Button>
    </div>
  );
};

export default DashboardHeader;
