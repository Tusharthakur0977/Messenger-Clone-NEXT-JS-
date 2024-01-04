'use client';

import React from 'react';
import useConversation from '../hooks/useConversation';
import clsx from 'clsx';
import EmptyState from '../_components/EmptyState';

const Conversations = () => {
  const { isOpen } = useConversation();
  return (
    <div
      className={clsx('lg:pl-80 h-full lg:block', isOpen ? 'block' : 'hidden')}
    >
      <EmptyState />
    </div>
  );
};

export default Conversations;
