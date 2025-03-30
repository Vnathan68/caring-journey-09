
import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  User,
  Search
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Mock data for medical records
const mockLabResults = [
  {
    id: 'lab-1',
    name: 'Complete Blood Count',
    category: 'Blood Test',
    date: new Date('2023-05-15'),
    provider: 'Dr. Maria Santos',
    status: 'completed',
    result: {
      hemoglobin: { value: '12.5 g/dL', range: '12.0-15.5 g/dL', flagged: false },
      hematocrit: { value: '38%', range: '36-46%', flagged: false },
      platelets: { value: '290,000/µL', range: '150,000-450,000/µL', flagged: false },
      wbc: { value: '9,500/µL', range: '4,500-11,000/µL', flagged: false },
    }
  },
  {
    id: 'lab-2',
    name: 'Glucose Tolerance Test',
    category: 'Blood Test',
    date: new Date('2023-05-20'),
    provider: 'Dr. James Wilson',
    status: 'pending',
    result: null
  },
  {
    id: 'lab-3',
    name: 'Iron Panel',
    category: 'Blood Test',
    date: new Date('2023-04-10'),
    provider: 'Dr. Maria Santos',
    status: 'completed',
    result: {
      serum_iron: { value: '65 µg/dL', range: '60-170 µg/dL', flagged: false },
      ferritin: { value: '15 ng/mL', range: '10-120 ng/mL', flagged: true, note: 'Low. Consider iron supplementation.' },
      tibc: { value: '410 µg/dL', range: '250-450 µg/dL', flagged: false },
    }
  },
];

const mockImagingResults = [
  {
    id: 'img-1',
    name: 'Ultrasound - 20 Weeks',
    category: 'Imaging',
    date: new Date('2023-05-10'),
    provider: 'Dr. Maria Santos',
    status: 'completed',
    images: 3,
    findings: 'Normal fetal development consistent with gestational age. Fetal weight estimated at 350g (50th percentile). No abnormalities detected.'
  },
  {
    id: 'img-2',
    name: 'Ultrasound - 12 Weeks',
    category: 'Imaging',
    date: new Date('2023-03-15'),
    provider: 'Dr. James Wilson',
    status: 'completed',
    images: 2,
    findings: 'Viable intrauterine pregnancy. Crown-rump length consistent with dates. Normal fetal heart rate.'
  },
];

const mockPrescriptions = [
  {
    id: 'rx-1',
    name: 'Prenatal Vitamins',
    category: 'Medication',
    date: new Date('2023-04-01'),
    provider: 'Dr. Maria Santos',
    status: 'active',
    dosage: '1 tablet daily',
    duration: 'Throughout pregnancy',
    refills: 5
  },
  {
    id: 'rx-2',
    name: 'Iron Supplement',
    category: 'Medication',
    date: new Date('2023-05-15'),
    provider: 'Dr. Maria Santos',
    status: 'active',
    dosage: '1 tablet daily with food',
    duration: '3 months',
    refills: 2
  },
];

const mockVisitNotes = [
  {
    id: 'visit-1',
    name: 'Prenatal Visit - Week 22',
    category: 'Visit Notes',
    date: new Date('2023-05-15'),
    provider: 'Dr. Maria Santos',
    status: 'completed',
    summary: 'Routine prenatal visit. Patient reports mild back pain but otherwise feeling well. Fetal heart rate 145 bpm. Blood pressure 110/70. Weight gain appropriate.',
    vitals: {
      bp: '110/70',
      hr: '78',
      temp: '98.6°F',
      weight: '145 lbs',
      fundal_height: '22 cm'
    }
  },
  {
    id: 'visit-2',
    name: 'Prenatal Visit - Week 18',
    category: 'Visit Notes',
    date: new Date('2023-04-20'),
    provider: 'Dr. Maria Santos',
    status: 'completed',
    summary: 'Routine prenatal visit. Patient feeling well with no concerns. Fetal heart rate 150 bpm. Blood pressure 115/75. Weight gain appropriate.',
    vitals: {
      bp: '115/75',
      hr: '82',
      temp: '98.4°F',
      weight: '142 lbs',
      fundal_height: '18 cm'
    }
  },
];

const MedicalRecords: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null);
  
  const toggleRecordExpansion = (id: string) => {
    setExpandedRecord(expandedRecord === id ? null : id);
  };
  
  const handleDownload = (id: string, name: string) => {
    toast({
      title: "Download Started",
      description: `${name} is being downloaded as a PDF.`,
    });
  };
  
  const handleShare = (id: string) => {
    toast({
      title: "Share Medical Record",
      description: "A secure sharing link has been created and copied to your clipboard.",
    });
  };
  
  const filterRecords = (records: any[]) => {
    return records.filter(record => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.provider.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = categoryFilter === 'all' || record.category.toLowerCase() === categoryFilter.toLowerCase();
      
      // Date filter
      let matchesDate = true;
      const currentDate = new Date();
      const recordDate = new Date(record.date);
      
      if (dateFilter === 'last30') {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(currentDate.getDate() - 30);
        matchesDate = recordDate >= thirtyDaysAgo;
      } else if (dateFilter === 'last90') {
        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(currentDate.getDate() - 90);
        matchesDate = recordDate >= ninetyDaysAgo;
      } else if (dateFilter === 'last365') {
        const yearAgo = new Date();
        yearAgo.setFullYear(currentDate.getFullYear() - 1);
        matchesDate = recordDate >= yearAgo;
      }
      
      return matchesSearch && matchesCategory && matchesDate;
    });
  };
  
  const filteredLabResults = filterRecords(mockLabResults);
  const filteredImagingResults = filterRecords(mockImagingResults);
  const filteredPrescriptions = filterRecords(mockPrescriptions);
  const filteredVisitNotes = filterRecords(mockVisitNotes);
  
  const renderRecordRow = (record: any) => (
    <React.Fragment key={record.id}>
      <TableRow>
        <TableCell>
          <div className="font-medium">{record.name}</div>
          <div className="text-sm text-muted-foreground">{record.category}</div>
        </TableCell>
        <TableCell>
          {record.date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </TableCell>
        <TableCell>{record.provider}</TableCell>
        <TableCell>
          <Badge 
            variant={
              record.status === 'completed' ? 'secondary' : 
              record.status === 'pending' ? 'outline' : 
              record.status === 'active' ? 'default' : 'outline'
            }
          >
            {record.status}
          </Badge>
        </TableCell>
        <TableCell>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => toggleRecordExpansion(record.id)}>
              {expandedRecord === record.id ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" /> Hide
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" /> View
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleDownload(record.id, record.name)}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
      {expandedRecord === record.id && (
        <TableRow>
          <TableCell colSpan={5}>
            <div className="bg-slate-50 p-4 rounded-md my-2">
              {record.result && (
                <div className="space-y-4">
                  <h4 className="font-medium">Test Results</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Test</TableHead>
                        <TableHead>Result</TableHead>
                        <TableHead>Reference Range</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(record.result).map(([key, value]: [string, any]) => (
                        <TableRow key={key}>
                          <TableCell className="font-medium capitalize">{key.replace('_', ' ')}</TableCell>
                          <TableCell>{value.value}</TableCell>
                          <TableCell>{value.range}</TableCell>
                          <TableCell>
                            {value.flagged ? (
                              <Badge variant="destructive">Abnormal</Badge>
                            ) : (
                              <Badge variant="secondary">Normal</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {Object.entries(record.result).some(([_, value]: [string, any]) => value.note) && (
                    <div className="mt-4">
                      <h4 className="font-medium">Notes</h4>
                      <div className="mt-2 text-sm">
                        {Object.entries(record.result)
                          .filter(([_, value]: [string, any]) => value.note)
                          .map(([key, value]: [string, any]) => (
                            <p key={key} className="mb-1"><span className="capitalize font-medium">{key.replace('_', ' ')}:</span> {value.note}</p>
                          ))
                        }
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {record.findings && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Findings</h4>
                    {record.images && (
                      <Badge variant="outline">{record.images} Images</Badge>
                    )}
                  </div>
                  <p className="text-sm">{record.findings}</p>
                </div>
              )}
              
              {record.dosage && (
                <div className="space-y-4">
                  <h4 className="font-medium">Prescription Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Dosage</p>
                      <p>{record.dosage}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p>{record.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Refills</p>
                      <p>{record.refills}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {record.summary && (
                <div className="space-y-4">
                  <h4 className="font-medium">Visit Summary</h4>
                  <p className="text-sm">{record.summary}</p>
                  
                  {record.vitals && (
                    <div className="mt-4">
                      <h4 className="font-medium">Vitals</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-2">
                        <div className="bg-white p-3 rounded-md border">
                          <p className="text-xs text-muted-foreground">Blood Pressure</p>
                          <p className="font-medium">{record.vitals.bp}</p>
                        </div>
                        <div className="bg-white p-3 rounded-md border">
                          <p className="text-xs text-muted-foreground">Heart Rate</p>
                          <p className="font-medium">{record.vitals.hr} bpm</p>
                        </div>
                        <div className="bg-white p-3 rounded-md border">
                          <p className="text-xs text-muted-foreground">Temperature</p>
                          <p className="font-medium">{record.vitals.temp}</p>
                        </div>
                        <div className="bg-white p-3 rounded-md border">
                          <p className="text-xs text-muted-foreground">Weight</p>
                          <p className="font-medium">{record.vitals.weight}</p>
                        </div>
                        {record.vitals.fundal_height && (
                          <div className="bg-white p-3 rounded-md border">
                            <p className="text-xs text-muted-foreground">Fundal Height</p>
                            <p className="font-medium">{record.vitals.fundal_height}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm" onClick={() => handleShare(record.id)}>
                  Share Record
                </Button>
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle>Medical Records</CardTitle>
        <CardDescription>
          View and manage your health records, test results, and medical documents
        </CardDescription>
        
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search records or providers..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Blood Test">Blood Tests</SelectItem>
                <SelectItem value="Imaging">Imaging</SelectItem>
                <SelectItem value="Medication">Medications</SelectItem>
                <SelectItem value="Visit Notes">Visit Notes</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="last30">Last 30 Days</SelectItem>
                <SelectItem value="last90">Last 90 Days</SelectItem>
                <SelectItem value="last365">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Records</TabsTrigger>
            <TabsTrigger value="lab">Lab Results</TabsTrigger>
            <TabsTrigger value="imaging">Imaging</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="visits">Visit Notes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-8">
            {/* Lab Results Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Lab Results</h3>
                <Button variant="outline" size="sm">Export All</Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLabResults.length > 0 ? (
                      filteredLabResults.map(record => renderRecordRow(record))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          No lab results found. Try adjusting your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            {/* Imaging Results Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Imaging Results</h3>
                <Button variant="outline" size="sm">Export All</Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredImagingResults.length > 0 ? (
                      filteredImagingResults.map(record => renderRecordRow(record))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          No imaging results found. Try adjusting your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            {/* Prescriptions Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Prescriptions</h3>
                <Button variant="outline" size="sm">Export All</Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPrescriptions.length > 0 ? (
                      filteredPrescriptions.map(record => renderRecordRow(record))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          No prescriptions found. Try adjusting your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            {/* Visit Notes Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Visit Notes</h3>
                <Button variant="outline" size="sm">Export All</Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVisitNotes.length > 0 ? (
                      filteredVisitNotes.map(record => renderRecordRow(record))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          No visit notes found. Try adjusting your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="lab">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLabResults.length > 0 ? (
                    filteredLabResults.map(record => renderRecordRow(record))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No lab results found. Try adjusting your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="imaging">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredImagingResults.length > 0 ? (
                    filteredImagingResults.map(record => renderRecordRow(record))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No imaging results found. Try adjusting your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="prescriptions">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrescriptions.length > 0 ? (
                    filteredPrescriptions.map(record => renderRecordRow(record))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No prescriptions found. Try adjusting your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="visits">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVisitNotes.length > 0 ? (
                    filteredVisitNotes.map(record => renderRecordRow(record))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No visit notes found. Try adjusting your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MedicalRecords;
