import React, { useState } from 'react';
import PageTransition from '@/components/ui-custom/page-transition';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { 
  Search, Filter, Plus, User, Heart, Calendar, 
  FileText, MessageSquare, Clock, ChevronRight, 
  Eye, MoreVertical, AlertCircle, CheckCircle, Download
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDate, formatTime } from '@/lib/utils';

// Mock patient data
const mockPatients = [
  {
    id: 'P1001',
    name: 'Maria Garcia',
    age: 32,
    pregnancyStatus: 'Pregnant',
    gestationalAge: 22,
    dueDate: new Date('2023-09-15'),
    phone: '(555) 123-4567',
    email: 'maria.garcia@example.com',
    lastVisit: new Date('2023-04-15'),
    nextAppointment: new Date(new Date().setDate(new Date().getDate() + 3)),
    medicalHistory: ['Hypertension', 'Gestational diabetes in previous pregnancy'],
    allergies: ['Penicillin'],
    medications: ['Prenatal vitamins'],
    avatar: 'https://randomuser.me/api/portraits/women/79.jpg'
  },
  {
    id: 'P1002',
    name: 'Jennifer Williams',
    age: 29,
    pregnancyStatus: 'Not pregnant',
    phone: '(555) 234-5678',
    email: 'jennifer.williams@example.com',
    lastVisit: new Date('2023-05-10'),
    nextAppointment: new Date(new Date()),
    medicalHistory: ['Polycystic ovary syndrome'],
    allergies: ['None'],
    medications: ['Birth control pills'],
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 'P1003',
    name: 'Sarah Johnson',
    age: 34,
    pregnancyStatus: 'Pregnant',
    gestationalAge: 30,
    dueDate: new Date('2023-07-20'),
    phone: '(555) 345-6789',
    email: 'sarah.johnson@example.com',
    lastVisit: new Date('2023-05-05'),
    nextAppointment: new Date(new Date().setDate(new Date().getDate() + 7)),
    medicalHistory: ['None'],
    allergies: ['Sulfite additives'],
    medications: ['Prenatal vitamins', 'Iron supplements'],
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
  {
    id: 'P1004',
    name: 'Emily Brown',
    age: 27,
    pregnancyStatus: 'Postpartum',
    phone: '(555) 456-7890',
    email: 'emily.brown@example.com',
    lastVisit: new Date('2023-05-12'),
    nextAppointment: new Date(new Date().setDate(new Date().getDate() + 14)),
    medicalHistory: ['Cesarean delivery (2023)'],
    allergies: ['None'],
    medications: ['Vitamin D supplements'],
    avatar: 'https://randomuser.me/api/portraits/women/9.jpg'
  },
  {
    id: 'P1005',
    name: 'Sophia Martinez',
    age: 35,
    pregnancyStatus: 'Not pregnant',
    phone: '(555) 567-8901',
    email: 'sophia.martinez@example.com',
    lastVisit: new Date('2023-05-01'),
    nextAppointment: new Date(new Date().setDate(new Date().getDate() + 30)),
    medicalHistory: ['Endometriosis'],
    allergies: ['Latex'],
    medications: ['None'],
    avatar: 'https://randomuser.me/api/portraits/women/37.jpg'
  },
  {
    id: 'P1006',
    name: 'Isabella Lopez',
    age: 31,
    pregnancyStatus: 'Not pregnant',
    phone: '(555) 678-9012',
    email: 'isabella.lopez@example.com',
    lastVisit: new Date('2023-04-28'),
    nextAppointment: null,
    medicalHistory: ['None'],
    allergies: ['None'],
    medications: ['None'],
    avatar: 'https://randomuser.me/api/portraits/women/26.jpg'
  },
  {
    id: 'P1007',
    name: 'Olivia Wilson',
    age: 28,
    pregnancyStatus: 'Pregnant',
    gestationalAge: 12,
    dueDate: new Date('2023-11-30'),
    phone: '(555) 789-0123',
    email: 'olivia.wilson@example.com',
    lastVisit: new Date('2023-05-08'),
    nextAppointment: new Date(new Date().setDate(new Date().getDate() + 21)),
    medicalHistory: ['Previous miscarriage (2022)'],
    allergies: ['None'],
    medications: ['Prenatal vitamins', 'Folic acid supplements'],
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg'
  },
  {
    id: 'P1008',
    name: 'Emma Taylor',
    age: 33,
    pregnancyStatus: 'Not pregnant',
    phone: '(555) 890-1234',
    email: 'emma.taylor@example.com',
    lastVisit: new Date(new Date().setDate(new Date().getDate() - 1)),
    nextAppointment: new Date(new Date().setMonth(new Date().getMonth() + 6)),
    medicalHistory: ['Hypothyroidism'],
    allergies: ['Ibuprofen'],
    medications: ['Levothyroxine'],
    avatar: 'https://randomuser.me/api/portraits/women/90.jpg'
  }
];

// Mock test results data
const mockTestResults = [
  {
    id: 'TR1001',
    patient: 'P1001',
    type: 'Blood Test',
    date: new Date('2023-04-15'),
    status: 'Completed',
    results: 'Normal',
    abnormalities: false,
    doctor: 'Dr. Maria Santos',
    notes: 'Hemoglobin, blood cell counts, and iron levels all within normal range.',
    documentUrl: '#'
  },
  {
    id: 'TR1002',
    patient: 'P1001',
    type: 'Ultrasound',
    date: new Date('2023-04-15'),
    status: 'Completed',
    results: 'Normal',
    abnormalities: false,
    doctor: 'Dr. Maria Santos',
    notes: 'Fetal development on track. Heart rate 150 bpm. No abnormalities detected.',
    documentUrl: '#'
  },
  {
    id: 'TR1003',
    patient: 'P1001',
    type: 'Glucose Test',
    date: new Date('2023-05-10'),
    status: 'Pending',
    results: null,
    abnormalities: null,
    doctor: 'Dr. James Wilson',
    notes: 'Test scheduled due to history of gestational diabetes in previous pregnancy.',
    documentUrl: null
  }
];

// Mock appointments data
const mockAppointments = [
  {
    id: 'A1001',
    patient: 'P1001',
    type: 'Prenatal Checkup',
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
    status: 'Scheduled',
    provider: 'Dr. Maria Santos',
    notes: 'Regular 24-week checkup',
    location: 'Clinic Room 3'
  },
  {
    id: 'A1002',
    patient: 'P1001',
    type: 'Ultrasound',
    date: new Date(new Date().setDate(new Date().getDate() + 10)),
    status: 'Scheduled',
    provider: 'Dr. James Wilson',
    notes: 'Detailed anatomy scan',
    location: 'Imaging Center'
  },
  {
    id: 'A1003',
    patient: 'P1001',
    type: 'Prenatal Checkup',
    date: new Date('2023-04-15'),
    status: 'Completed',
    provider: 'Dr. Maria Santos',
    notes: 'Regular 20-week checkup',
    location: 'Clinic Room 2'
  }
];

// Mock notes data
const mockNotes = [
  {
    id: 'N1001',
    patient: 'P1001',
    date: new Date('2023-04-15'),
    author: 'Dr. Maria Santos',
    content: 'Patient reports mild morning sickness but otherwise feeling well. Discussed proper nutrition and exercise during pregnancy. Recommended prenatal vitamins continuation.',
    type: 'Clinical Note',
    appointmentId: 'A1003'
  },
  {
    id: 'N1002',
    patient: 'P1001',
    date: new Date('2023-03-10'),
    author: 'Dr. Maria Santos',
    content: 'First prenatal visit. Confirmed pregnancy, approximately 16 weeks based on LMP. Discussed pregnancy care plan and set up regular appointment schedule.',
    type: 'Clinical Note',
    appointmentId: 'A1004'
  }
];

const PatientDetailsView: React.FC<{ patientId: string, onBack: () => void }> = ({ patientId, onBack }) => {
  const patient = mockPatients.find(p => p.id === patientId);
  const testResults = mockTestResults.filter(tr => tr.patient === patientId);
  const appointments = mockAppointments.filter(a => a.patient === patientId);
  const notes = mockNotes.filter(n => n.patient === patientId);
  
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!patient) {
    return (
      <div className="p-8 text-center">
        <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Patient Not Found</h2>
        <p className="text-muted-foreground mb-6">The patient you're looking for doesn't exist or you don't have access.</p>
        <Button onClick={onBack}>Go Back</Button>
      </div>
    );
  }
  
  const handleDownloadRecord = () => {
    toast.success('Medical record downloaded');
  };
  
  const handleSendMessage = () => {
    toast.success('Message window opened');
  };
  
  const handleAddNote = () => {
    toast.success('Note added to patient record');
  };
  
  const handleBookAppointment = () => {
    toast.success('Appointment booking window opened');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack} size="sm">
            <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
            Back to Patients
          </Button>
          <h1 className="text-2xl font-bold">{patient.name}</h1>
          {patient.pregnancyStatus === 'Pregnant' && (
            <Badge className="bg-pink-500">{patient.pregnancyStatus} - {patient.gestationalAge} weeks</Badge>
          )}
          {patient.pregnancyStatus === 'Postpartum' && (
            <Badge className="bg-purple-500">{patient.pregnancyStatus}</Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSendMessage}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Message
          </Button>
          <Button onClick={handleBookAppointment}>
            <Calendar className="h-4 w-4 mr-2" />
            Book Appointment
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center">
              <div className="h-24 w-24 rounded-full overflow-hidden mb-4">
                <img 
                  src={patient.avatar} 
                  alt={patient.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-lg font-medium">{patient.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{patient.id}</p>
              
              <div className="w-full space-y-2 mt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Age:</span>
                  <span className="font-medium">{patient.age} years</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-medium">{patient.phone}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium truncate max-w-[180px]">{patient.email}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Visit:</span>
                  <span className="font-medium">{formatDate(patient.lastVisit)}</span>
                </div>
                
                {patient.pregnancyStatus === 'Pregnant' && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Due Date:</span>
                      <span className="font-medium">{formatDate(patient.dueDate)}</span>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Pregnancy Progress:</span>
                        <span className="font-medium">{patient.gestationalAge} weeks</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div 
                          className="bg-pink-500 h-2.5 rounded-full" 
                          style={{ width: `${(patient.gestationalAge / 40) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="w-full border-t mt-6 pt-4">
                <h4 className="font-medium mb-2">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" onClick={handleSendMessage}>
                    Message
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleBookAppointment}>
                    Appointment
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleAddNote}>
                    Add Note
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownloadRecord}>
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="md:col-span-3 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="results">Test Results</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4 pt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Medical History</CardTitle>
                </CardHeader>
                <CardContent>
                  {patient.medicalHistory.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {patient.medicalHistory.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No significant medical history</p>
                  )}
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Allergies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {patient.allergies.some(a => a !== 'None') ? (
                      <ul className="list-disc pl-5 space-y-1">
                        {patient.allergies.map((allergy, index) => (
                          <li key={index} className={allergy !== 'None' ? 'text-red-600' : ''}>
                            {allergy}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">No known allergies</p>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Medications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {patient.medications.some(m => m !== 'None') ? (
                      <ul className="list-disc pl-5 space-y-1">
                        {patient.medications.map((medication, index) => (
                          <li key={index}>{medication}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">No current medications</p>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              {patient.nextAppointment && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Upcoming Appointment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">
                          {appointments.length > 0 
                            ? appointments.find(a => a.date > new Date())?.type || 'Appointment'
                            : 'Appointment'
                          }
                        </p>
                        <p className="text-muted-foreground">
                          {formatDate(patient.nextAppointment)} at {formatTime(patient.nextAppointment)}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setActiveTab('appointments')}>
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {patient.pregnancyStatus === 'Pregnant' && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Pregnancy Milestones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">First Trimester</p>
                          <p className="text-xs text-muted-foreground">Weeks 1-13</p>
                        </div>
                        <Badge variant={patient.gestationalAge <= 13 ? 'default' : 'outline'}>
                          {patient.gestationalAge <= 13 ? 'Current' : 'Completed'}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Second Trimester</p>
                          <p className="text-xs text-muted-foreground">Weeks 14-26</p>
                        </div>
                        <Badge 
                          variant={
                            patient.gestationalAge > 13 && patient.gestationalAge <= 26 
                              ? 'default' 
                              : patient.gestationalAge > 26 
                                ? 'outline' 
                                : 'secondary'
                          }
                        >
                          {patient.gestationalAge > 13 && patient.gestationalAge <= 26 
                            ? 'Current' 
                            : patient.gestationalAge > 26 
                              ? 'Completed' 
                              : 'Upcoming'
                          }
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Third Trimester</p>
                          <p className="text-xs text-muted-foreground">Weeks 27-40</p>
                        </div>
                        <Badge 
                          variant={
                            patient.gestationalAge > 26 
                              ? 'default' 
                              : 'secondary'
                          }
                        >
                          {patient.gestationalAge > 26 ? 'Current' : 'Upcoming'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="appointments" className="space-y-4 pt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Appointment History</h3>
                <Button onClick={handleBookAppointment} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Appointment
                </Button>
              </div>
              
              {appointments.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.sort((a, b) => b.date.getTime() - a.date.getTime()).map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>
                          <div className="font-medium">{formatDate(appointment.date)}</div>
                          <div className="text-xs text-muted-foreground">{formatTime(appointment.date)}</div>
                        </TableCell>
                        <TableCell>{appointment.type}</TableCell>
                        <TableCell>{appointment.provider}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              appointment.status === 'Completed' 
                                ? 'outline' 
                                : appointment.status === 'Scheduled' 
                                  ? 'default' 
                                  : 'secondary'
                            }
                          >
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">{appointment.notes}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-1">No Appointments</h3>
                    <p className="text-sm text-muted-foreground mb-4">This patient has no scheduled appointments.</p>
                    <Button onClick={handleBookAppointment}>
                      Book New Appointment
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="results" className="space-y-4 pt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Test Results</h3>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload New Result
                </Button>
              </div>
              
              {testResults.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Results</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {testResults.sort((a, b) => b.date.getTime() - a.date.getTime()).map((result) => (
                      <TableRow key={result.id}>
                        <TableCell>
                          <div className="font-medium">{formatDate(result.date)}</div>
                        </TableCell>
                        <TableCell>{result.type}</TableCell>
                        <TableCell>
                          {result.results ? (
                            <div className="flex items-center">
                              {result.abnormalities ? (
                                <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                              ) : (
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              )}
                              {result.results}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">Pending</span>
                          )}
                        </TableCell>
                        <TableCell>{result.doctor}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              result.status === 'Completed' 
                                ? 'outline' 
                                : 'secondary'
                            }
                          >
                            {result.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            disabled={!result.documentUrl}
                            onClick={handleDownloadRecord}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-1">No Test Results</h3>
                    <p className="text-sm text-muted-foreground mb-4">This patient has no test results on file.</p>
                    <Button variant="outline">
                      Upload Test Result
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="notes" className="space-y-4 pt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Clinical Notes</h3>
                <Button size="sm" onClick={handleAddNote}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </div>
              
              {notes.length > 0 ? (
                <div className="space-y-4">
                  {notes.sort((a, b) => b.date.getTime() - a.date.getTime()).map((note) => (
                    <Card key={note.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{note.type}</CardTitle>
                            <CardDescription>
                              {formatDate(note.date)} by {note.author}
                            </CardDescription>
                          </div>
                          <Badge variant="secondary">{note.type}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="whitespace-pre-line">{note.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-1">No Clinical Notes</h3>
                    <p className="text-sm text-muted-foreground mb-4">This patient has no clinical notes on file.</p>
                    <Button onClick={handleAddNote}>
                      Add First Note
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const PatientsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddPatientDialogOpen, setIsAddPatientDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const patientId = searchParams.get('id');
    if (patientId) {
      setSelectedPatient(patientId);
    }
  }, [location.search]);
  
  const filteredPatients = mockPatients
    .filter(patient => 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(patient => 
      statusFilter === 'all' ||
      (statusFilter === 'pregnant' && patient.pregnancyStatus === 'Pregnant') ||
      (statusFilter === 'not-pregnant' && patient.pregnancyStatus === 'Not pregnant') ||
      (statusFilter === 'postpartum' && patient.pregnancyStatus === 'Postpartum')
    );
  
  const handleAddPatient = () => {
    setIsAddPatientDialogOpen(false);
    toast.success('Patient added successfully');
  };
  
  const handleViewPatient = (id: string) => {
    setSelectedPatient(id);
    navigate(`/dashboard/patients?id=${id}`, { replace: true });
  };
  
  const handleBackToList = () => {
    setSelectedPatient(null);
    navigate('/dashboard/patients', { replace: true });
  };
  
  if (selectedPatient) {
    return (
      <PageTransition>
        <Helmet>
          <title>Patient Details | Santa Matilda</title>
        </Helmet>
        <PatientDetailsView patientId={selectedPatient} onBack={handleBackToList} />
      </PageTransition>
    );
  }
  
  return (
    <PageTransition>
      <Helmet>
        <title>Patients | Santa Matilda</title>
        <meta name="description" content="Manage and view patient records at Santa Matilda Women's Health Clinic" />
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Patients</h1>
            <p className="text-muted-foreground">Manage and view patient records</p>
          </div>
          
          <Button onClick={() => setIsAddPatientDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Patient
          </Button>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle className="text-lg font-medium">Patient Records</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search patients..."
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
                    <SelectItem value="all">All Patients</SelectItem>
                    <SelectItem value="pregnant">Pregnant</SelectItem>
                    <SelectItem value="not-pregnant">Not Pregnant</SelectItem>
                    <SelectItem value="postpartum">Postpartum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredPatients.length === 0 ? (
              <div className="text-center py-10">
                <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No patients found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria' 
                    : 'Add your first patient to get started'}
                </p>
                <Button onClick={() => setIsAddPatientDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Patient
                </Button>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Next Appointment</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                              <img 
                                src={patient.avatar} 
                                alt={patient.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{patient.name}</div>
                              <div className="text-xs text-muted-foreground">{patient.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {patient.pregnancyStatus === 'Pregnant' ? (
                            <Badge className="bg-pink-500">
                              {patient.pregnancyStatus} ({patient.gestationalAge} weeks)
                            </Badge>
                          ) : (
                            <Badge variant={patient.pregnancyStatus === 'Postpartum' ? 'secondary' : 'outline'}>
                              {patient.pregnancyStatus}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>{formatDate(patient.lastVisit)}</TableCell>
                        <TableCell>
                          {patient.nextAppointment ? (
                            <div>
                              <div className="font-medium">{formatDate(patient.nextAppointment)}</div>
                              <div className="text-xs text-muted-foreground">{formatTime(patient.nextAppointment)}</div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">None scheduled</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end items-center">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="mr-2"
                              onClick={() => handleViewPatient(patient.id)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => navigate(`/dashboard/messages?patient=${patient.id}`)}>
                                  Send Message
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate(`/dashboard/appointments?patient=${patient.id}`)}>
                                  Book Appointment
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toast.success('Patient record downloaded')}>
                                  Download Records
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredPatients.length} of {mockPatients.length} patients
            </div>
            {filteredPatients.length > 0 && (
              <Button variant="outline" size="sm" onClick={() => toast.success('Patients exported successfully')}>
                Export List
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
      
      <Dialog open={isAddPatientDialogOpen} onOpenChange={setIsAddPatientDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Patient</DialogTitle>
            <DialogDescription>
              Enter the details for the new patient record.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Patient's full name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="(555) 123-4567" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Pregnancy Status</Label>
                <Select defaultValue="not-pregnant">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not-pregnant">Not Pregnant</SelectItem>
                    <SelectItem value="pregnant">Pregnant</SelectItem>
                    <SelectItem value="postpartum">Postpartum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Input id="notes" placeholder="Any relevant information" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPatientDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddPatient}>Add Patient</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
};

export default PatientsPage;
