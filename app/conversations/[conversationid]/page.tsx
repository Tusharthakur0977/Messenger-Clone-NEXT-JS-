import getConversation from '@/app/_actions/getConversation';
import getConversationById from '@/app/_actions/getConversationById';
import EmptyState from '@/app/_components/EmptyState';
import React from 'react';
import Header from './components/Header';

interface IConversationIdProps {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IConversationIdProps }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getConversationById(params.conversationId);

  if (conversation) {
    return (
      <div className='lg:pl-80 h-full'>
        <div className='flex h-full flex-col'>
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className='lg:pl-80 h-full'>
      <div className='h-full flex flex-col'>
        <Header conversation={conversation} />
        {/* <Body initialMessages={messages} /> */}
        {/* <Form /> */}
      </div>
    </div>
  );
};

export default ConversationId;
