import React from 'react';
import DesktopSidebar from './DesktopSidebar';
import MobileSidebar from './MobileSidebar';
import getCurrentUser from '@/app/_actions/getCurrentUser';

async function SideBar({ children }: { children: React.ReactNode }) {
  const currentUSer = await getCurrentUser();

  return (
    <div className='h-full'>
      <DesktopSidebar currentUser={currentUSer!} />
      <MobileSidebar />
      <main className='lg:pl-20 h-full'>{children}</main>
    </div>
  );
}

export default SideBar;
