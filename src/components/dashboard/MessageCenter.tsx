
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Send, User, Calendar, FileText, Heart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = mockContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // In a real app, this would send the message to an API
    console.log('Sending message:', newMessage);
    
    // Clear the input
    setNewMessage('');
  };

  return (
    <Card className="overflow-hidden">
      <Tabs defaultValue="messages" className="h-[600px] flex flex-col">
        <TabsList className="grid grid-cols-2 w-full rounded-none">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="flex-1 flex overflow-hidden m-0 p-0">
          {/* Contacts sidebar */}
          <div className="w-full md:w-80 border-r bg-slate-50 flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 overflow-auto">
              {filteredContacts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-4">
                  <User className="h-8 w-8 text-muted-foreground opacity-50" />
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    No contacts found
                  </p>
                </div>
              ) : (
                filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`
                      p-4 border-b cursor-pointer hover:bg-slate-100 transition-colors
                      ${selectedContact.id === contact.id ? 'bg-slate-100' : ''}
                    `}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium truncate">{contact.name}</h4>
                          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                            {contact.lastMessageTime}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{contact.role}</p>
                        <p className="text-sm truncate mt-1">
                          {contact.lastMessage}
                        </p>
                      </div>
                      {contact.unread && (
                        <div className="w-2.5 h-2.5 rounded-full bg-clinic-600 mt-1"></div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Message area */}
          <div className="flex-1 flex flex-col">
            {/* Contact header */}
            <div className="p-4 border-b flex items-center gap-3">
              <Avatar>
                <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{selectedContact.name}</h3>
                <p className="text-xs text-muted-foreground">{selectedContact.role}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isFromContact ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`
                      max-w-[80%] md:max-w-[70%] rounded-lg p-3
                      ${message.isFromContact 
                        ? 'bg-slate-100 text-foreground' 
                        : 'bg-clinic-600 text-white'
                      }
                    `}
                  >
                    <p>{message.content}</p>
                    <p className={`text-xs mt-1 ${message.isFromContact ? 'text-muted-foreground' : 'text-white/70'}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message input */}
            <div className="p-4 border-t flex gap-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-clinic-600 hover:bg-clinic-700 text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="m-0 p-0 flex-1 overflow-auto">
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Notifications</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-50 rounded-full p-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">Appointment Reminder</p>
                    <p className="text-sm text-muted-foreground">
                      Your prenatal checkup is scheduled for tomorrow at 10:00 AM with Dr. Maria Santos.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="bg-green-50 rounded-full p-2">
                    <FileText className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">Test Results Available</p>
                    <p className="text-sm text-muted-foreground">
                      Your blood work results are now available. Dr. Maria Santos has reviewed them.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="bg-red-50 rounded-full p-2">
                    <Heart className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium">Health Tip</p>
                    <p className="text-sm text-muted-foreground">
                      Remember to stay hydrated! Drinking enough water is important for you and your baby's health.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default MessageCenter;
