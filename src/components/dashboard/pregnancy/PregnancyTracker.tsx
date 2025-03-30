
import React from 'react';
import { Calendar, ChevronRight, FileText, Heart, Info, AlertCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface PregnancyTrackerProps {
  gestationalAge: number; // in weeks
  dueDate: Date;
}

const PregnancyTracker: React.FC<PregnancyTrackerProps> = ({ 
  gestationalAge, 
  dueDate 
}) => {
  // Calculate progress percentage
  const progressPercent = (gestationalAge / 40) * 100;
  
  // Determine current trimester
  const currentTrimester = gestationalAge <= 13 ? 1 : gestationalAge <= 26 ? 2 : 3;
  
  // Mock data for fetal development
  const fetalDevelopment = {
    size: gestationalAge === 22 ? 'the length of a papaya (28 cm)' : 'unknown',
    weight: gestationalAge === 22 ? 'around 430 grams (0.9 lbs)' : 'unknown',
    development: [
      'The brain is growing rapidly.',
      'The eyes are fully formed, though the irises still lack pigment.',
      'The inner ear is developed - your baby might be able to hear your voice!',
      'The liver and pancreas are developing.',
    ],
    milestone: 'Your baby can now hear sounds from outside your body.'
  };
  
  // Mock upcoming prenatal visits
  const upcomingVisits = [
    {
      id: 'visit-1',
      type: 'Regular Prenatal Checkup',
      date: new Date('2023-06-15T10:00:00'),
      provider: 'Dr. Maria Santos',
      description: 'Routine checkup with blood pressure and fundal height measurement.'
    },
    {
      id: 'visit-2',
      type: 'Glucose Tolerance Test',
      date: new Date('2023-06-22T09:00:00'),
      provider: 'Lab Services',
      description: 'Screening for gestational diabetes. Come fasting, test will take about 3 hours.'
    },
    {
      id: 'visit-3',
      type: 'Third Trimester Ultrasound',
      date: new Date('2023-07-10T14:30:00'),
      provider: 'Dr. James Wilson',
      description: 'Detailed ultrasound to check baby\'s growth and position.'
    }
  ];
  
  // Mock symptoms log
  const symptomsLog = [
    {
      date: new Date('2023-05-22'),
      symptoms: ['Mild back pain', 'Increased appetite'],
      notes: 'Back pain worse in the evening, relieved by stretching.'
    },
    {
      date: new Date('2023-05-20'),
      symptoms: ['Fatigue', 'Leg cramps'],
      notes: 'Leg cramps woke me up at night, drinking more water helped.'
    },
    {
      date: new Date('2023-05-15'),
      symptoms: ['Heartburn', 'Swollen ankles'],
      notes: 'Heartburn after dinner, tried sleeping with extra pillows to elevate head.'
    }
  ];
  
  // Mock health metrics
  const healthMetrics = [
    {
      date: new Date('2023-05-22'),
      bp: '115/75',
      weight: '145 lbs',
      fundal: '22 cm',
      notes: 'Normal progression'
    },
    {
      date: new Date('2023-05-01'),
      bp: '118/76',
      weight: '143 lbs',
      fundal: '20 cm',
      notes: 'Normal progression'
    },
    {
      date: new Date('2023-04-15'),
      bp: '110/72',
      weight: '141 lbs',
      fundal: '18 cm',
      notes: 'Normal progression'
    }
  ];
  
  // Calculate weeks remaining and days
  const today = new Date();
  const timeDiff = dueDate.getTime() - today.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const weeksRemaining = Math.floor(daysRemaining / 7);
  const remainingDays = daysRemaining % 7;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Your Pregnancy Journey</CardTitle>
          <CardDescription>Track your pregnancy progress and development</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Pregnancy Progress Bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <h3 className="font-medium text-lg">Week {gestationalAge}</h3>
                <Badge className="ml-2">{currentTrimester}{currentTrimester === 1 ? 'st' : currentTrimester === 2 ? 'nd' : 'rd'} Trimester</Badge>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Due Date</p>
                <p className="font-medium">{dueDate.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</p>
              </div>
            </div>
            
            <Progress value={progressPercent} className="h-2.5" />
            
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>First Trimester</span>
              <span>Second Trimester</span>
              <span>Third Trimester</span>
            </div>
            
            <div className="flex justify-between mt-4">
              <div>
                <p className="text-sm text-muted-foreground">Days Pregnant</p>
                <p className="font-medium">{gestationalAge * 7} days</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time Remaining</p>
                <p className="font-medium">{weeksRemaining} weeks, {remainingDays} days</p>
              </div>
            </div>
          </div>
          
          {/* Fetal Development Section */}
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-medium text-lg">Baby's Development</h3>
              <Badge variant="outline">Week {gestationalAge}</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-clinic-100 flex items-center justify-center">
                    <span className="text-clinic-600 text-xs font-medium">{gestationalAge}</span>
                  </div>
                  <h4 className="font-medium">Your Baby This Week</h4>
                </div>
                
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <p className="text-sm font-medium">Size:</p>
                    <p className="text-sm">{fetalDevelopment.size}</p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-sm font-medium">Weight:</p>
                    <p className="text-sm">{fetalDevelopment.weight}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Developmental Highlights:</p>
                    <ul className="list-disc text-sm pl-5 space-y-1">
                      {fetalDevelopment.development.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col justify-between">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="text-clinic-600 h-5 w-5" />
                    <h4 className="font-medium">Key Milestone</h4>
                  </div>
                  <p className="text-sm bg-clinic-50 p-3 rounded-md border border-clinic-100">
                    {fetalDevelopment.milestone}
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="text-blue-500 h-5 w-5" />
                    <h4 className="font-medium">What to Expect</h4>
                  </div>
                  <p className="text-sm">
                    During week {gestationalAge}, you might experience increased back pain as your uterus grows. 
                    Your balance may start to shift, so be careful when moving around.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="timeline" className="space-y-4">
        <TabsList>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="symptoms">Symptom Tracker</TabsTrigger>
          <TabsTrigger value="metrics">Health Metrics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pregnancy Timeline</CardTitle>
              <CardDescription>Key events and milestones in your pregnancy journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-7 top-0 bottom-0 w-px bg-slate-200"></div>
                
                <div className="space-y-8">
                  {/* Past Events */}
                  <div className="relative pl-16">
                    <div className="absolute left-0 w-14 h-14 rounded-full bg-clinic-100 flex items-center justify-center">
                      <span className="text-clinic-700 text-lg font-semibold">1st</span>
                    </div>
                    <div className="absolute left-7 top-7 w-9 h-px bg-slate-200"></div>
                    
                    <h3 className="text-base font-medium mb-1">First Trimester</h3>
                    <p className="text-sm text-muted-foreground mb-3">Weeks 1-13</p>
                    <div className="text-sm space-y-2">
                      <p>✓ <span className="font-medium">Week 6:</span> First heartbeat detected</p>
                      <p>✓ <span className="font-medium">Week 8:</span> First ultrasound completed</p>
                      <p>✓ <span className="font-medium">Week 10:</span> NIPT genetic screening</p>
                      <p>✓ <span className="font-medium">Week 12:</span> Nuchal translucency scan</p>
                    </div>
                  </div>
                  
                  {/* Current Trimester */}
                  <div className="relative pl-16">
                    <div className="absolute left-0 w-14 h-14 rounded-full bg-clinic-500 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">2nd</span>
                    </div>
                    <div className="absolute left-7 top-7 w-9 h-px bg-slate-200"></div>
                    
                    <h3 className="text-base font-medium mb-1">Second Trimester</h3>
                    <p className="text-sm text-muted-foreground mb-3">Weeks 14-26 <Badge className="ml-1" variant="secondary">Current</Badge></p>
                    <div className="text-sm space-y-2">
                      <p>✓ <span className="font-medium">Week 18:</span> Anatomy scan completed</p>
                      <p>✓ <span className="font-medium">Week 20:</span> Baby's gender revealed</p>
                      <p className="text-clinic-700 font-medium">→ <span className="font-medium">Week 22:</span> You are here</p>
                      <p className="text-muted-foreground">◯ <span className="font-medium">Week 24:</span> Glucose tolerance test</p>
                      <p className="text-muted-foreground">◯ <span className="font-medium">Week 26:</span> Third trimester begins</p>
                    </div>
                  </div>
                  
                  {/* Future Trimester */}
                  <div className="relative pl-16">
                    <div className="absolute left-0 w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
                      <span className="text-slate-400 text-lg font-semibold">3rd</span>
                    </div>
                    <div className="absolute left-7 top-7 w-9 h-px bg-slate-200"></div>
                    
                    <h3 className="text-base font-medium text-muted-foreground mb-1">Third Trimester</h3>
                    <p className="text-sm text-muted-foreground mb-3">Weeks 27-40</p>
                    <div className="text-sm space-y-2 text-muted-foreground">
                      <p>◯ <span className="font-medium">Week 28:</span> RhoGAM shot (if Rh negative)</p>
                      <p>◯ <span className="font-medium">Week 32:</span> Group B strep test</p>
                      <p>◯ <span className="font-medium">Week 36:</span> Weekly appointments begin</p>
                      <p>◯ <span className="font-medium">Week 40:</span> Due date!</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appointments">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Upcoming Prenatal Appointments</CardTitle>
                  <CardDescription>Schedule of your upcoming care visits</CardDescription>
                </div>
                <Button className="bg-clinic-600 hover:bg-clinic-700">
                  Book New Appointment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingVisits.map((visit) => (
                  <div key={visit.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="bg-clinic-50 p-3 rounded-full">
                      <Calendar className="h-5 w-5 text-clinic-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <h4 className="font-medium">{visit.type}</h4>
                        <div className="flex items-center">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-muted-foreground mr-2" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="w-64 text-sm">{visit.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <Badge variant="outline">
                            {visit.date.toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })} • {visit.date.toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit'
                            })}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mt-1">{visit.provider}</p>
                      <p className="text-sm mt-2">{visit.description}</p>
                      
                      <div className="flex justify-end gap-2 mt-3">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> Reschedule
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive border-destructive/20 hover:bg-destructive/10">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <Button variant="ghost" className="flex items-center gap-1">
                View All Appointments <ChevronRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="symptoms">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Symptom Tracker</CardTitle>
                  <CardDescription>Record and monitor your pregnancy symptoms</CardDescription>
                </div>
                <Button className="bg-clinic-600 hover:bg-clinic-700">
                  Log New Symptoms
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <Card className="bg-slate-50 border">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <span className="text-lg font-medium">Most Common</span>
                        <ul className="mt-3 space-y-2 text-left">
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            Back pain
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            Fatigue
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            Heartburn
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-slate-50 border">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <span className="text-lg font-medium">Last 7 Days</span>
                        <ul className="mt-3 space-y-2 text-left">
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            Improved: Morning sickness
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            Worsened: Back pain
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                            New: Leg cramps
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-slate-50 border">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <span className="text-lg font-medium">To Discuss</span>
                        <div className="flex items-center justify-center mt-3">
                          <AlertCircle className="h-5 w-5 text-amber-500" />
                          <span className="ml-2 text-sm">2 symptoms to discuss at next appointment</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Recent Symptom Logs</h3>
                  <div className="space-y-4">
                    {symptomsLog.map((entry, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">{entry.date.toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                          })}</span>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {entry.symptoms.map((symptom, i) => (
                            <Badge key={i} variant="secondary">{symptom}</Badge>
                          ))}
                        </div>
                        <p className="text-sm">{entry.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="metrics">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Health Metrics</CardTitle>
              <CardDescription>Track your vital signs and pregnancy measurements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="border">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <span className="text-muted-foreground text-sm">Weight</span>
                        <div className="text-2xl font-semibold mt-1">145 lbs</div>
                        <div className="text-xs text-muted-foreground mt-1">+4 lbs this month</div>
                        <Badge variant="outline" className="mt-2">On Track</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <span className="text-muted-foreground text-sm">Blood Pressure</span>
                        <div className="text-2xl font-semibold mt-1">115/75</div>
                        <div className="text-xs text-muted-foreground mt-1">Last checked: May 22</div>
                        <Badge variant="outline" className="mt-2">Normal</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <span className="text-muted-foreground text-sm">Fundal Height</span>
                        <div className="text-2xl font-semibold mt-1">22 cm</div>
                        <div className="text-xs text-muted-foreground mt-1">Matches week 22</div>
                        <Badge variant="outline" className="mt-2">Normal</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Metric History</h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Blood Pressure</TableHead>
                          <TableHead>Weight</TableHead>
                          <TableHead>Fundal Height</TableHead>
                          <TableHead>Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {healthMetrics.map((entry, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              {entry.date.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </TableCell>
                            <TableCell>{entry.bp}</TableCell>
                            <TableCell>{entry.weight}</TableCell>
                            <TableCell>{entry.fundal}</TableCell>
                            <TableCell>{entry.notes}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PregnancyTracker;
