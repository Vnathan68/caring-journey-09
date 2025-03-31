
import React from 'react';
import { Bell, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type AnnouncementPriority = 'high' | 'normal' | 'low';

interface AnnouncementType {
  id: string;
  title: string;
  content: string;
  date: Date;
  priority: AnnouncementPriority;
  isRead: boolean;
}

interface AnnouncementsCardProps {
  announcements: AnnouncementType[];
}

const AnnouncementsCard: React.FC<AnnouncementsCardProps> = ({ announcements }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-medium">Clinic Announcements</CardTitle>
            <CardDescription>Latest updates from the clinic</CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-foreground" 
            onClick={() => window.location.href = '/dashboard/announcements'}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {announcements.slice(0, 2).map(announcement => (
            <div key={announcement.id} className={`p-3 rounded-md ${announcement.isRead ? 'bg-slate-50' : 'bg-clinic-50'}`}>
              <div className="flex justify-between">
                <h4 className="font-medium">{announcement.title}</h4>
                <span className="text-xs text-muted-foreground">
                  {announcement.date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
                </span>
              </div>
              <p className="text-sm mt-1">{announcement.content}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={() => window.location.href = '/dashboard/announcements'}
          >
            View All Announcements
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnnouncementsCard;
