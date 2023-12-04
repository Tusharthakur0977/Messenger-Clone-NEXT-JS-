import SideBar from "../_components/Sidebar/SideBar";

export default async function usersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SideBar>
      <div className="h-full m-0">{children}</div>
    </SideBar>
  );
}
