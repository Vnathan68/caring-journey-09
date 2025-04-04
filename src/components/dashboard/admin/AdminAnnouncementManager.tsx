
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Megaphone, Calendar, Clock, Bell, Search, Users, User, MoreHorizontal, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ROLES } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const mockAnnouncements = [
  {
    id: "ann-1",
    title: "Clinic Closed for Holiday",
    content: "Santa Matilda Clinic will be closed on April 15th for a national holiday. Emergency services will still be available.",
    date: "2025-04-01",
    audience: [ROLES.PATIENT, ROLES.DOCTOR, ROLES.SECRETARY_NURSE, ROLES.ADMIN],
    author: "Admin User",
    status: "active"
  },
  {
    id: "ann-2",
    title: "New Ultrasound Equipment",
    content: "We're pleased to announce the arrival of our new state-of-the-art ultrasound equipment. This technology provides clearer images and more detailed diagnostics.",
    date: "2025-03-28",
    audience: [ROLES.PATIENT, ROLES.DOCTOR],
    author: "Admin User",
    status: "active"
  },
  {
    id: "ann-3",
    title: "Staff Meeting - April 10th",
    content: "There will be a mandatory staff meeting on April 10th at 8:30 AM to discuss upcoming changes to clinic policies.",
    date: "2025-03-25",
    audience: [ROLES.DOCTOR, ROLES.SECRETARY_NURSE, ROLES.ADMIN],
    author: "Admin User",
    status: "active"
  },
  {
    id: "ann-4",
    title: "Prenatal Class Schedule",
    content: "The new schedule for prenatal classes is now available. Classes will be held every Tuesday and Thursday evening from 6-8 PM.",
    date: "2025-03-20",
    audience: [ROLES.PATIENT],
    author: "Admin User",
    status: "inactive"
  }
];

const AdminAnnouncementManager: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [audienceFilter, setAudienceFilter] = useState('all');
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    audience: {
      [ROLES.PATIENT]: true,
      [ROLES.DOCTOR]: false,
      [ROLES.SECRETARY_NURSE]: false,
      [ROLES.ADMIN]: false
    }
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const filteredAnnouncements = mockAnnouncements.filter(announcement => {
    const matchesSearch = 
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesAudience = audienceFilter === 'all' || announcement.audience.includes(audienceFilter);
    
    return matchesSearch && matchesAudience;
  });

  const handleCreateAnnouncement = () => {
    // In a real app, this would send the data to an API
    toast.success("Announcement created successfully!");
    setDialogOpen(false);
    
    // Reset form
    setNewAnnouncement({
      title: '',
      content: '',
      audience: {
        [ROLES.PATIENT]: true,
        [ROLES.DOCTOR]: false,
        [ROLES.SECRETARY_NURSE]: false,
        [ROLES.ADMIN]: false
      }
    });
  };

  const getAudienceBadges = (audience: string[]) => {
    return audience.map(role => {
      let label = '';
      let className = '';
      
      switch(role) {
        case ROLES.ADMIN:
          label = 'Admin';
          className = 'bg-purple-100 text-purple-800';
          break;
        case ROLES.DOCTOR:
          label = 'Doctors';
          className = 'bg-blue-100 text-blue-800';
          break;
        case ROLES.SECRETARY_NURSE:
          label = 'Staff';
          className = 'bg-teal-100 text-teal-800';
          break;
        case ROLES.PATIENT:
          label = 'Patients';
          className = 'bg-gray-100 text-gray-800';
          break;
        default:
          label = role;
          className = 'bg-gray-100 text-gray-800';
      }
      
      return (
        <Badge key={role} variant="outline" className={className}>
          {label}
        </Badge>
      );
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0">
            <div>
              <CardTitle>Announcement Manager</CardTitle>
              <CardDescription>Create and manage clinic announcements</CardDescription>
            </div>
            
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-clinic-600 hover:bg-clinic-700">
                  <Megaphone className="h-4 w-4 mr-2" />
                  New Announcement
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Create New Announcement</DialogTitle>
                  <DialogDescription>
                    Create an announcement to notify patients, doctors, or staff.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Announcement Title</Label>
                    <Input 
                      id="title" 
                      placeholder="Enter a title"
                      value={newAnnouncement.title}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea 
                      id="content" 
                      placeholder="Enter announcement details"
                      rows={4}
                      value={newAnnouncement.content}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Audience</Label>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="patients"
                          checked={newAnnouncement.audience[ROLES.PATIENT]}
                          onCheckedChange={(checked) => 
                            setNewAnnouncement({
                              ...newAnnouncement, 
                              audience: {
                                ...newAnnouncement.audience,
                                [ROLES.PATIENT]: checked === true
                              }
                            })
                          }
                        />
                        <Label htmlFor="patients" className="cursor-pointer">Patients</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="doctors"
                          checked={newAnnouncement.audience[ROLES.DOCTOR]}
                          onCheckedChange={(checked) => 
                            setNewAnnouncement({
                              ...newAnnouncement, 
                              audience: {
                                ...newAnnouncement.audience,
                                [ROLES.DOCTOR]: checked === true
                              }
                            })
                          }
                        />
                        <Label htmlFor="doctors" className="cursor-pointer">Doctors</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="staff"
                          checked={newAnnouncement.audience[ROLES.SECRETARY_NURSE]}
                          onCheckedChange={(checked) => 
                            setNewAnnouncement({
                              ...newAnnouncement, 
                              audience: {
                                ...newAnnouncement.audience,
                                [ROLES.SECRETARY_NURSE]: checked === true
                              }
                            })
                          }
                        />
                        <Label htmlFor="staff" className="cursor-pointer">Staff</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="admins"
                          checked={newAnnouncement.audience[ROLES.ADMIN]}
                          onCheckedChange={(checked) => 
                            setNewAnnouncement({
                              ...newAnnouncement, 
                              audience: {
                                ...newAnnouncement.audience,
                                [ROLES.ADMIN]: checked === true
                              }
                            })
                          }
                        />
                        <Label htmlFor="admins" className="cursor-pointer">Admins</Label>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button 
                    onClick={handleCreateAnnouncement}
                    disabled={!newAnnouncement.title || !newAnnouncement.content}
                    className="bg-clinic-600 hover:bg-clinic-700"
                  >
                    Create Announcement
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search announcements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={audienceFilter} onValueChange={setAudienceFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Audiences</SelectItem>
                <SelectItem value={ROLES.PATIENT}>Patients</SelectItem>
                <SelectItem value={ROLES.DOCTOR}>Doctors</SelectItem>
                <SelectItem value={ROLES.SECRETARY_NURSE}>Staff</SelectItem>
                <SelectItem value={ROLES.ADMIN}>Admins</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredAnnouncements.length > 0 ? (
            <div className="space-y-4">
              {filteredAnnouncements.map((announcement) => (
                <Card key={announcement.id} className={announcement.status === 'inactive' ? 'opacity-60' : ''}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-2">
                        <Megaphone className="h-5 w-5 text-clinic-600 mt-1" />
                        <div>
                          <CardTitle className="text-lg">{announcement.title}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(announcement.date).toLocaleDateString()}
                            <span className="text-xs">by {announcement.author}</span>
                          </CardDescription>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{announcement.content}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <div className="text-xs text-muted-foreground mr-2 flex items-center">
                        <Users className="h-3 w-3 mr-1" /> Audience:
                      </div>
                      {getAudienceBadges(announcement.audience)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-muted-foreground">
              No announcements found matching your filters.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnnouncementManager;
