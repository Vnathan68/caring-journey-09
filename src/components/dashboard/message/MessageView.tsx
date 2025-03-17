
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send } from 'lucide-react';
import MessageBubble from './MessageBubble';

interface Contact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isFromContact: boolean;
}

interface MessageViewProps {
  selectedContact: Contact;
  messages: Message[];
}

const MessageView: React.FC<MessageViewProps> = ({ selectedContact, messages }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // In a real app, this would send the message to an API
    console.log('Sending message:', newMessage);
    
    // Clear the input
    setNewMessage('');
  };

  return (
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
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            content={message.content}
            timestamp={message.timestamp}
            isFromContact={message.isFromContact}
          />
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
  );
};

export default MessageView;
