
import React from 'react';

interface MessageProps {
  content: string;
  timestamp: string;
  isFromContact: boolean;
}

const MessageBubble: React.FC<MessageProps> = ({ content, timestamp, isFromContact }) => {
  return (
    <div className={`flex ${isFromContact ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`
          max-w-[80%] md:max-w-[70%] rounded-lg p-3
          ${isFromContact 
            ? 'bg-slate-100 text-foreground' 
            : 'bg-clinic-600 text-white'
          }
        `}
      >
        <p>{content}</p>
        <p className={`text-xs mt-1 ${isFromContact ? 'text-muted-foreground' : 'text-white/70'}`}>
          {timestamp}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
