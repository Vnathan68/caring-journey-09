
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type AnnouncementPriority = 'high' | 'normal' | 'low';

interface AnnouncementType {
  id: string;
  title: string;
  content: string;
  date: Date;
  priority: AnnouncementPriority;
  isRead: boolean;
}

interface ImportantAnnouncementBannerProps {
  announcements: AnnouncementType[];
}

const ImportantAnnouncementBanner: React.FC<ImportantAnnouncementBannerProps> = ({ announcements }) => {
  const hasImportantAnnouncements = announcements.some(a => !a.isRead && a.priority === 'high');
  
  if (!hasImportantAnnouncements) {
    return null;
  }
  
  return (
    <Card className="bg-amber-50 border-amber-200">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-amber-500" />
          <div className="flex-1">
            <p className="font-medium">Important Clinic Updates</p>
            <p className="text-sm text-muted-foreground">You have unread important announcements</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => window.location.href = '/dashboard/announcements'}>
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImportantAnnouncementBanner;
