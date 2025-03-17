
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NotificationItemProps {
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  title: string;
  content: string;
  time: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  icon: Icon,
  iconColor,
  iconBgColor,
  title,
  content,
  time,
}) => {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-start gap-3">
        <div className={`${iconBgColor} rounded-full p-2`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">
            {content}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{time}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
