
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MapPin, MoreHorizontal, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { formatDate } from '@/lib/utils';

// Mock data for appointments
const mockAppointments = [
  {
    id: 'app-1',
    title: 'Prenatal Checkup',
    doctor: 'Dr. Maria Santos',
    date: new Date(2023, 4, 28, 10, 0),
    location: 'Main Clinic, Room 102',
    status: 'upcoming',
    type: 'Obstetrics'
  },
  {
    id: 'app-2',
    title: 'Ultrasound Scan',
    doctor: 'Dr. Anna Lee',
    date: new Date(2023, 5, 15, 9, 30),
    location: 'Imaging Center, 2nd Floor',
    status: 'upcoming',
    type: 'Obstetrics'
  },
  {
    id: 'app-3',
    title: 'Postnatal Checkup',
    doctor: 'Dr. Maria Santos',
    date: new Date(2023, 2, 15, 11, 0),
    location: 'Main Clinic, Room 102',
    status: 'completed',
    type: 'Obstetrics'
  },
  {
    id: 'app-4',
    title: 'Family Planning Consultation',
    doctor: 'Dr. James Rodriguez',
    date: new Date(2023, 1, 20, 14, 0),
    location: 'Consultation Room 3',
    status: 'completed',
    type: 'Family Planning'
  },
];

type AppointmentStatus = 'upcoming' | 'completed' | 'cancelled';

const AppointmentList: React.FC = () => {
  const [filter, setFilter] = useState<AppointmentStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAppointments = mockAppointments.filter(appointment => {
    // Apply status filter
    if (filter !== 'all' && appointment.status !== filter) return false;
    
    // Apply search filter (case insensitive)
    if (searchQuery && !appointment.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !appointment.doctor.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Appointments</CardTitle>
          <CardDescription>Manage your scheduled appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search appointments..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={filter}
              onValueChange={(value) => setFilter(value as AppointmentStatus | 'all')}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Appointments</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-clinic-600 hover:bg-clinic-700 text-white">
              Book New Appointment
            </Button>
          </div>

          <div className="space-y-4">
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">No appointments found</h3>
                <p className="mt-1 text-muted-foreground">
                  {searchQuery || filter !== 'all' 
                    ? "Try adjusting your filters" 
                    : "Book your first appointment to get started"}
                </p>
                {!searchQuery && filter === 'all' && (
                  <Button className="mt-4 bg-clinic-600 hover:bg-clinic-700 text-white">
                    Book Appointment
                  </Button>
                )}
              </div>
            ) : (
              filteredAppointments.map((appointment) => (
                <Card key={appointment.id} className="overflow-hidden">
                  <div className={`h-1.5 w-full ${
                    appointment.status === 'upcoming' ? 'bg-clinic-600' : 
                    appointment.status === 'completed' ? 'bg-green-500' : 'bg-amber-500'
                  }`} />
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="flex gap-4">
                        <div className={`rounded-full p-3 self-start ${
                          appointment.status === 'upcoming' ? 'bg-clinic-50 text-clinic-600' : 
                          appointment.status === 'completed' ? 'bg-green-50 text-green-600' : 
                          'bg-amber-50 text-amber-600'
                        }`}>
                          <Calendar className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{appointment.title}</h3>
                          <p className="text-muted-foreground">{appointment.doctor}</p>
                          <div className="mt-2 flex flex-col sm:flex-row gap-2 sm:gap-4">
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{formatDate(appointment.date)}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{appointment.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex items-start justify-end">
                        {appointment.status === 'upcoming' && (
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Reschedule</Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  Cancel Appointment
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        )}
                        {appointment.status === 'completed' && (
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">View Summary</Button>
                            <Button variant="outline" size="sm">Book Follow-up</Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredAppointments.length} of {mockAppointments.length} appointments
          </p>
          <Button variant="outline" size="sm">View Calendar</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AppointmentList;
