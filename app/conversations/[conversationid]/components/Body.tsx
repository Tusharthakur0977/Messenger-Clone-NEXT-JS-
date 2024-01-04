import { Message } from '@prisma/client';
import React from 'react';

interface IConversationIdBodyProps {
  initialMessages: Message;
}

const Body: React.FC<IConversationIdBodyProps> = ({ initialMessages }) => {
  return <div className='flex-1 overflow-y-auto'>Body</div>;
};

export default Body;
