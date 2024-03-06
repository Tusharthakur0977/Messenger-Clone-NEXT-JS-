import Avatar from '@/app/_components/Avatar';
import useOtherUser from '@/app/hooks/useOtherUser';
import { FullConversationType } from '@/app/types';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface IConversationBox {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationCard: React.FC<IConversationBox> = ({ data, selected }) => {
  const router = useRouter();
  const session = useSession();

  const otherUser = useOtherUser(data);

  const handleClick = React.useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [router, data.id]);

  const lastMessage = React.useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = React.useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = React.useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    if (!userEmail) {
      return false;
    }

    const seenArray = lastMessage.seen || [];
    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [lastMessage, userEmail]);

  const lastMessageText = React.useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent an Image';
    }
    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return 'Started a Conversation';
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `w-full relative flex items-center space-x-3 p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer`,
        selected ? 'bg-neutral-100' : 'bg-white'
      )}
    >
      <Avatar user={otherUser!} />
      <div className='min-w-0 flex-1'>
        <div className='focus:outline-none '>
          <div className='flex justify-between items-center mb-1'>
            <p className='text-md font-medium text-gray-900'>
              {data.name || otherUser?.name}
            </p>
            {lastMessage?.createdAt && (
              <p
                className='
                  text-xs 
                  text-gray-400 
                  font-light
                '
              >
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `
              truncate 
              text-sm
              `,
              hasSeen ? 'text-gray-500' : 'text-black font-bold'
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationCard;
