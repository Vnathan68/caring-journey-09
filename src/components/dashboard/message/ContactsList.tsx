
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search, User } from 'lucide-react';
import ContactItem from './ContactItem';

interface Contact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
}

interface ContactsListProps {
  contacts: Contact[];
  searchQuery: string;
  selectedContactId: string;
  onSearchChange: (query: string) => void;
  onSelectContact: (contact: Contact) => void;
}

const ContactsList: React.FC<ContactsListProps> = ({
  contacts,
  searchQuery,
  selectedContactId,
  onSearchChange,
  onSelectContact,
}) => {
  return (
    <div className="w-full md:w-80 border-r bg-slate-50 flex flex-col">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <User className="h-8 w-8 text-muted-foreground opacity-50" />
            <p className="mt-2 text-center text-sm text-muted-foreground">
              No contacts found
            </p>
          </div>
        ) : (
          contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              isSelected={selectedContactId === contact.id}
              onClick={() => onSelectContact(contact)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ContactsList;
