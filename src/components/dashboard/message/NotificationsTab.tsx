
import React from 'react';
import { Calendar, FileText, Heart } from 'lucide-react';
import NotificationItem from './NotificationItem';

const NotificationsTab: React.FC = () => {
  return (
    <div className="p-6">
      <h3 className="text-lg font-medium mb-4">Notifications</h3>
      <div className="space-y-4">
        <NotificationItem
          icon={Calendar}
          iconColor="text-blue-500"
          iconBgColor="bg-blue-50"
          title="Appointment Reminder"
          content="Your prenatal checkup is scheduled for tomorrow at 10:00 AM with Dr. Maria Santos."
          time="1 day ago"
        />
        <NotificationItem
          icon={FileText}
          iconColor="text-green-500"
          iconBgColor="bg-green-50"
          title="Test Results Available"
          content="Your blood work results are now available. Dr. Maria Santos has reviewed them."
          time="2 days ago"
        />
        <NotificationItem
          icon={Heart}
          iconColor="text-red-500"
          iconBgColor="bg-red-50"
          title="Health Tip"
          content="Remember to stay hydrated! Drinking enough water is important for you and your baby's health."
          time="3 days ago"
        />
      </div>
    </div>
  );
};

export default NotificationsTab;
