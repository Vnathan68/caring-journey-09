
import React, { useState } from 'react';
import PageTransition from '@/components/ui-custom/page-transition';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { 
  Video, Phone, UserPlus, Users, Clock, Calendar,
  CheckCircle, XCircle, RefreshCw, Mic, MicOff, 
  Camera, CameraOff, ScreenShare, PhoneOff
} from 'lucide-react';

// Mock upcoming telemedicine calls
const mockUpcomingCalls = [
  {
    id: 'call-1',
    patientName: 'Maria Garcia',
    patientId: 'P1001',
    type: 'Video Consultation',
    scheduledTime: new Date(new Date().setHours(new Date().getHours() + 1)),
    status: 'scheduled', // scheduled, in-progress, completed, cancelled
    duration: 30, // minutes
    reason: 'Pregnancy follow-up',
    patientAvatar: 'https://randomuser.me/api/portraits/women/79.jpg'
  },
  {
    id: 'call-2',
    patientName: 'Jennifer Williams',
    patientId: 'P1002',
    type: 'Video Consultation',
    scheduledTime: new Date(new Date().setHours(new Date().getHours() + 3)),
    status: 'scheduled',
    duration: 15,
    reason: 'Test results discussion',
    patientAvatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 'call-3',
    patientName: 'Sarah Johnson',
    patientId: 'P1003',
    type: 'Phone Call',
    scheduledTime: new Date(new Date().setHours(new Date().getHours() + 5)),
    status: 'scheduled',
    duration: 15,
    reason: 'Medication follow-up',
    patientAvatar: 'https://randomuser.me/api/portraits/women/68.jpg'
  }
];

// Mock past telemedicine calls
const mockPastCalls = [
  {
    id: 'call-4',
    patientName: 'Emily Brown',
    patientId: 'P1004',
    type: 'Video Consultation',
    scheduledTime: new Date(new Date().setDate(new Date().getDate() - 1)),
    status: 'completed',
    duration: 30,
    notes: 'Patient reported feeling better. Continue with current medication.',
    recordingAvailable: true,
    reason: 'Postpartum check-up',
    patientAvatar: 'https://randomuser.me/api/portraits/women/9.jpg'
  },
  {
    id: 'call-5',
    patientName: 'Sophia Martinez',
    patientId: 'P1005',
    type: 'Phone Call',
    scheduledTime: new Date(new Date().setDate(new Date().getDate() - 3)),
    status: 'completed',
    duration: 15,
    notes: 'Discussed treatment options. Patient will consider and decide next week.',
    recordingAvailable: false,
    reason: 'Treatment options discussion',
    patientAvatar: 'https://randomuser.me/api/portraits/women/37.jpg'
  },
  {
    id: 'call-6',
    patientName: 'Isabella Lopez',
    patientId: 'P1006',
    type: 'Video Consultation',
    scheduledTime: new Date(new Date().setDate(new Date().getDate() - 5)),
    status: 'cancelled',
    duration: 30,
    notes: 'Patient cancelled due to scheduling conflict.',
    recordingAvailable: false,
    reason: 'Annual checkup',
    patientAvatar: 'https://randomuser.me/api/portraits/women/26.jpg'
  }
];

const TelemedicinePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isInCall, setIsInCall] = useState(false);
  const [currentCall, setCurrentCall] = useState<null | typeof mockUpcomingCalls[0]>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [screenShareEnabled, setScreenShareEnabled] = useState(false);
  
  const handleStartCall = (call: typeof mockUpcomingCalls[0]) => {
    setCurrentCall(call);
    setIsInCall(true);
    toast.success(`Starting call with ${call.patientName}`);
  };
  
  const handleEndCall = () => {
    toast.success('Call ended');
    setIsInCall(false);
    setCurrentCall(null);
  };
  
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    toast.success(`Microphone ${audioEnabled ? 'muted' : 'unmuted'}`);
  };
  
  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
    toast.success(`Camera ${videoEnabled ? 'turned off' : 'turned on'}`);
  };
  
  const toggleScreenShare = () => {
    setScreenShareEnabled(!screenShareEnabled);
    toast.success(`Screen sharing ${screenShareEnabled ? 'stopped' : 'started'}`);
  };
  
  const formatCallTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatCallDate = (date: Date) => {
    return date.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  const getTimeDifference = (scheduledTime: Date) => {
    const now = new Date();
    const diffMs = scheduledTime.getTime() - now.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins} minutes`;
    } else {
      const hours = Math.floor(diffMins / 60);
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    }
  };
  
  const getCallStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="outline">Scheduled</Badge>;
      case 'in-progress':
        return <Badge variant="default">In Progress</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const getCallTypeIcon = (type: string) => {
    return type.includes('Video') ? 
      <Video className="h-4 w-4" /> : 
      <Phone className="h-4 w-4" />;
  };
  
  // If in a call, show the call interface
  if (isInCall && currentCall) {
    return (
      <PageTransition>
        <Helmet>
          <title>Telemedicine Call | Santa Matilda</title>
        </Helmet>
        
        <div className="flex flex-col h-[calc(100vh-8rem)]">
          <div className="bg-slate-800 rounded-lg p-4 mb-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                <img 
                  src={currentCall.patientAvatar} 
                  alt={currentCall.patientName} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium text-white">{currentCall.patientName}</h3>
                <p className="text-xs text-slate-300">{currentCall.type} - {currentCall.reason}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>00:05:32</span>
              </div>
            </div>
          </div>
          
          <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-slate-900 rounded-lg flex items-center justify-center relative">
              {videoEnabled ? (
                <div className="w-full h-full">
                  {/* This would be a real video stream in a real implementation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src={currentCall.patientAvatar}
                      alt={currentCall.patientName}
                      className="h-64 w-64 rounded-full object-cover"
                    />
                  </div>
                  <div className="absolute top-4 right-4 w-32 h-24 bg-slate-800 rounded-lg overflow-hidden">
                    {/* This would be the doctor's video */}
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="text-white text-xs">Your camera</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-white">
                  <CameraOff className="h-16 w-16 mx-auto mb-4 text-slate-500" />
                  <p className="text-xl font-medium">Camera is turned off</p>
                  <p className="text-sm text-slate-400 mt-2">Click the camera button below to turn it on</p>
                </div>
              )}
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden flex flex-col">
              <div className="p-4 border-b">
                <h3 className="font-medium">Patient Information</h3>
              </div>
              <div className="p-4 space-y-4 flex-grow overflow-y-auto">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{currentCall.patientName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Patient ID</p>
                  <p className="font-medium">{currentCall.patientId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reason for Call</p>
                  <p className="font-medium">{currentCall.reason}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Call Type</p>
                  <div className="flex items-center">
                    {getCallTypeIcon(currentCall.type)}
                    <p className="font-medium ml-2">{currentCall.type}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Scheduled Duration</p>
                  <p className="font-medium">{currentCall.duration} minutes</p>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium mb-2">Call Notes</p>
                  <textarea 
                    className="w-full p-2 border rounded-md h-32 text-sm"
                    placeholder="Type your notes here..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 bg-slate-100 dark:bg-slate-800 rounded-lg p-4 flex items-center justify-center">
            <div className="flex gap-4">
              <Button 
                size="icon" 
                variant={audioEnabled ? "outline" : "destructive"} 
                className="h-12 w-12 rounded-full"
                onClick={toggleAudio}
              >
                {audioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </Button>
              <Button 
                size="icon" 
                variant={videoEnabled ? "outline" : "destructive"} 
                className="h-12 w-12 rounded-full"
                onClick={toggleVideo}
              >
                {videoEnabled ? <Camera className="h-5 w-5" /> : <CameraOff className="h-5 w-5" />}
              </Button>
              <Button 
                size="icon" 
                variant={screenShareEnabled ? "default" : "outline"} 
                className="h-12 w-12 rounded-full"
                onClick={toggleScreenShare}
              >
                <ScreenShare className="h-5 w-5" />
              </Button>
              <Button 
                size="icon" 
                variant="destructive" 
                className="h-12 w-12 rounded-full"
                onClick={handleEndCall}
              >
                <PhoneOff className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }
  
  return (
    <PageTransition>
      <Helmet>
        <title>Telemedicine | Santa Matilda</title>
        <meta name="description" content="Manage virtual consultations at Santa Matilda Women's Health Clinic" />
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Telemedicine</h1>
            <p className="text-muted-foreground">Manage and conduct virtual consultations</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <Phone className="h-4 w-4 mr-2" />
              Schedule Call
            </Button>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Patient
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Virtual Consultation Hub</CardTitle>
            <CardDescription>
              Manage your telemedicine appointments and conduct virtual consultations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upcoming">Upcoming Calls</TabsTrigger>
                <TabsTrigger value="past">Past Calls</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming" className="pt-4">
                {mockUpcomingCalls.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Upcoming Calls</h3>
                    <p className="text-muted-foreground mb-6">You have no telemedicine appointments scheduled.</p>
                    <Button>Schedule a Call</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockUpcomingCalls.map((call) => (
                      <Card key={call.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="p-4 flex-grow">
                            <div className="flex items-start gap-4">
                              <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                                <img 
                                  src={call.patientAvatar} 
                                  alt={call.patientName} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex-grow">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                  <div>
                                    <h3 className="font-medium">{call.patientName}</h3>
                                    <p className="text-sm text-muted-foreground">{call.patientId}</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge 
                                      variant={call.type.includes('Video') ? 'default' : 'secondary'}
                                      className="flex items-center gap-1"
                                    >
                                      {getCallTypeIcon(call.type)}
                                      <span>{call.type}</span>
                                    </Badge>
                                    {getCallStatusBadge(call.status)}
                                  </div>
                                </div>
                                
                                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
                                  <div>
                                    <p className="text-xs text-muted-foreground">Date & Time</p>
                                    <p className="text-sm">
                                      {formatCallDate(call.scheduledTime)} at {formatCallTime(call.scheduledTime)}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">Duration</p>
                                    <p className="text-sm">{call.duration} minutes</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">Reason</p>
                                    <p className="text-sm">{call.reason}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-slate-50 dark:bg-slate-800 p-4 flex flex-row md:flex-col justify-between md:justify-center items-center md:w-48">
                            <div className="text-center mb-0 md:mb-3">
                              <p className="text-xs text-muted-foreground">Starts in</p>
                              <p className="font-medium">{getTimeDifference(call.scheduledTime)}</p>
                            </div>
                            <Button 
                              className="w-auto md:w-full flex items-center justify-center"
                              onClick={() => handleStartCall(call)}
                            >
                              {call.type.includes('Video') ? (
                                <>
                                  <Video className="h-4 w-4 mr-2" />
                                  Join Call
                                </>
                              ) : (
                                <>
                                  <Phone className="h-4 w-4 mr-2" />
                                  Start Call
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="past" className="pt-4">
                {mockPastCalls.length === 0 ? (
                  <div className="text-center py-12">
                    <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Past Calls</h3>
                    <p className="text-muted-foreground mb-6">Your past telemedicine sessions will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockPastCalls.map((call) => (
                      <Card key={call.id} className={call.status === 'cancelled' ? 'border-red-200' : ''}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full overflow-hidden">
                                <img 
                                  src={call.patientAvatar} 
                                  alt={call.patientName} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <CardTitle className="text-base">{call.patientName}</CardTitle>
                                <CardDescription className="flex items-center gap-1">
                                  {getCallTypeIcon(call.type)}
                                  <span>{call.type}</span>
                                </CardDescription>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {getCallStatusBadge(call.status)}
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{call.duration} min</span>
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-muted-foreground">Date & Time</p>
                              <p className="text-sm">
                                {formatCallDate(call.scheduledTime)} at {formatCallTime(call.scheduledTime)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Reason</p>
                              <p className="text-sm">{call.reason}</p>
                            </div>
                          </div>
                          
                          {call.notes && (
                            <div className="mt-3">
                              <p className="text-xs text-muted-foreground">Notes</p>
                              <p className="text-sm mt-1 bg-slate-50 dark:bg-slate-800 p-2 rounded">{call.notes}</p>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter>
                          <div className="flex w-full justify-between items-center">
                            <p className="text-xs text-muted-foreground">{call.patientId}</p>
                            <div className="flex gap-2">
                              {call.recordingAvailable && (
                                <Button variant="outline" size="sm">
                                  View Recording
                                </Button>
                              )}
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
};

export default TelemedicinePage;
