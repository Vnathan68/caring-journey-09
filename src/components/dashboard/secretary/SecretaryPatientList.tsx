
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search, Plus, Filter, CalendarPlus, FileText, Phone, Mail } from 'lucide-react';

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

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  lastVisit: string;
  insuranceProvider: string;
  status: 'active' | 'inactive' | 'pending';
}

const SecretaryPatientList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterPatient = () => {
    // Logic to register patient - for now just close the dialog
    setRegisterDialogOpen(false);
    // In a real implementation, this would save the patient to the database
  };

  // Mock data for demonstration
  const patients: Patient[] = [
    {
      id: 'pt-1',
      name: 'Sofia Garcia',
      email: 'sofia@example.com',
      phone: '(555) 123-4567',
      dateOfBirth: '1985-04-12',
      lastVisit: '2025-03-15',
      insuranceProvider: 'BlueCross',
      status: 'active'
    },
    {
      id: 'pt-2',
      name: 'Elena Martinez',
      email: 'elena@example.com',
      phone: '(555) 234-5678',
      dateOfBirth: '1990-08-22',
      lastVisit: '2025-03-20',
      insuranceProvider: 'Aetna',
      status: 'active'
    },
    {
      id: 'pt-3',
      name: 'Ana Lopez',
      email: 'ana@example.com',
      phone: '(555) 345-6789',
      dateOfBirth: '1982-11-05',
      lastVisit: '2025-02-10',
      insuranceProvider: 'United',
      status: 'active'
    },
    {
      id: 'pt-4',
      name: 'Isabella Hernandez',
      email: 'isabella@example.com',
      phone: '(555) 456-7890',
      dateOfBirth: '1995-07-18',
      lastVisit: '2025-03-05',
      insuranceProvider: 'Kaiser',
      status: 'inactive'
    },
    {
      id: 'pt-5',
      name: 'Camila Gonzalez',
      email: 'camila@example.com',
      phone: '(555) 567-8901',
      dateOfBirth: '1988-12-30',
      lastVisit: '2025-01-25',
      insuranceProvider: 'Medicare',
      status: 'pending'
    }
  ];

  const getStatusBadge = (status: 'active' | 'inactive' | 'pending') => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-50 text-green-600 border-green-200">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-slate-100 text-slate-600 border-slate-200">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-amber-50 text-amber-600 border-amber-200">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search patients..." 
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
          
          <Dialog open={registerDialogOpen} onOpenChange={setRegisterDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-clinic-600 hover:bg-clinic-700 text-white flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Register Patient</span>
              </Button>
            </DialogTrigger>
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
                  <Button variant="outline" onClick={() => setRegisterDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-clinic-600 hover:bg-clinic-700 text-white"
                    onClick={handleRegisterPatient}
                  >
                    Register Patient
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Patient Directory</CardTitle>
          <CardDescription>View and manage patient records</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Insurance</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-clinic-100 text-clinic-600">
                          {patient.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{patient.name}</div>
                        <div className="text-xs text-muted-foreground">ID: {patient.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                        {patient.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                        {patient.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{patient.dateOfBirth}</TableCell>
                  <TableCell>{patient.insuranceProvider}</TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>{getStatusBadge(patient.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-8 px-2">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 px-2">
                        <CalendarPlus className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecretaryPatientList;
