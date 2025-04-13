
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useRegisterPatient, PatientData } from '@/hooks/use-patient-api';

interface PatientFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  insuranceProvider: string;
  insuranceNumber: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

interface PatientRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const PatientRegistrationForm: React.FC<PatientRegistrationFormProps> = ({ isOpen, onClose }) => {
  const [formValues, setFormValues] = useState<PatientFormValues>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    insuranceProvider: '',
    insuranceNumber: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
  });

  const registerPatientMutation = useRegisterPatient();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterPatient = () => {
    const patientData: Omit<PatientData, 'id'> = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      phone: formValues.phone,
      dateOfBirth: formValues.dateOfBirth,
      address: formValues.address,
      city: formValues.city,
      state: formValues.state,
      zipCode: formValues.zipCode,
      insuranceProvider: formValues.insuranceProvider || undefined,
      insuranceNumber: formValues.insuranceNumber || undefined,
      emergencyContactName: formValues.emergencyContactName || undefined,
      emergencyContactPhone: formValues.emergencyContactPhone || undefined
    };

    registerPatientMutation.mutate(patientData, {
      onSuccess: () => {
        onClose();
        setFormValues({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          dateOfBirth: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          insuranceProvider: '',
          insuranceNumber: '',
          emergencyContactName: '',
          emergencyContactPhone: '',
        });
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Register New Patient</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formValues.firstName}
                onChange={handleInputChange}
                placeholder="First name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formValues.lastName}
                onChange={handleInputChange}
                placeholder="Last name"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleInputChange}
                placeholder="Email address"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formValues.phone}
                onChange={handleInputChange}
                placeholder="Phone number"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formValues.dateOfBirth}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={formValues.address}
              onChange={handleInputChange}
              placeholder="Street address"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formValues.city}
                onChange={handleInputChange}
                placeholder="City"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select 
                onValueChange={(value) => handleSelectChange('state', value)}
                value={formValues.state}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CA">California</SelectItem>
                  <SelectItem value="NY">New York</SelectItem>
                  <SelectItem value="TX">Texas</SelectItem>
                  <SelectItem value="FL">Florida</SelectItem>
                  <SelectItem value="IL">Illinois</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={formValues.zipCode}
                onChange={handleInputChange}
                placeholder="ZIP code"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="insuranceProvider">Insurance Provider</Label>
              <Select 
                onValueChange={(value) => handleSelectChange('insuranceProvider', value)}
                value={formValues.insuranceProvider}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BlueCross">BlueCross BlueShield</SelectItem>
                  <SelectItem value="Aetna">Aetna</SelectItem>
                  <SelectItem value="United">UnitedHealthcare</SelectItem>
                  <SelectItem value="Kaiser">Kaiser Permanente</SelectItem>
                  <SelectItem value="Medicare">Medicare</SelectItem>
                  <SelectItem value="Medicaid">Medicaid</SelectItem>
                  <SelectItem value="None">None/Self-Pay</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="insuranceNumber">Insurance Number</Label>
              <Input
                id="insuranceNumber"
                name="insuranceNumber"
                value={formValues.insuranceNumber}
                onChange={handleInputChange}
                placeholder="Insurance ID number"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
              <Input
                id="emergencyContactName"
                name="emergencyContactName"
                value={formValues.emergencyContactName}
                onChange={handleInputChange}
                placeholder="Emergency contact name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
              <Input
                id="emergencyContactPhone"
                name="emergencyContactPhone"
                value={formValues.emergencyContactPhone}
                onChange={handleInputChange}
                placeholder="Emergency contact phone"
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              className="bg-clinic-600 hover:bg-clinic-700 text-white"
              onClick={handleRegisterPatient}
              isLoading={registerPatientMutation.isPending}
            >
              Register Patient
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatientRegistrationForm;
