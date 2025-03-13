
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Download, FileText, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatDate } from '@/lib/utils';

// Mock data for invoices
const mockInvoices = [
  {
    id: 'INV-2023-001',
    date: new Date(2023, 4, 15),
    service: 'Prenatal Checkup',
    doctor: 'Dr. Maria Santos',
    amount: 1500,
    status: 'paid',
    insuranceCovered: 1200,
    patientResponsibility: 300,
  },
  {
    id: 'INV-2023-002',
    date: new Date(2023, 3, 30),
    service: 'Ultrasound Scan',
    doctor: 'Dr. Anna Lee',
    amount: 2500,
    status: 'paid',
    insuranceCovered: 2000,
    patientResponsibility: 500,
  },
  {
    id: 'INV-2023-003',
    date: new Date(2023, 5, 5),
    service: 'Laboratory Tests',
    doctor: 'Dr. Maria Santos',
    amount: 3200,
    status: 'pending',
    insuranceCovered: 2800,
    patientResponsibility: 400,
  },
  {
    id: 'INV-2023-004',
    date: new Date(2023, 5, 20),
    service: 'Prenatal Vitamins',
    doctor: 'Dr. James Rodriguez',
    amount: 800,
    status: 'pending',
    insuranceCovered: 500,
    patientResponsibility: 300,
  },
];

// Mock data for insurance
const insuranceInfo = {
  provider: 'PhilHealth',
  memberID: 'PH123456789',
  planType: 'Maternal Care Package',
  coverageStart: new Date(2023, 0, 1),
  coverageEnd: new Date(2023, 11, 31),
  deductible: 5000,
  deductibleMet: 3700,
  coInsurance: '20%',
  status: 'Active',
};

type InvoiceStatus = 'all' | 'paid' | 'pending';

const BillingOverview: React.FC = () => {
  const [filter, setFilter] = useState<InvoiceStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInvoices = mockInvoices.filter(invoice => {
    // Apply status filter
    if (filter !== 'all' && invoice.status !== filter) return false;
    
    // Apply search filter
    if (searchQuery && 
        !invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !invoice.service.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const totalDue = filteredInvoices
    .filter(inv => inv.status === 'pending')
    .reduce((sum, inv) => sum + inv.patientResponsibility, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Current Balance</CardTitle>
            <CardDescription>Amount due for payment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-clinic-600">₱{totalDue.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mt-1">
              From {mockInvoices.filter(inv => inv.status === 'pending').length} pending invoices
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-clinic-600 hover:bg-clinic-700 text-white">
              Pay Now
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Insurance Coverage</CardTitle>
            <CardDescription>PhilHealth status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Deductible</span>
                <span className="font-medium">
                  ₱{insuranceInfo.deductibleMet.toLocaleString()} / ₱{insuranceInfo.deductible.toLocaleString()}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-clinic-600" 
                  style={{ width: `${(insuranceInfo.deductibleMet / insuranceInfo.deductible) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                  {insuranceInfo.status}
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Insurance Details</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Payment Methods</CardTitle>
            <CardDescription>Manage your payment options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 p-3 border rounded-md">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">**** **** **** 5678</p>
                <p className="text-xs text-muted-foreground">Expires 12/25</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Add Payment Method</Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <Tabs defaultValue="invoices">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <TabsList>
                <TabsTrigger value="invoices">Invoices</TabsTrigger>
                <TabsTrigger value="insurance">Insurance</TabsTrigger>
              </TabsList>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search invoices..."
                    className="pl-8 w-full sm:w-[200px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select
                  value={filter}
                  onValueChange={(value) => setFilter(value as InvoiceStatus)}
                >
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Invoices</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="invoices" className="mt-6">
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-slate-50">
                      <th className="py-3 px-4 text-left font-medium">Invoice</th>
                      <th className="py-3 px-4 text-left font-medium">Date</th>
                      <th className="py-3 px-4 text-left font-medium">Service</th>
                      <th className="py-3 px-4 text-left font-medium">Total</th>
                      <th className="py-3 px-4 text-left font-medium">Your Cost</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                      <th className="py-3 px-4 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-6 text-center text-muted-foreground">
                          No invoices found
                        </td>
                      </tr>
                    ) : (
                      filteredInvoices.map((invoice) => (
                        <tr key={invoice.id} className="border-b">
                          <td className="py-3 px-4">{invoice.id}</td>
                          <td className="py-3 px-4">{formatDate(invoice.date)}</td>
                          <td className="py-3 px-4">{invoice.service}</td>
                          <td className="py-3 px-4">₱{invoice.amount.toLocaleString()}</td>
                          <td className="py-3 px-4">₱{invoice.patientResponsibility.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <Badge 
                              variant="outline" 
                              className={
                                invoice.status === 'paid'
                                  ? 'bg-green-50 text-green-700 hover:bg-green-50'
                                  : 'bg-amber-50 text-amber-700 hover:bg-amber-50'
                              }
                            >
                              {invoice.status === 'paid' ? 'Paid' : 'Pending'}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                              {invoice.status === 'pending' && (
                                <Button size="sm" className="bg-clinic-600 hover:bg-clinic-700 text-white">
                                  Pay
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="insurance" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Insurance Details</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Provider</span>
                      <span className="font-medium">{insuranceInfo.provider}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Member ID</span>
                      <span className="font-medium">{insuranceInfo.memberID}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Plan Type</span>
                      <span className="font-medium">{insuranceInfo.planType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Coverage Period</span>
                      <span className="font-medium">
                        {formatDate(insuranceInfo.coverageStart)} - {formatDate(insuranceInfo.coverageEnd)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Co-Insurance</span>
                      <span className="font-medium">{insuranceInfo.coInsurance}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Coverage Summary</h3>
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-muted-foreground mb-2">Deductible Progress</p>
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-clinic-600" 
                              style={{ width: `${(insuranceInfo.deductibleMet / insuranceInfo.deductible) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-muted-foreground">₱{insuranceInfo.deductibleMet.toLocaleString()} spent</span>
                            <span className="text-xs text-muted-foreground">₱{insuranceInfo.deductible.toLocaleString()} total</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <h4 className="font-medium mb-2">What's Covered</h4>
                          <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                              Prenatal checkups
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                              Ultrasound examinations
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                              Laboratory tests
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                              Normal delivery
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  );
};

export default BillingOverview;
