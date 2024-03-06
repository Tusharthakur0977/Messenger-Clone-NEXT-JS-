import getUsers from '../_actions/getUsers';
import SideBar from '../_components/Sidebar/SideBar';
import UsersList from './components/UsersList';

export default async function usersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();

  return (
    <SideBar>
      <div className='h-full'>
        <UsersList users={users} />
        {children}
      </div>
    </SideBar>
  );
}
