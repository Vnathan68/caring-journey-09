
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarPlus, Filter, Search, Plus, CalendarClock } from 'lucide-react';
import { addDays, format } from 'date-fns';

interface AppointmentFormValues {
  patientName: string;
  doctor: string;
  date: Date;
  time: string;
  duration: string;
  reason: string;
}

const SecretaryAppointmentView: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState<AppointmentFormValues>({
    patientName: '',
    doctor: '',
    date: new Date(),
    time: '09:00',
    duration: '30',
    reason: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setFormValues(prev => ({ ...prev, date }));
    }
  };

  const handleBookAppointment = () => {
    // Logic to book appointment - for now just close the dialog
    setBookingDialogOpen(false);
    // In a real implementation, this would save the appointment to the database
  };

  // Mock data for demonstration
  const availableTimeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
    '11:00 AM', '11:30 AM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM'
  ];

  const doctors = [
    { id: 'dr-1', name: 'Dr. Maria Santos', specialty: 'Obstetrics' },
    { id: 'dr-2', name: 'Dr. Ana Ramirez', specialty: 'Gynecology' },
    { id: 'dr-3', name: 'Dr. Elena Castro', specialty: 'Reproductive Medicine' }
  ];

  const patients = [
    { id: 'pt-1', name: 'Sofia Garcia', email: 'sofia@example.com' },
    { id: 'pt-2', name: 'Elena Martinez', email: 'elena@example.com' },
    { id: 'pt-3', name: 'Ana Lopez', email: 'ana@example.com' },
    { id: 'pt-4', name: 'Isabella Hernandez', email: 'isabella@example.com' },
    { id: 'pt-5', name: 'Camila Gonzalez', email: 'camila@example.com' }
  ];

  const renderCalendarView = () => {
    // In a real implementation, this would show appointments on the calendar
    return (
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-auto">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="border rounded-md shadow-sm"
          />
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium mb-4">
            {date ? format(date, 'EEEE, MMMM d, yyyy') : 'Select a date'}
          </h3>
          
          <div className="space-y-2">
            {availableTimeSlots.map((time, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50 cursor-pointer">
                <div className="flex items-center">
                  <CalendarClock className="h-4 w-4 text-muted-foreground mr-2" />
                  <span>{time}</span>
                </div>
                
                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                  Available
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search appointments..." 
            className="pl-9" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          
          <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-clinic-600 hover:bg-clinic-700 text-white flex items-center gap-2">
                <CalendarPlus className="h-4 w-4" />
                <span>New Appointment</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Book New Appointment</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange('patientName', value)}
                    value={formValues.patientName}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map(patient => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.name}
                        </SelectItem>
                      ))}
                      <Button variant="ghost" className="w-full justify-start" onClick={() => {}}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Patient
                      </Button>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="doctor">Doctor</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange('doctor', value)}
                    value={formValues.doctor}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map(doctor => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          {doctor.name} ({doctor.specialty})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <div className="border rounded-md p-3">
                      <Calendar
                        mode="single"
                        selected={formValues.date}
                        onSelect={handleDateSelect}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="mx-auto"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Select 
                        onValueChange={(value) => handleSelectChange('time', value)}
                        value={formValues.time}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                          <SelectItem value="09:30">9:30 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="10:30">10:30 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="11:30">11:30 AM</SelectItem>
                          <SelectItem value="13:00">1:00 PM</SelectItem>
                          <SelectItem value="13:30">1:30 PM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="14:30">2:30 PM</SelectItem>
                          <SelectItem value="15:00">3:00 PM</SelectItem>
                          <SelectItem value="15:30">3:30 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Select 
                        onValueChange={(value) => handleSelectChange('duration', value)}
                        value={formValues.duration}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Visit</Label>
                  <Input
                    id="reason"
                    name="reason"
                    value={formValues.reason}
                    onChange={handleInputChange}
                    placeholder="Brief description of the appointment"
                  />
                </div>
                
                <div className="mt-6 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setBookingDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-clinic-600 hover:bg-clinic-700 text-white"
                    onClick={handleBookAppointment}
                  >
                    Book Appointment
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Appointment Schedule</CardTitle>
          <CardDescription>View and manage upcoming appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calendar" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger 
                value="calendar" 
                onClick={() => setViewMode('calendar')}
              >
                Calendar View
              </TabsTrigger>
              <TabsTrigger 
                value="list" 
                onClick={() => setViewMode('list')}
              >
                List View
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="calendar" className="min-h-[500px]">
              {renderCalendarView()}
            </TabsContent>
            
            <TabsContent value="list" className="min-h-[500px]">
              <div className="space-y-4">
                {[...Array(7)].map((_, dayIndex) => {
                  const day = addDays(new Date(), dayIndex);
                  return (
                    <div key={dayIndex} className="space-y-2">
                      <h3 className="font-medium">
                        {format(day, 'EEEE, MMMM d, yyyy')}
                      </h3>
                      
                      <div className="space-y-2">
                        {dayIndex === 0 ? (
                          [...Array(3)].map((_, index) => (
                            <div key={index} className="p-3 border rounded-md flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">
                                  {['10:00 AM', '11:30 AM', '2:00 PM'][index]}
                                </span>
                                <span className="text-sm">
                                  {['Prenatal Checkup', 'Ultrasound', 'Consultation'][index]}
                                </span>
                                <Badge className="bg-blue-100 text-blue-600 border-blue-200">
                                  {['Patient', 'Doctor', 'Patient'][index]} Confirmed
                                </Badge>
                              </div>
                              <Button size="sm" variant="outline">
                                Details
                              </Button>
                            </div>
                          ))
                        ) : (
                          <div className="p-3 border rounded-md border-dashed text-center text-muted-foreground">
                            No appointments scheduled
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecretaryAppointmentView;
