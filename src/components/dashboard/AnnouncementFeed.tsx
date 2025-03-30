
import React, { useState } from 'react';
import { Bell, CheckCircle, Calendar, ClipboardList, Info, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: Date;
  priority: 'high' | 'normal' | 'low';
  isRead: boolean;
  category?: string;
}

interface AnnouncementFeedProps {
  announcements: Announcement[];
}

const AnnouncementFeed: React.FC<AnnouncementFeedProps> = ({ announcements: initialAnnouncements }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const handleMarkAsRead = (id: string) => {
    setAnnouncements(announcements.map(announcement => 
      announcement.id === id ? { ...announcement, isRead: true } : announcement
    ));
  };
  
  const handleMarkAllAsRead = () => {
    setAnnouncements(announcements.map(announcement => ({ ...announcement, isRead: true })));
  };
  
  const filterAnnouncements = () => {
    return announcements.filter(announcement => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Tab filter
      const matchesTab = 
        activeTab === 'all' || 
        (activeTab === 'unread' && !announcement.isRead) ||
        (activeTab === 'high' && announcement.priority === 'high');
      
      return matchesSearch && matchesTab;
    });
  };
  
  const filteredAnnouncements = filterAnnouncements();
  const unreadCount = announcements.filter(a => !a.isRead).length;
  const highPriorityCount = announcements.filter(a => a.priority === 'high').length;
  
  const getAnnouncementIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case 'normal':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'low':
        return <Calendar className="h-5 w-5 text-muted-foreground" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };
  
  const getAnnouncementBg = (announcement: Announcement) => {
    if (!announcement.isRead) {
      return announcement.priority === 'high'
        ? 'bg-red-50 border-red-100'
        : 'bg-blue-50 border-blue-100';
    }
    return '';
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Clinic Announcements</CardTitle>
            <CardDescription>
              Important updates and notifications from your healthcare providers
            </CardDescription>
          </div>
          
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={handleMarkAllAsRead}
            >
              <CheckCircle className="h-4 w-4" />
              Mark all as read
            </Button>
          )}
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread" className="relative">
                Unread
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="high" className="relative">
                Important
                {highPriorityCount > 0 && (
                  <Badge variant="destructive" className="ml-1 h-5 px-1">
                    {highPriorityCount}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="relative w-64 ml-4">
            <Input
              type="search"
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map(announcement => (
              <div 
                key={announcement.id} 
                className={`p-4 border rounded-md transition-colors ${getAnnouncementBg(announcement)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="pt-1">
                    {getAnnouncementIcon(announcement.priority)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{announcement.title}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {announcement.date.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        
                        {announcement.priority === 'high' && (
                          <Badge variant="destructive">Important</Badge>
                        )}
                        
                        {!announcement.isRead && (
                          <Badge variant="secondary">New</Badge>
                        )}
                      </div>
                    </div>
                    
                    <p className="mt-2 text-sm">{announcement.content}</p>
                    
                    {!announcement.isRead && (
                      <div className="mt-3 flex justify-end">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-muted-foreground"
                          onClick={() => handleMarkAsRead(announcement.id)}
                        >
                          Mark as read
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <ClipboardList className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-medium">No announcements found</h3>
              <p className="text-muted-foreground mt-2">
                {searchQuery ? 'Try adjusting your search query.' : 'Check back later for updates from the clinic.'}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnnouncementFeed;
