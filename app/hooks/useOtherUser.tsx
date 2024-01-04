import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import React from 'react';
import { FullConversationType } from '../types';

const useOtherUser = (
  conversation:
    | FullConversationType
    | {
        users: User[];
      }
) => {
  const session = useSession();

  const otherUser = React.useMemo(() => {
    const currentUSerEmail = session.data?.user?.email;

    const otherUser = conversation?.users.filter(
      (user) => user.email !== currentUSerEmail
    );
    if (otherUser) return otherUser[0];
  }, [session.data?.user?.email, conversation?.users]);

  return otherUser;
};

export default useOtherUser;
