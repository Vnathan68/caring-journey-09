
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContactsList from './message/ContactsList';
import MessageView from './message/MessageView';
import NotificationsTab from './message/NotificationsTab';

// Mock data for messages
const mockContacts = [
  {
    id: 'contact-1',
    name: 'Dr. Maria Santos',
    role: 'OB-GYN Specialist',
    avatar: '/doctors/doctor1.jpg',
    lastMessage: "Your test results look good. Let's discuss at your next appointment.",
    lastMessageTime: '2 hours ago',
    unread: true,
  },
  {
    id: 'contact-2',
    name: 'Dr. James Rodriguez',
    role: 'Family Planning Specialist',
    avatar: '/doctors/doctor2.jpg',
    lastMessage: 'Thank you for scheduling your consultation.',
    lastMessageTime: 'Yesterday',
    unread: false,
  },
  {
    id: 'contact-3',
    name: 'Front Desk',
    role: 'Administrative Staff',
    avatar: '/staff/admin.jpg',
    lastMessage: 'Your insurance has been verified for your next visit.',
    lastMessageTime: '2 days ago',
    unread: false,
  },
];

const mockMessages = [
  {
    id: 'msg-1',
    senderId: 'contact-1',
    content: "Good morning! I've reviewed your latest lab work.",
    timestamp: '9:30 AM',
    isFromContact: true,
  },
  {
    id: 'msg-2',
    senderId: 'contact-1',
    content: "Your iron levels are slightly low. I'd recommend increasing your intake of iron-rich foods or considering a supplement.",
    timestamp: '9:32 AM',
    isFromContact: true,
  },
  {
    id: 'msg-3',
    senderId: 'user',
    content: "Thank you, Doctor. I'll make sure to adjust my diet. Should I be concerned about this?",
    timestamp: '9:45 AM',
    isFromContact: false,
  },
  {
    id: 'msg-4',
    senderId: 'contact-1',
    content: "No need for concern. It's quite common during pregnancy. We'll monitor it at your next visit. Just make those dietary adjustments we discussed.",
    timestamp: '10:00 AM',
    isFromContact: true,
  },
  {
    id: 'msg-5',
    senderId: 'user',
    content: 'Is there anything specific I should eat?',
    timestamp: '10:05 AM',
    isFromContact: false,
  },
  {
    id: 'msg-6',
    senderId: 'contact-1',
    content: 'Lean red meat, spinach, beans, and fortified cereals are excellent sources. Your prenatal vitamin helps too, but these dietary sources are important.',
    timestamp: '10:12 AM',
    isFromContact: true,
  },
  {
    id: 'msg-7',
    senderId: 'contact-1',
    content: "Your test results look good. Let's discuss at your next appointment.",
    timestamp: '2:45 PM',
    isFromContact: true,
  },
];

const MessageCenter: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState(mockContacts[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = mockContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="overflow-hidden">
      <Tabs defaultValue="messages" className="h-[600px] flex flex-col">
        <TabsList className="grid grid-cols-2 w-full rounded-none">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="flex-1 flex overflow-hidden m-0 p-0">
          <ContactsList 
            contacts={filteredContacts}
            searchQuery={searchQuery}
            selectedContactId={selectedContact.id}
            onSearchChange={setSearchQuery}
            onSelectContact={setSelectedContact}
          />
          <MessageView 
            selectedContact={selectedContact}
            messages={mockMessages}
          />
        </TabsContent>

        <TabsContent value="notifications" className="m-0 p-0 flex-1 overflow-auto">
          <NotificationsTab />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default MessageCenter;
