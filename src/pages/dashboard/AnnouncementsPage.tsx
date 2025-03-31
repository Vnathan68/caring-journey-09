
import React, { useState } from 'react';
import PageTransition from '@/components/ui-custom/page-transition';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { 
  Bell, Megaphone, Calendar, Plus, 
  Clock, MoreVertical, CheckCircle2, 
  Edit, Trash2, Users, Copy, AlertCircle
} from 'lucide-react';
import { formatDate, formatRelativeTime } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';

type AnnouncementPriority = 'high' | 'normal' | 'low';

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: Date;
  expiryDate?: Date | null;
  priority: AnnouncementPriority;
  author: string;
  target: string[];
  isPublished: boolean;
  viewCount: number;
}

// Mock announcement data
const mockAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Clinic Hours Update - Holiday Schedule',
    content: 'The clinic will be closed on July 4th for Independence Day. For emergencies, please call our on-call line at (555) 123-4567.',
    date: new Date('2023-06-15'),
    expiryDate: new Date('2023-07-05'),
    priority: 'high',
    author: 'Dr. Maria Santos',
    target: ['all-patients'],
    isPublished: true,
    viewCount: 156
  },
  {
    id: 'ann-2',
    title: 'New Prenatal Class Schedule',
    content: 'We are excited to announce our new prenatal class schedule for the summer. Classes will be held every Tuesday at 6:00 PM starting July 1st. Registration is required.',
    date: new Date('2023-06-10'),
    expiryDate: new Date('2023-08-01'),
    priority: 'normal',
    author: 'Dr. Maria Santos',
    target: ['pregnant-patients'],
    isPublished: true,
    viewCount: 78
  },
  {
    id: 'ann-3',
    title: 'COVID-19 Vaccination Available',
    content: 'COVID-19 vaccinations are now available at our clinic for all pregnant women. Please consult with your doctor about the benefits and timing of vaccination during pregnancy.',
    date: new Date('2023-06-05'),
    expiryDate: null,
    priority: 'high',
    author: 'Dr. Maria Santos',
    target: ['pregnant-patients'],
    isPublished: true,
    viewCount: 203
  },
  {
    id: 'ann-4',
    title: 'New Doctor Joining Our Team',
    content: 'We are pleased to welcome Dr. Sarah Johnson to our team. Dr. Johnson is a board-certified OB/GYN with a special interest in minimally invasive gynecologic surgery.',
    date: new Date('2023-06-01'),
    expiryDate: new Date('2023-07-01'),
    priority: 'normal',
    author: 'Dr. Maria Santos',
    target: ['all-patients'],
    isPublished: true,
    viewCount: 145
  },
  {
    id: 'ann-5',
    title: 'Insurance Coverage Update',
    content: 'Starting July 1st, we will be accepting XYZ Insurance plans. If you have any questions about coverage, please contact our billing department.',
    date: new Date('2023-05-25'),
    expiryDate: new Date('2023-07-10'),
    priority: 'normal',
    author: 'Dr. Maria Santos',
    target: ['all-patients'],
    isPublished: true,
    viewCount: 112
  },
  {
    id: 'ann-6',
    title: 'Summer Safety Tips for Pregnant Women',
    content: 'With summer approaching, we want to share some important safety tips for pregnant women to stay healthy and comfortable during hot weather...',
    date: new Date('2023-05-20'),
    expiryDate: new Date('2023-09-01'),
    priority: 'low',
    author: 'Dr. Maria Santos',
    target: ['pregnant-patients'],
    isPublished: false,
    viewCount: 0
  }
];

// Patient groups for targeting announcements
const patientGroups = [
  { id: 'all-patients', name: 'All Patients' },
  { id: 'pregnant-patients', name: 'Pregnant Patients' },
  { id: 'postpartum-patients', name: 'Postpartum Patients' },
  { id: 'gynecology-patients', name: 'Gynecology Patients' },
  { id: 'fertility-patients', name: 'Fertility Patients' }
];

const AnnouncementsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('published');
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState<Partial<Announcement>>({
    title: '',
    content: '',
    priority: 'normal',
    target: ['all-patients'],
    isPublished: true
  });
  
  const publishedAnnouncements = announcements.filter(a => a.isPublished);
  const draftAnnouncements = announcements.filter(a => !a.isPublished);
  
  const handleCreateAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.content) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const announcement: Announcement = {
      id: `ann-${announcements.length + 1}`,
      title: newAnnouncement.title || '',
      content: newAnnouncement.content || '',
      date: new Date(),
      expiryDate: newAnnouncement.expiryDate || null,
      priority: newAnnouncement.priority as AnnouncementPriority || 'normal',
      author: 'Dr. Maria Santos', // In a real app, this would be the logged-in user
      target: newAnnouncement.target || ['all-patients'],
      isPublished: newAnnouncement.isPublished || false,
      viewCount: 0
    };
    
    setAnnouncements([announcement, ...announcements]);
    setIsCreateDialogOpen(false);
    setNewAnnouncement({
      title: '',
      content: '',
      priority: 'normal',
      target: ['all-patients'],
      isPublished: true
    });
    
    toast.success(`Announcement ${announcement.isPublished ? 'published' : 'saved as draft'}`);
  };
  
  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
    toast.success('Announcement deleted');
  };
  
  const handlePublishAnnouncement = (id: string) => {
    setAnnouncements(announcements.map(a => 
      a.id === id ? { ...a, isPublished: true, date: new Date() } : a
    ));
    toast.success('Announcement published');
  };
  
  const handleDuplicateAnnouncement = (announcement: Announcement) => {
    const duplicate: Announcement = {
      ...announcement,
      id: `ann-${announcements.length + 1}`,
      title: `${announcement.title} (Copy)`,
      date: new Date(),
      isPublished: false,
      viewCount: 0
    };
    
    setAnnouncements([duplicate, ...announcements]);
    toast.success('Announcement duplicated as draft');
  };
  
  const getPriorityBadge = (priority: AnnouncementPriority) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-500">High</Badge>;
      case 'normal':
        return <Badge className="bg-blue-500">Normal</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const getTargetAudience = (targetIds: string[]) => {
    if (targetIds.includes('all-patients')) {
      return 'All Patients';
    }
    
    return targetIds
      .map(id => patientGroups.find(g => g.id === id)?.name || id)
      .join(', ');
  };
  
  return (
    <PageTransition>
      <Helmet>
        <title>Announcements | Santa Matilda</title>
        <meta name="description" content="Manage clinic announcements at Santa Matilda Women's Health Clinic" />
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Announcements</h1>
            <p className="text-muted-foreground">Create and manage clinic announcements</p>
          </div>
          
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Announcement
          </Button>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Announcement Management</CardTitle>
            <CardDescription>
              Create, edit, and manage announcements for patients and staff
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="published" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="published">Published ({publishedAnnouncements.length})</TabsTrigger>
                <TabsTrigger value="drafts">Drafts ({draftAnnouncements.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="published" className="pt-4">
                {publishedAnnouncements.length === 0 ? (
                  <div className="text-center py-12">
                    <Megaphone className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Published Announcements</h3>
                    <p className="text-muted-foreground mb-6">
                      You haven't published any announcements yet.
                    </p>
                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                      Create Your First Announcement
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {publishedAnnouncements.map((announcement) => (
                      <Card key={announcement.id} className="shadow-sm">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-base flex items-center">
                                <Megaphone className="h-4 w-4 mr-2 text-muted-foreground" />
                                {announcement.title}
                              </CardTitle>
                              <CardDescription>
                                Published {formatRelativeTime(announcement.date)} by {announcement.author}
                              </CardDescription>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleDuplicateAnnouncement(announcement)}>
                                  <Copy className="h-4 w-4 mr-2" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteAnnouncement(announcement.id)}>
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm whitespace-pre-line">{announcement.content}</p>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {getPriorityBadge(announcement.priority)}
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>{getTargetAudience(announcement.target)}</span>
                            </Badge>
                            {announcement.expiryDate && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>Expires {formatDate(announcement.expiryDate)}</span>
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-4">
                          <div className="text-sm text-muted-foreground flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Viewed by {announcement.viewCount} patients
                          </div>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3 mr-2" />
                            Edit
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="drafts" className="pt-4">
                {draftAnnouncements.length === 0 ? (
                  <div className="text-center py-12">
                    <Edit className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Draft Announcements</h3>
                    <p className="text-muted-foreground mb-6">
                      You don't have any announcements saved as drafts.
                    </p>
                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                      Create New Announcement
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {draftAnnouncements.map((announcement) => (
                      <Card key={announcement.id} className="shadow-sm border-dashed">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-base flex items-center">
                                {announcement.title}
                              </CardTitle>
                              <CardDescription>
                                Last updated {formatRelativeTime(announcement.date)}
                              </CardDescription>
                            </div>
                            <Badge variant="outline">Draft</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm whitespace-pre-line">{announcement.content}</p>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {getPriorityBadge(announcement.priority)}
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>{getTargetAudience(announcement.target)}</span>
                            </Badge>
                            {announcement.expiryDate && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>Will expire {formatDate(announcement.expiryDate)}</span>
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleDeleteAnnouncement(announcement.id)}>
                              <Trash2 className="h-3 w-3 mr-2" />
                              Delete
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3 mr-2" />
                              Edit
                            </Button>
                          </div>
                          <Button size="sm" onClick={() => handlePublishAnnouncement(announcement.id)}>
                            <Megaphone className="h-3 w-3 mr-2" />
                            Publish
                          </Button>
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
      
      {/* Create Announcement Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Announcement</DialogTitle>
            <DialogDescription>
              Create an announcement to communicate important information to patients and staff.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Announcement Title</Label>
              <Input 
                id="title" 
                placeholder="Enter a clear and concise title" 
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Announcement Content</Label>
              <Textarea 
                id="content" 
                placeholder="Enter the detailed announcement message"
                className="min-h-32" 
                value={newAnnouncement.content}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level</Label>
                <Select 
                  defaultValue="normal"
                  value={newAnnouncement.priority as string}
                  onValueChange={(value) => setNewAnnouncement({ 
                    ...newAnnouncement, 
                    priority: value as AnnouncementPriority 
                  })}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="normal">Normal Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date (Optional)</Label>
                <Input 
                  id="expiry" 
                  type="date" 
                  placeholder="Select when this announcement should expire"
                  onChange={(e) => setNewAnnouncement({ 
                    ...newAnnouncement, 
                    expiryDate: e.target.value ? new Date(e.target.value) : null 
                  })}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Target Audience</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                {patientGroups.map((group) => (
                  <div key={group.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`target-${group.id}`} 
                      checked={newAnnouncement.target?.includes(group.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          if (group.id === 'all-patients') {
                            setNewAnnouncement({ ...newAnnouncement, target: ['all-patients'] });
                          } else {
                            const updatedTarget = [...(newAnnouncement.target || [])];
                            updatedTarget.push(group.id);
                            updatedTarget.filter(id => id !== 'all-patients');
                            setNewAnnouncement({ ...newAnnouncement, target: updatedTarget });
                          }
                        } else {
                          setNewAnnouncement({ 
                            ...newAnnouncement, 
                            target: (newAnnouncement.target || []).filter(id => id !== group.id)
                          });
                        }
                      }}
                    />
                    <label
                      htmlFor={`target-${group.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {group.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="publish" 
                  checked={newAnnouncement.isPublished}
                  onCheckedChange={(checked) => {
                    setNewAnnouncement({ ...newAnnouncement, isPublished: !!checked });
                  }}
                />
                <label
                  htmlFor="publish"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Publish immediately
                </label>
              </div>
              <p className="text-xs text-muted-foreground">
                If unchecked, this announcement will be saved as a draft.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateAnnouncement}>
              {newAnnouncement.isPublished ? 'Publish Announcement' : 'Save as Draft'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
};

export default AnnouncementsPage;
