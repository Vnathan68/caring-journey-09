
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Contact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
}

interface ContactItemProps {
  contact: Contact;
  isSelected: boolean;
  onClick: () => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, isSelected, onClick }) => {
  return (
    <div
      className={`
        p-4 border-b cursor-pointer hover:bg-slate-100 transition-colors
        ${isSelected ? 'bg-slate-100' : ''}
      `}
      onClick={onClick}
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
  );
};

export default ContactItem;
