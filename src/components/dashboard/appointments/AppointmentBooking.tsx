
import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  Calendar, 
  Clock, 
  User, 
  FileText, 
  ChevronRight, 
  ChevronLeft,
  Check 
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { generateTimeSlots } from '@/lib/utils';

interface AppointmentBookingProps {
  isOpen: boolean;
  onClose: () => void;
  initialDate?: Date;
  isRescheduling?: boolean;
  appointmentId?: string;
}

const AppointmentBooking: React.FC<AppointmentBookingProps> = ({
  isOpen,
  onClose,
  initialDate,
  isRescheduling = false,
  appointmentId,
}) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialDate || new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  
  // Mock data for services
  const services = [
    { id: 'service-1', name: 'Prenatal Checkup', duration: 30, description: 'Regular pregnancy monitoring appointment' },
    { id: 'service-2', name: 'Ultrasound', duration: 45, description: 'Detailed imaging of your baby' },
    { id: 'service-3', name: 'Glucose Test', duration: 60, description: 'Screening for gestational diabetes' },
    { id: 'service-4', name: 'Family Planning', duration: 30, description: 'Consultation for contraception and future pregnancy planning' },
    { id: 'service-5', name: 'General Gynecology', duration: 30, description: 'General women\'s health consultation' },
  ];
  
  // Mock data for providers
  const providers = [
    { id: 'doc-1', name: 'Dr. Maria Santos', specialty: 'OB-GYN', available: true },
    { id: 'doc-2', name: 'Dr. James Wilson', specialty: 'OB-GYN', available: true },
    { id: 'doc-3', name: 'Dr. Sarah Johnson', specialty: 'Family Planning', available: false },
  ];
  
  const timeSlots = generateTimeSlots(9, 17, 30);
  
  const resetForm = () => {
    setStep(1);
    setSelectedService('');
    setSelectedProvider('');
    setSelectedDate(new Date());
    setSelectedTime('');
    setNotes('');
  };
  
  const handleClose = () => {
    resetForm();
    onClose();
  };
  
  const handleNextStep = () => {
    setStep(step + 1);
  };
  
  const handlePreviousStep = () => {
    setStep(step - 1);
  };
  
  const handleSubmit = () => {
    // In a real application, this would send the data to an API
    toast({
      title: isRescheduling ? "Appointment Rescheduled" : "Appointment Booked",
      description: `Your appointment has been ${isRescheduling ? 'rescheduled' : 'booked'} successfully.`,
    });
    
    handleClose();
  };
  
  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center space-x-2 mb-6">
        {[1, 2, 3].map((item) => (
          <div 
            key={item} 
            className={`w-2.5 h-2.5 rounded-full ${
              step === item 
                ? 'bg-clinic-600' 
                : step > item 
                  ? 'bg-clinic-300' 
                  : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };
  
  const getSelectedService = () => {
    return services.find(service => service.id === selectedService);
  };
  
  const getSelectedProvider = () => {
    return providers.find(provider => provider.id === selectedProvider);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>
            {isRescheduling ? 'Reschedule Appointment' : 'Book an Appointment'}
          </DialogTitle>
          <DialogDescription>
            {step === 1 && "Select the type of service you need."}
            {step === 2 && "Choose your preferred doctor and date."}
            {step === 3 && "Review your appointment details."}
          </DialogDescription>
        </DialogHeader>
        
        {renderStepIndicator()}
        
        {step === 1 && (
          <div className="space-y-4 py-2">
            <div className="space-y-4">
              <h4 className="font-medium">Select Service</h4>
              <RadioGroup value={selectedService} onValueChange={setSelectedService}>
                <div className="space-y-2">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:border-clinic-200 ${
                        selectedService === service.id ? 'border-clinic-500 bg-clinic-50' : ''
                      }`}
                      onClick={() => setSelectedService(service.id)}
                    >
                      <RadioGroupItem value={service.id} id={service.id} />
                      <div className="flex-1">
                        <Label htmlFor={service.id} className="font-medium cursor-pointer">
                          {service.name}
                        </Label>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                        <div className="text-xs text-muted-foreground mt-1">
                          Duration: {service.duration} minutes
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="font-medium">Select Provider</h4>
              <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a provider" />
                </SelectTrigger>
                <SelectContent>
                  {providers.map((provider) => (
                    <SelectItem 
                      key={provider.id} 
                      value={provider.id}
                      disabled={!provider.available}
                    >
                      {provider.name} - {provider.specialty}
                      {!provider.available && " (Unavailable)"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Select Date</h4>
              <div className="border rounded-md p-3">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="pointer-events-auto mx-auto"
                  disabled={(date) => {
                    // Disable weekends, past dates, and dates more than 60 days in the future
                    const day = date.getDay();
                    const isWeekend = day === 0 || day === 6;
                    const isPastDate = date < new Date(new Date().setHours(0, 0, 0, 0));
                    const isTooFarInFuture = date > new Date(new Date().setDate(new Date().getDate() + 60));
                    return isWeekend || isPastDate || isTooFarInFuture;
                  }}
                />
              </div>
            </div>
            
            {selectedDate && (
              <div className="space-y-3">
                <h4 className="font-medium">Select Time</h4>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time, index) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      className={`text-sm h-9 ${selectedTime === time ? "bg-clinic-600" : ""}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <h4 className="font-medium">Additional Notes (Optional)</h4>
              <Textarea
                placeholder="Add any specific concerns or information for your provider"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="resize-none"
                rows={3}
              />
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-6">
            <h4 className="font-medium">Appointment Summary</h4>
            
            <div className="bg-slate-50 rounded-md p-4 space-y-4">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-clinic-600 mt-0.5" />
                <div>
                  <h5 className="font-medium">Service</h5>
                  <p>{getSelectedService()?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Duration: {getSelectedService()?.duration} minutes
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-clinic-600 mt-0.5" />
                <div>
                  <h5 className="font-medium">Provider</h5>
                  <p>{getSelectedProvider()?.name}</p>
                  <p className="text-sm text-muted-foreground">{getSelectedProvider()?.specialty}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-clinic-600 mt-0.5" />
                <div>
                  <h5 className="font-medium">Date & Time</h5>
                  <p>
                    {selectedDate?.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedTime}
                  </p>
                </div>
              </div>
              
              {notes && (
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-clinic-600 mt-0.5" />
                  <div>
                    <h5 className="font-medium">Additional Notes</h5>
                    <p className="text-sm">{notes}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-sky-50 border border-sky-100 rounded-md p-3">
              <div className="flex gap-3">
                <div className="text-sky-500 mt-0.5">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-sky-800">Appointment Confirmation</p>
                  <p className="text-sm text-sky-700">
                    You'll receive a confirmation via email and SMS once your appointment is booked.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handlePreviousStep}
              className="mb-2 sm:mb-0"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back
            </Button>
          )}
          
          <div className="space-x-2">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={handleClose}
            >
              Cancel
            </Button>
            
            {step < 3 ? (
              <Button 
                type="button" 
                onClick={handleNextStep}
                disabled={
                  (step === 1 && !selectedService) || 
                  (step === 2 && (!selectedProvider || !selectedDate || !selectedTime))
                }
              >
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                type="button" 
                onClick={handleSubmit}
                className="bg-clinic-600 hover:bg-clinic-700"
              >
                {isRescheduling ? 'Reschedule' : 'Book'} Appointment
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentBooking;
