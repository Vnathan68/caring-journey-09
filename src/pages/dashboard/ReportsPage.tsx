
import React, { useState } from 'react';
import PageTransition from '@/components/ui-custom/page-transition';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, LineChart, PieChart, CartesianGrid, XAxis, YAxis, 
  Bar, Tooltip as RechartsTooltip, Legend, Line, Pie, ResponsiveContainer,
  Cell
} from 'recharts';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/utils';
import { 
  BarChart2, LineChart as LineChartIcon, PieChart as PieChartIcon, 
  Download, FileText, Calendar, Filter, 
  RefreshCw, Printer, Share2, ArrowUpRight
} from 'lucide-react';

// Mock data for charts
const revenueData = [
  { month: 'Jan', obstetrics: 42000, gynecology: 28000, fertility: 15000 },
  { month: 'Feb', obstetrics: 45000, gynecology: 30000, fertility: 18000 },
  { month: 'Mar', obstetrics: 48000, gynecology: 27000, fertility: 20000 },
  { month: 'Apr', obstetrics: 51000, gynecology: 31000, fertility: 22000 },
  { month: 'May', obstetrics: 53000, gynecology: 33000, fertility: 25000 },
  { month: 'Jun', obstetrics: 55000, gynecology: 35000, fertility: 23000 },
];

const patientVolumeData = [
  { month: 'Jan', newPatients: 75, returningPatients: 320 },
  { month: 'Feb', newPatients: 85, returningPatients: 340 },
  { month: 'Mar', newPatients: 90, returningPatients: 350 },
  { month: 'Apr', newPatients: 95, returningPatients: 370 },
  { month: 'May', newPatients: 100, returningPatients: 390 },
  { month: 'Jun', newPatients: 110, returningPatients: 410 },
];

const appointmentTypeData = [
  { name: 'Prenatal Checkup', value: 45 },
  { name: 'Postnatal Care', value: 15 },
  { name: 'Gynecological Exam', value: 25 },
  { name: 'Fertility Consult', value: 10 },
  { name: 'Ultrasound', value: 20 },
  { name: 'Other', value: 5 },
];

const operationalMetricsData = [
  { month: 'Jan', avgWaitTime: 12, noShowRate: 8, patientSatisfaction: 92 },
  { month: 'Feb', avgWaitTime: 14, noShowRate: 7.5, patientSatisfaction: 91 },
  { month: 'Mar', avgWaitTime: 11, noShowRate: 7, patientSatisfaction: 93 },
  { month: 'Apr', avgWaitTime: 10, noShowRate: 6.5, patientSatisfaction: 94 },
  { month: 'May', avgWaitTime: 9, noShowRate: 6, patientSatisfaction: 95 },
  { month: 'Jun', avgWaitTime: 8, noShowRate: 5.5, patientSatisfaction: 96 },
];

// Mock data for pregnancy metrics
const pregnancyOutcomesData = [
  { name: 'Vaginal Delivery', value: 68 },
  { name: 'C-Section', value: 27 },
  { name: 'Assisted Delivery', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Report summaries
const reportSummaries = [
  {
    id: 'rep-1',
    title: 'Monthly Revenue Report',
    category: 'financial',
    date: 'June 2023',
    downloadUrl: '#'
  },
  {
    id: 'rep-2',
    title: 'Patient Satisfaction Survey',
    category: 'patient',
    date: 'Q2 2023',
    downloadUrl: '#'
  },
  {
    id: 'rep-3',
    title: 'Clinic Efficiency Metrics',
    category: 'operational',
    date: 'May 2023',
    downloadUrl: '#'
  },
  {
    id: 'rep-4',
    title: 'Pregnancy Outcomes Analysis',
    category: 'clinical',
    date: 'Q1-Q2 2023',
    downloadUrl: '#'
  },
  {
    id: 'rep-5',
    title: 'Staff Performance Review',
    category: 'staff',
    date: 'Q2 2023',
    downloadUrl: '#'
  }
];

const ReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('financial');
  const [timeRange, setTimeRange] = useState('6m');
  const [reportType, setReportType] = useState('all');
  
  const handleDownloadReport = (reportId: string) => {
    toast.success('Report download started');
  };
  
  const handleExportChart = () => {
    toast.success('Chart exported as PNG');
  };
  
  const handlePrintReport = () => {
    toast.success('Sending to printer...');
  };
  
  const handleRefreshData = () => {
    toast.success('Data refreshed');
  };
  
  return (
    <PageTransition>
      <Helmet>
        <title>Reports | Santa Matilda</title>
        <meta name="description" content="View and analyze clinic data and reports at Santa Matilda Women's Health Clinic" />
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Reports & Analytics</h1>
            <p className="text-muted-foreground">View and analyze data to make informed decisions</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleRefreshData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrintReport}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button size="sm" onClick={handleExportChart}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full md:w-48">
            <p className="text-sm font-medium mb-2">Time Range</p>
            <Select
              defaultValue="6m"
              value={timeRange}
              onValueChange={setTimeRange}
            >
              <SelectTrigger className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Last Month</SelectItem>
                <SelectItem value="3m">Last 3 Months</SelectItem>
                <SelectItem value="6m">Last 6 Months</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-48">
            <p className="text-sm font-medium mb-2">Report Type</p>
            <Select
              defaultValue="all"
              value={reportType}
              onValueChange={setReportType}
            >
              <SelectTrigger className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reports</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="patient">Patient</SelectItem>
                <SelectItem value="operational">Operational</SelectItem>
                <SelectItem value="clinical">Clinical</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="financial" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="financial" className="flex items-center">
              <BarChart2 className="h-4 w-4 mr-2" />
              Financial
            </TabsTrigger>
            <TabsTrigger value="patient" className="flex items-center">
              <LineChartIcon className="h-4 w-4 mr-2" />
              Patient
            </TabsTrigger>
            <TabsTrigger value="operational" className="flex items-center">
              <PieChartIcon className="h-4 w-4 mr-2" />
              Operational
            </TabsTrigger>
            <TabsTrigger value="clinical" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Clinical
            </TabsTrigger>
          </TabsList>
          
          {/* Financial Reports Tab */}
          <TabsContent value="financial" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Total Revenue (YTD)</CardTitle>
                  <CardDescription>Year-to-date revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{formatCurrency(1250000)}</div>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +15% from last year
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Average Revenue per Visit</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{formatCurrency(275)}</div>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +5% from previous month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Outstanding Invoices</CardTitle>
                  <CardDescription>Unpaid patient bills</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{formatCurrency(75450)}</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Across 342 patients
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Revenue by Service Type</CardTitle>
                <CardDescription>Monthly revenue breakdown by service type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                      <RechartsTooltip formatter={(value) => formatCurrency(value as number)} />
                      <Legend />
                      <Bar dataKey="obstetrics" name="Obstetrics" fill="#0088FE" />
                      <Bar dataKey="gynecology" name="Gynecology" fill="#00C49F" />
                      <Bar dataKey="fertility" name="Fertility" fill="#FFBB28" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method Distribution</CardTitle>
                  <CardDescription>Breakdown of payment methods used</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Insurance', value: 65 },
                            { name: 'Credit Card', value: 20 },
                            { name: 'Debit Card', value: 10 },
                            { name: 'Cash', value: 5 }
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {appointmentTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Insurance Claim Status</CardTitle>
                  <CardDescription>Status of submitted insurance claims</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Paid', value: 72 },
                            { name: 'Pending', value: 20 },
                            { name: 'Denied', value: 5 },
                            { name: 'In Review', value: 3 }
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {appointmentTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Patient Reports Tab */}
          <TabsContent value="patient" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Total Patients</CardTitle>
                  <CardDescription>Active patient count</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2,485</div>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +8% from last quarter
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">New Patients</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">110</div>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +10% from previous month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Patient Satisfaction</CardTitle>
                  <CardDescription>Overall rating</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">4.8/5.0</div>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +0.2 from last quarter
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Patient Volume</CardTitle>
                <CardDescription>New vs. returning patients by month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={patientVolumeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="newPatients" name="New Patients" stackId="a" fill="#8884d8" />
                      <Bar dataKey="returningPatients" name="Returning Patients" stackId="a" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Types</CardTitle>
                  <CardDescription>Distribution of appointment types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={appointmentTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {appointmentTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Patient Age Distribution</CardTitle>
                  <CardDescription>Breakdown of patients by age group</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={[
                          { age: '18-24', count: 320 },
                          { age: '25-34', count: 845 },
                          { age: '35-44', count: 740 },
                          { age: '45-54', count: 390 },
                          { age: '55+', count: 190 }
                        ]} 
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="age" type="category" />
                        <RechartsTooltip />
                        <Bar dataKey="count" name="Patients" fill="#8884d8" barSize={30} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Operational Reports Tab */}
          <TabsContent value="operational" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Average Wait Time</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">8 mins</div>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    -12% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">No-Show Rate</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">5.5%</div>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    -1.5% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Utilization Rate</CardTitle>
                  <CardDescription>Room/Resource usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">92%</div>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +3% from last quarter
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Operational Metrics Trend</CardTitle>
                <CardDescription>Wait times, no-show rates, and patient satisfaction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={operationalMetricsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                      <RechartsTooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="avgWaitTime" name="Avg. Wait Time (mins)" stroke="#8884d8" />
                      <Line yAxisId="left" type="monotone" dataKey="noShowRate" name="No-Show Rate (%)" stroke="#ff7300" />
                      <Line yAxisId="right" type="monotone" dataKey="patientSatisfaction" name="Patient Satisfaction (%)" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Status</CardTitle>
                  <CardDescription>Current month appointment breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Completed', value: 320 },
                            { name: 'Scheduled', value: 210 },
                            { name: 'Cancelled', value: 45 },
                            { name: 'No-Show', value: 35 },
                            { name: 'Rescheduled', value: 90 }
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {appointmentTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Staff Productivity</CardTitle>
                  <CardDescription>Patients seen per provider per day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={[
                          { name: 'Dr. Santos', patients: 12 },
                          { name: 'Dr. Johnson', patients: 14 },
                          { name: 'Dr. Wilson', patients: 11 },
                          { name: 'Dr. Parker', patients: 13 },
                          { name: 'Dr. Lee', patients: 10 }
                        ]} 
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <RechartsTooltip />
                        <Bar dataKey="patients" name="Patients per Day" fill="#8884d8" barSize={30} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Clinical Reports Tab */}
          <TabsContent value="clinical" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Active Pregnancies</CardTitle>
                  <CardDescription>Currently monitored</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">348</div>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +5% from last quarter
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Deliveries (YTD)</CardTitle>
                  <CardDescription>Year-to-date</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">524</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    On track for 1,050 annual
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Patient Complications</CardTitle>
                  <CardDescription>Rate for this year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2.3%</div>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    -0.5% from last year
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pregnancy Outcomes</CardTitle>
                  <CardDescription>Distribution of delivery types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pregnancyOutcomesData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pregnancyOutcomesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Trimester Distribution</CardTitle>
                  <CardDescription>Current active pregnancies by trimester</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={[
                          { name: 'First Trimester', count: 120 },
                          { name: 'Second Trimester', count: 135 },
                          { name: 'Third Trimester', count: 93 }
                        ]} 
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip />
                        <Bar dataKey="count" name="Patients" fill="#FF9CAD" barSize={60} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Gynecological Conditions</CardTitle>
                <CardDescription>Most common diagnoses this year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={[
                        { name: 'PCOS', count: 187 },
                        { name: 'Endometriosis', count: 145 },
                        { name: 'Fibroids', count: 124 },
                        { name: 'Ovarian Cysts', count: 98 },
                        { name: 'Abnormal Bleeding', count: 78 },
                        { name: 'Menopause', count: 67 },
                        { name: 'Pelvic Pain', count: 62 }
                      ]} 
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <RechartsTooltip />
                      <Bar dataKey="count" name="Patients" fill="#8884d8" barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Download generated reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b bg-slate-50 dark:bg-slate-800">
                      <th className="h-12 px-4 text-left align-middle font-medium">Report Name</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Category</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportSummaries
                      .filter(report => reportType === 'all' || report.category === reportType)
                      .map((report) => (
                        <tr key={report.id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-800">
                          <td className="p-4 align-middle font-medium">{report.title}</td>
                          <td className="p-4 align-middle capitalize">{report.category}</td>
                          <td className="p-4 align-middle">{report.date}</td>
                          <td className="p-4 align-middle text-right">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDownloadReport(report.id)}
                            >
                              <Download className="h-3 w-3 mr-2" />
                              Download
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
};

export default ReportsPage;
