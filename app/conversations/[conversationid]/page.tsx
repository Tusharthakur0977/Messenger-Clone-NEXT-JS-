import getConversationById from '@/app/_actions/getConversationById';
import EmptyState from '@/app/_components/EmptyState';
import Header from './components/Header';
import getMessages from '@/app/_actions/getMessages';
import Body from './components/Body';
import Form from './components/Form';

interface IConversationIdProps {
  conversationid: string;
}

const ConversationId = async ({ params }: { params: IConversationIdProps }) => {
  const conversation = await getConversationById(params.conversationid);
  const messages = await getMessages(params.conversationid);

  if (!conversation) {
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
        <Header conversation={conversation!} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
