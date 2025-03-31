
import React, { useState } from 'react';
import PageTransition from '@/components/ui-custom/page-transition';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/auth-context';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { 
  User, Key, Bell, Shield, Clock, 
  Smartphone, Mail, Moon, Sun, 
  Globe, Fingerprint, LogOut, AlarmClock,
  AlertTriangle
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isConfirmPasswordDialogOpen, setIsConfirmPasswordDialogOpen] = useState(false);
  
  // Mock settings states
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [timeFormat, setTimeFormat] = useState('12h');
  const [language, setLanguage] = useState('english');
  
  // Mock security sessions
  const securitySessions = [
    {
      id: 'session-1',
      device: 'Chrome on MacOS',
      location: 'San Francisco, CA',
      lastActive: 'Now',
      isCurrent: true,
    },
    {
      id: 'session-2',
      device: 'Safari on iPhone',
      location: 'San Francisco, CA',
      lastActive: '2 hours ago',
      isCurrent: false,
    },
    {
      id: 'session-3',
      device: 'Firefox on Windows',
      location: 'San Diego, CA',
      lastActive: '3 days ago',
      isCurrent: false,
    }
  ];
  
  const handleSaveProfile = () => {
    toast.success('Profile information updated');
  };
  
  const handleChangePassword = () => {
    setIsConfirmPasswordDialogOpen(true);
  };
  
  const handleConfirmPasswordChange = () => {
    setIsConfirmPasswordDialogOpen(false);
    toast.success('Password updated successfully');
  };
  
  const handleEnableTwoFactor = () => {
    setTwoFactorEnabled(true);
    toast.success('Two-factor authentication enabled');
  };
  
  const handleDisableTwoFactor = () => {
    setTwoFactorEnabled(false);
    toast.success('Two-factor authentication disabled');
  };
  
  const handleTerminateSession = (sessionId: string) => {
    toast.success('Session terminated');
  };
  
  const handleDeleteAccount = () => {
    toast.success('Account deletion request submitted');
  };
  
  return (
    <PageTransition>
      <Helmet>
        <title>Settings | Santa Matilda</title>
        <meta name="description" content="Manage your account settings at Santa Matilda Women's Health Clinic" />
      </Helmet>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and settings</p>
        </div>
        
        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="profile" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              Preferences
            </TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal and professional details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue={user?.name} placeholder="Your full name" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue={user?.email} placeholder="your.email@example.com" type="email" />
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="(555) 123-4567" placeholder="(555) 123-4567" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="role">Professional Role</Label>
                    <Input id="role" defaultValue={user?.role} disabled />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <textarea 
                    id="bio"
                    className="w-full min-h-32 p-3 border rounded-md"
                    placeholder="Tell patients about your background, specialties, and approach to care..."
                    defaultValue="Experienced OB/GYN specializing in high-risk pregnancies and minimally invasive gynecological procedures. Board-certified with over 15 years of practice."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="profileImage">Profile Image</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-slate-200 flex items-center justify-center">
                      <User className="h-8 w-8 text-slate-500" />
                    </div>
                    <Button variant="outline">Change Image</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSaveProfile}>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
                <CardDescription>
                  Manage your account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue={user?.email?.split('@')[0]} />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="accountCreated">Account Created</Label>
                    <Input id="accountCreated" defaultValue="January 15, 2023" disabled />
                  </div>
                </div>
                
                <div>
                  <Button variant="outline" onClick={handleChangePassword}>
                    <Key className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Security Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Authentication Settings</CardTitle>
                <CardDescription>
                  Control how you sign into your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  {twoFactorEnabled ? (
                    <Button variant="outline" onClick={handleDisableTwoFactor}>
                      Disable 2FA
                    </Button>
                  ) : (
                    <Button onClick={handleEnableTwoFactor}>
                      <Shield className="h-4 w-4 mr-2" />
                      Enable 2FA
                    </Button>
                  )}
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Label>Active Sessions</Label>
                  <p className="text-sm text-muted-foreground">
                    These are the devices that are currently logged into your account
                  </p>
                  
                  <div className="space-y-3 mt-4">
                    {securitySessions.map((session) => (
                      <div 
                        key={session.id} 
                        className={`p-4 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          session.isCurrent ? 'bg-slate-50 dark:bg-slate-800' : ''
                        }`}
                      >
                        <div>
                          <div className="font-medium">{session.device}</div>
                          <div className="text-sm text-muted-foreground">
                            {session.location} · {session.lastActive}
                            {session.isCurrent && (
                              <span className="ml-2 text-green-600 font-medium">Current session</span>
                            )}
                          </div>
                        </div>
                        {!session.isCurrent && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleTerminateSession(session.id)}
                          >
                            Terminate
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Label>Login History</Label>
                  <p className="text-sm text-muted-foreground">
                    Recent account login activity
                  </p>
                  
                  <div className="space-y-2 mt-3">
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <div className="font-medium">Chrome on MacOS</div>
                        <div>1 minute ago</div>
                      </div>
                      <div className="text-muted-foreground">San Francisco, CA</div>
                    </div>
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <div className="font-medium">Safari on iPhone</div>
                        <div>Yesterday at 2:45 PM</div>
                      </div>
                      <div className="text-muted-foreground">San Francisco, CA</div>
                    </div>
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <div className="font-medium">Chrome on MacOS</div>
                        <div>July 15, 2023 at 10:30 AM</div>
                      </div>
                      <div className="text-muted-foreground">San Diego, CA</div>
                    </div>
                  </div>
                  <Button variant="link" className="px-0">View full login history</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible actions for your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border border-red-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                        Delete Account
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                    </div>
                    <Button variant="destructive" onClick={handleDeleteAccount}>
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications-enabled">Enable Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about important events
                    </p>
                  </div>
                  <Switch 
                    id="notifications-enabled" 
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h3 className="font-medium">Notification Channels</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={emailNotifications && notificationsEnabled}
                      onCheckedChange={setEmailNotifications}
                      disabled={!notificationsEnabled}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    </div>
                    <Switch 
                      id="sms-notifications" 
                      checked={smsNotifications && notificationsEnabled}
                      onCheckedChange={setSmsNotifications}
                      disabled={!notificationsEnabled}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h3 className="font-medium">Notification Types</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="appointment-reminders">Appointment Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive reminders for upcoming appointments
                      </p>
                    </div>
                    <Switch 
                      id="appointment-reminders" 
                      checked={appointmentReminders && notificationsEnabled}
                      onCheckedChange={setAppointmentReminders}
                      disabled={!notificationsEnabled}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="patient-messages">Patient Messages</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when patients send you messages
                      </p>
                    </div>
                    <Switch 
                      id="patient-messages" 
                      checked={notificationsEnabled}
                      disabled={!notificationsEnabled}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="system-updates">System Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about system updates and maintenance
                      </p>
                    </div>
                    <Switch 
                      id="system-updates" 
                      checked={notificationsEnabled}
                      disabled={!notificationsEnabled}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h3 className="font-medium">Reminder Timing</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reminder-timing">Appointment Reminder Time</Label>
                    <Select defaultValue="24h">
                      <SelectTrigger id="reminder-timing" className="w-full">
                        <SelectValue placeholder="Select timing" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1h">1 hour before</SelectItem>
                        <SelectItem value="3h">3 hours before</SelectItem>
                        <SelectItem value="12h">12 hours before</SelectItem>
                        <SelectItem value="24h">24 hours before</SelectItem>
                        <SelectItem value="48h">48 hours before</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-6">
                <Button onClick={() => toast.success('Notification settings saved')}>
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Application Preferences</CardTitle>
                <CardDescription>
                  Customize your experience with the Santa Matilda platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable dark mode for a more comfortable viewing experience
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4 text-muted-foreground" />
                    <Switch 
                      id="dark-mode" 
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                    <Moon className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h3 className="font-medium">Regional Settings</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select 
                      defaultValue="english"
                      value={language}
                      onValueChange={setLanguage}
                    >
                      <SelectTrigger id="language" className="w-full">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time-format">Time Format</Label>
                    <Select 
                      defaultValue="12h"
                      value={timeFormat}
                      onValueChange={setTimeFormat}
                    >
                      <SelectTrigger id="time-format" className="w-full">
                        <SelectValue placeholder="Select time format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                        <SelectItem value="24h">24-hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h3 className="font-medium">Dashboard Preferences</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="welcome-screen">Welcome Screen</Label>
                      <p className="text-sm text-muted-foreground">
                        Show welcome screen on login
                      </p>
                    </div>
                    <Switch id="welcome-screen" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-refresh">Auto-Refresh Dashboard</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically refresh dashboard data
                      </p>
                    </div>
                    <Switch id="auto-refresh" defaultChecked />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h3 className="font-medium">Accessibility</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="larger-text">Larger Text</Label>
                      <p className="text-sm text-muted-foreground">
                        Increase text size for better readability
                      </p>
                    </div>
                    <Switch id="larger-text" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="reduced-motion">Reduced Motion</Label>
                      <p className="text-sm text-muted-foreground">
                        Minimize animations throughout the interface
                      </p>
                    </div>
                    <Switch id="reduced-motion" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-6">
                <Button onClick={() => toast.success('Preferences saved')}>
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Change Password Dialog */}
      <Dialog open={isConfirmPasswordDialogOpen} onOpenChange={setIsConfirmPasswordDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Your Password</DialogTitle>
            <DialogDescription>
              Enter your current password and a new password to update your credentials.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" placeholder="Enter your current password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" placeholder="Enter your new password" />
              <p className="text-xs text-muted-foreground">
                Password must be at least 8 characters and include a mix of letters, numbers, and symbols.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" placeholder="Confirm your new password" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmPasswordDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmPasswordChange}>Update Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
};

export default SettingsPage;
