
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import PageTransition from '@/components/ui-custom/page-transition';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { formatDate } from '@/lib/utils';
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  Pill, 
  Clock, 
  Calendar, 
  MoreVertical, 
  FileCheck,
  Printer,
  Download
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Mock data for prescriptions
const mockPrescriptions = [
  {
    id: 'presc-1',
    patientName: 'Maria Garcia',
    patientId: 'P1001',
    date: new Date(2023, 5, 15),
    status: 'active',
    medications: [
      { name: 'Folic Acid', dosage: '5mg', frequency: 'Once daily', duration: '30 days' },
      { name: 'Prenatal Vitamins', dosage: '1 tablet', frequency: 'Once daily', duration: '30 days' }
    ],
    notes: 'Take with food. Avoid alcohol.'
  },
  {
    id: 'presc-2',
    patientName: 'Jennifer Williams',
    patientId: 'P1002',
    date: new Date(2023, 5, 10),
    status: 'active',
    medications: [
      { name: 'Ibuprofen', dosage: '400mg', frequency: 'Every 6 hours as needed', duration: '7 days' },
      { name: 'Cyclobenzaprine', dosage: '10mg', frequency: 'Once daily at bedtime', duration: '7 days' }
    ],
    notes: 'For pelvic pain management. May cause drowsiness.'
  },
  {
    id: 'presc-3',
    patientName: 'Sarah Johnson',
    patientId: 'P1003',
    date: new Date(2023, 5, 5),
    status: 'expired',
    medications: [
      { name: 'Doxycycline', dosage: '100mg', frequency: 'Twice daily', duration: '10 days' }
    ],
    notes: 'Take with full glass of water. Avoid dairy products.'
  },
  {
    id: 'presc-4',
    patientName: 'Emily Brown',
    patientId: 'P1004',
    date: new Date(2023, 4, 25),
    status: 'expired',
    medications: [
      { name: 'Ferrous Sulfate', dosage: '325mg', frequency: 'Twice daily', duration: '30 days' },
      { name: 'Vitamin D', dosage: '1000 IU', frequency: 'Once daily', duration: '30 days' }
    ],
    notes: 'For postpartum anemia. Take with orange juice to improve absorption.'
  },
  {
    id: 'presc-5',
    patientName: 'Sophia Martinez',
    patientId: 'P1005',
    date: new Date(2023, 4, 20),
    status: 'active',
    medications: [
      { name: 'Clomiphene', dosage: '50mg', frequency: 'Once daily on days 5-9 of cycle', duration: '5 days' }
    ],
    notes: 'Fertility medication. Report any visual changes immediately.'
  }
];

// Common medication templates for quick selection
const medicationTemplates = [
  { name: 'Folic Acid', dosage: '5mg', frequency: 'Once daily', duration: '30 days' },
  { name: 'Prenatal Vitamins', dosage: '1 tablet', frequency: 'Once daily', duration: '30 days' },
  { name: 'Iron Supplement', dosage: '325mg', frequency: 'Twice daily', duration: '30 days' },
  { name: 'Metronidazole', dosage: '500mg', frequency: 'Twice daily', duration: '7 days' },
  { name: 'Clotrimazole', dosage: '100mg', frequency: 'Once daily at bedtime', duration: '7 days' },
  { name: 'Progesterone', dosage: '200mg', frequency: 'Once daily', duration: '10 days' },
];

const PrescriptionsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState(mockPrescriptions);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newPrescription, setNewPrescription] = useState({
    patientName: '',
    patientId: '',
    medications: [{ name: '', dosage: '', frequency: '', duration: '' }],
    notes: ''
  });
  const [isNewPrescriptionDialogOpen, setIsNewPrescriptionDialogOpen] = useState(false);
  const [selectedMedicationTemplate, setSelectedMedicationTemplate] = useState('');

  const filteredPrescriptions = prescriptions
    .filter(presc => 
      presc.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      presc.patientId.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(presc => statusFilter === 'all' || presc.status === statusFilter);

  const handleAddMedication = () => {
    setNewPrescription({
      ...newPrescription,
      medications: [
        ...newPrescription.medications,
        { name: '', dosage: '', frequency: '', duration: '' }
      ]
    });
  };

  const handleRemoveMedication = (index: number) => {
    setNewPrescription({
      ...newPrescription,
      medications: newPrescription.medications.filter((_, i) => i !== index)
    });
  };

  const handleMedicationChange = (index: number, field: string, value: string) => {
    setNewPrescription({
      ...newPrescription,
      medications: newPrescription.medications.map((med, i) => 
        i === index ? { ...med, [field]: value } : med
      )
    });
  };

  const handleApplyTemplate = () => {
    if (!selectedMedicationTemplate) return;
    
    const template = medicationTemplates.find(t => t.name === selectedMedicationTemplate);
    if (template) {
      // Replace the first empty medication or add a new one
      const emptyIndex = newPrescription.medications.findIndex(m => !m.name);
      
      if (emptyIndex >= 0) {
        handleMedicationChange(emptyIndex, 'name', template.name);
        handleMedicationChange(emptyIndex, 'dosage', template.dosage);
        handleMedicationChange(emptyIndex, 'frequency', template.frequency);
        handleMedicationChange(emptyIndex, 'duration', template.duration);
      } else {
        setNewPrescription({
          ...newPrescription,
          medications: [
            ...newPrescription.medications,
            { ...template }
          ]
        });
      }
      
      setSelectedMedicationTemplate('');
    }
  };

  const handleCreatePrescription = () => {
    // Validate
    if (!newPrescription.patientName || !newPrescription.patientId) {
      toast.error('Please select a patient');
      return;
    }

    if (newPrescription.medications.some(med => !med.name || !med.dosage || !med.frequency || !med.duration)) {
      toast.error('Please complete all medication details');
      return;
    }

    // Create the prescription
    const createdPrescription = {
      id: `presc-${Date.now()}`,
      patientName: newPrescription.patientName,
      patientId: newPrescription.patientId,
      date: new Date(),
      status: 'active',
      medications: newPrescription.medications,
      notes: newPrescription.notes
    };

    setPrescriptions([createdPrescription, ...prescriptions]);
    
    // Reset form
    setNewPrescription({
      patientName: '',
      patientId: '',
      medications: [{ name: '', dosage: '', frequency: '', duration: '' }],
      notes: ''
    });
    
    setIsNewPrescriptionDialogOpen(false);
    toast.success('Prescription created successfully');
  };

  const handleViewPrescription = (id: string) => {
    // In a real app, navigate to detail view
    toast.success(`Viewing prescription ${id}`);
  };

  const handlePrintPrescription = (id: string) => {
    toast.success('Prescription sent to printer');
  };

  const handleDownloadPrescription = (id: string) => {
    toast.success('Prescription downloaded as PDF');
  };

  const handleEmailPrescription = (id: string) => {
    toast.success('Prescription emailed to pharmacy');
  };

  const handleRenewPrescription = (id: string) => {
    toast.success('Prescription renewed for 30 days');
  };

  const handleCancelPrescription = (id: string) => {
    setPrescriptions(prev => 
      prev.map(p => p.id === id ? { ...p, status: 'cancelled' } : p)
    );
    toast.success('Prescription cancelled');
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Prescriptions | Santa Matilda</title>
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Prescriptions</h1>
            <p className="text-muted-foreground">Manage patient prescriptions</p>
          </div>
          
          <Dialog open={isNewPrescriptionDialogOpen} onOpenChange={setIsNewPrescriptionDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Prescription
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Create New Prescription</DialogTitle>
                <DialogDescription>
                  Create a prescription for a patient. Add medications, dosage, and instructions.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient-name">Patient Name</Label>
                    <Select 
                      value={newPrescription.patientName}
                      onValueChange={(value) => {
                        const patient = mockPrescriptions.find(p => p.patientName === value);
                        setNewPrescription({
                          ...newPrescription,
                          patientName: value,
                          patientId: patient?.patientId || ''
                        });
                      }}
                    >
                      <SelectTrigger id="patient-name">
                        <SelectValue placeholder="Select patient" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from(new Set(mockPrescriptions.map(p => p.patientName))).map((name) => (
                          <SelectItem key={name} value={name}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-id">Patient ID</Label>
                    <Input 
                      id="patient-id" 
                      value={newPrescription.patientId} 
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Medications</Label>
                    <div className="flex space-x-2">
                      <Select
                        value={selectedMedicationTemplate}
                        onValueChange={setSelectedMedicationTemplate}
                      >
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          {medicationTemplates.map((template) => (
                            <SelectItem key={template.name} value={template.name}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleApplyTemplate}
                        disabled={!selectedMedicationTemplate}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                  
                  {newPrescription.medications.map((medication, index) => (
                    <div 
                      key={index} 
                      className="grid grid-cols-5 gap-4 p-3 rounded-md border relative"
                    >
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor={`med-name-${index}`}>Medication</Label>
                        <Input 
                          id={`med-name-${index}`} 
                          value={medication.name}
                          onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                          placeholder="Medication name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`med-dosage-${index}`}>Dosage</Label>
                        <Input 
                          id={`med-dosage-${index}`} 
                          value={medication.dosage}
                          onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                          placeholder="Dosage"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`med-frequency-${index}`}>Frequency</Label>
                        <Input 
                          id={`med-frequency-${index}`} 
                          value={medication.frequency}
                          onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                          placeholder="How often"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`med-duration-${index}`}>Duration</Label>
                        <div className="flex items-center space-x-2">
                          <Input 
                            id={`med-duration-${index}`} 
                            value={medication.duration}
                            onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                            placeholder="Duration"
                          />
                          {index > 0 && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-destructive"
                              onClick={() => handleRemoveMedication(index)}
                            >
                              &times;
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddMedication}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Another Medication
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="prescription-notes">Notes & Instructions</Label>
                  <Textarea 
                    id="prescription-notes" 
                    value={newPrescription.notes}
                    onChange={(e) => setNewPrescription({...newPrescription, notes: e.target.value})}
                    placeholder="Special instructions, warnings, or notes for the patient"
                    rows={3}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsNewPrescriptionDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreatePrescription}>
                  Create Prescription
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-lg font-medium">All Prescriptions</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search prescriptions..."
                    className="pl-8 h-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-full sm:w-36 h-10">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Medications</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrescriptions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <FileText className="h-10 w-10 mb-2" />
                        <p>No prescriptions found</p>
                        <p className="text-sm">
                          {searchQuery || statusFilter !== 'all' 
                            ? 'Try changing your search or filter' 
                            : 'Create a new prescription to get started'}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPrescriptions.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{prescription.patientName}</p>
                          <p className="text-sm text-muted-foreground">{prescription.patientId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          {formatDate(prescription.date)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-md">
                          {prescription.medications.map((med, i) => (
                            <div key={i} className={i !== 0 ? "mt-1 pt-1 border-t" : ""}>
                              <p className="text-sm font-medium">{med.name} ({med.dosage})</p>
                              <p className="text-xs text-muted-foreground">
                                {med.frequency} for {med.duration}
                              </p>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            prescription.status === 'active' 
                              ? 'default' 
                              : prescription.status === 'expired' 
                                ? 'secondary' 
                                : 'outline'
                          }
                        >
                          {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewPrescription(prescription.id)}>
                                <FileCheck className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handlePrintPrescription(prescription.id)}>
                                <Printer className="h-4 w-4 mr-2" />
                                Print
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDownloadPrescription(prescription.id)}>
                                <Download className="h-4 w-4 mr-2" />
                                Download PDF
                              </DropdownMenuItem>
                              {prescription.status === 'active' && (
                                <>
                                  <DropdownMenuItem onClick={() => handleRenewPrescription(prescription.id)}>
                                    <Clock className="h-4 w-4 mr-2" />
                                    Renew
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleCancelPrescription(prescription.id)}
                                    className="text-destructive"
                                  >
                                    Cancel Prescription
                                  </DropdownMenuItem>
                                </>
                              )}
                              {prescription.status === 'expired' && (
                                <DropdownMenuItem onClick={() => handleRenewPrescription(prescription.id)}>
                                  <Clock className="h-4 w-4 mr-2" />
                                  Renew
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredPrescriptions.length} of {prescriptions.length} prescriptions
            </div>
          </CardFooter>
        </Card>
      </div>
    </PageTransition>
  );
};

export default PrescriptionsPage;
