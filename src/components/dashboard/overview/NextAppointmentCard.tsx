
import React from 'react';
import { Calendar, Clock, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface AppointmentType {
  id: string;
  type: string;
  provider: string;
  date: Date;
  status: string;
}

interface NextAppointmentCardProps {
  upcomingAppointments: AppointmentType[];
  onBookAppointment: () => void;
}

const NextAppointmentCard: React.FC<NextAppointmentCardProps> = ({ 
  upcomingAppointments, 
  onBookAppointment 
}) => {
  const handleRescheduleAppointment = (id: string) => {
    toast({
      title: "Reschedule requested",
      description: "You can now select a new date and time for your appointment.",
    });
    onBookAppointment();
  };
  
  const handleCancelAppointment = (id: string) => {
    toast({
      title: "Appointment cancelled",
      description: "Your appointment has been cancelled successfully.",
    });
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-medium">Next Appointment</CardTitle>
            <CardDescription>Your upcoming schedule</CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-foreground" 
            onClick={() => window.location.href = '/dashboard/appointments'}
          >
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
                onClick={onBookAppointment}
              >
                <Plus className="h-3 w-3 mr-1" /> Book Now
              </Button>
            </div>
          </div>
        )}
        {upcomingAppointments.length > 0 && (
          <div className="mt-4 flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1" 
              onClick={() => handleRescheduleAppointment(upcomingAppointments[0].id)}
            >
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
  );
};

export default NextAppointmentCard;
