import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2, Users, AlertCircle, Calendar, Megaphone } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

// Define the announcement type for better type safety
type Audience = 'all' | 'patients' | 'doctors' | 'staff';

type Announcement = {
  id: string;
  title: string;
  content: string;
  date: string;
  audience: Audience[];
  important: boolean;
};

// Mock announcements data
const mockAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Holiday Clinic Hours',
    content: 'The clinic will have reduced hours during the holiday season. Please check the website for details.',
    date: '2025-04-01',
    audience: ['all'],
    important: true,
  },
  {
    id: 'ann-2',
    title: 'New Prenatal Class Schedule',
    content: 'We are excited to announce our new prenatal class schedule starting next month.',
    date: '2025-04-02',
    audience: ['patients'],
    important: false,
  },
  {
    id: 'ann-3',
    title: 'Staff Meeting Reminder',
    content: 'Reminder for all staff: monthly meeting this Friday at 9 AM in the conference room.',
    date: '2025-04-03',
    audience: ['doctors', 'staff'],
    important: true,
  },
  {
    id: 'ann-4',
    title: 'New Equipment Training',
    content: 'Training session for the new ultrasound equipment will be held next Tuesday.',
    date: '2025-04-04',
    audience: ['doctors', 'staff'],
    important: false,
  },
  {
    id: 'ann-5',
    title: 'Patient Portal Updates',
    content: 'We have updated our patient portal with new features. Instructions have been sent via email.',
    date: '2025-04-05',
    audience: ['patients'],
    important: false,
  },
  {
    id: 'ann-6',
    title: 'COVID-19 Protocol Update',
    content: 'Please review the updated COVID-19 protocols for clinic visits effective immediately.',
    date: '2025-04-06',
    audience: ['all'],
    important: true,
  },
];

const AdminAnnouncementManager: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [audienceFilter, setAudienceFilter] = useState<string>('all');
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    audience: ['all'] as Audience[],
    important: false,
  });
  
  // Filter announcements based on search query and audience filter
  const filteredAnnouncements = mockAnnouncements.filter(announcement => {
    const matchesSearch = 
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesAudience = audienceFilter === 'all' || announcement.audience.includes(audienceFilter as Audience);
    
    return matchesSearch && matchesAudience;
  });

  const handleCreateAnnouncement = () => {
    // Logic to create a new announcement
    toast({
      title: 'Announcement Created',
      description: 'Your announcement has been successfully created.',
    });
  };

  const handleEditAnnouncement = (id: string) => {
    // Logic to edit an existing announcement
    toast({
      title: 'Announcement Edited',
      description: `Announcement ${id} has been successfully edited.`,
    });
  };

  const handleDeleteAnnouncement = (id: string) => {
    // Logic to delete an announcement
    toast({
      title: 'Announcement Deleted',
      description: `Announcement ${id} has been successfully deleted.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0">
            <div>
              <CardTitle>Announcement Manager</CardTitle>
              <CardDescription>Create, manage, and schedule announcements</CardDescription>
            </div>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Announcement
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create New Announcement</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="title" className="text-right">
                        Title
                      </label>
                      <Input id="title" value={newAnnouncement.title} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="content" className="text-right">
                        Content
                      </label>
                      <Textarea id="content" value={newAnnouncement.content} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="audience" className="text-right">
                        Audience
                      </label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select audience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="patients">Patients</SelectItem>
                          <SelectItem value="doctors">Doctors</SelectItem>
                          <SelectItem value="staff">Staff</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleCreateAnnouncement}>Create</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
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
              <Select value={audienceFilter} onValueChange={(value) => setAudienceFilter(value)}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filter by audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Audiences</SelectItem>
                  <SelectItem value="patients">Patients</SelectItem>
                  <SelectItem value="doctors">Doctors</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_150px_120px] py-3 px-4 font-medium border-b hidden md:grid">
                <div>Announcement</div>
                <div>Audience</div>
                <div className="text-right">Actions</div>
              </div>
              {filteredAnnouncements.length > 0 ? (
                <div className="divide-y">
                  {filteredAnnouncements.map((announcement) => (
                    <div key={announcement.id} className="grid grid-cols-1 md:grid-cols-[1fr_150px_120px] py-3 px-4 items-center">
                      <div>
                        <div className="font-medium">{announcement.title}</div>
                        <div className="text-sm text-muted-foreground">{announcement.content}</div>
                        <div className="text-xs text-muted-foreground mt-1">Date: {announcement.date}</div>
                        {announcement.important && (
                          <Badge variant="destructive" className="mt-2">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            Important
                          </Badge>
                        )}
                      </div>
                      <div>
                        {announcement.audience.map((audience) => (
                          <Badge key={audience} variant="secondary" className="mr-1">
                            {audience.charAt(0).toUpperCase() + audience.slice(1)}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditAnnouncement(announcement.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteAnnouncement(announcement.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-muted-foreground">
                  No announcements found matching your filters.
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Export List</Button>
          <Button className="bg-clinic-600 hover:bg-clinic-700">+ Add New Announcement</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminAnnouncementManager;
