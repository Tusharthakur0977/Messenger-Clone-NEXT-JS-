import getConversation from '../_actions/getConversation';
import SideBar from '../_components/Sidebar/SideBar';
import ConversationList from './components/ConversationList';

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversation();

  return (
    <SideBar>
      <div className='h-full'>
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </SideBar>
  );
}
