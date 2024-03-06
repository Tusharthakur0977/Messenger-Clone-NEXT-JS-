'use client';

import useConversation from '@/app/hooks/useConversation';
import { FullMessageType } from '@/app/types';
import React, { useEffect, useRef, useState } from 'react';
import MessageBox from './MessageBox';
import axios from 'axios';

interface IConversationIdBodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<IConversationIdBodyProps> = ({ initialMessages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState(initialMessages);

  const { conversationId } = useConversation();

  const renderMessages = React.useMemo(() => {
    return messages.map((message, i) => (
      <MessageBox
        isLast={i === messages.length - 1}
        key={message.id}
        data={message}
      />
    ));
  }, [messages]);

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className='flex-1 overflow-y-auto'>
      <div></div>
      {renderMessages}
      <div ref={bottomRef} className='pt-24' />
    </div>
  );
};

export default Body;
