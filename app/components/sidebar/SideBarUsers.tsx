import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebarUsers from "./DesktopSidebarUsers";
import MobileFooterUsers from "./MobileFooterUsers";

async function SideBarUsers({ children }: { children: React.ReactNode }) {
  const currentUser =await getCurrentUser()

  return (
    <div className="h-full">
      <DesktopSidebarUsers currentUser={currentUser!} />
      <MobileFooterUsers />
      <main className="lg:pl-20 h-full">{children} </main>
    </div>
  );
}

export default SideBarUsers;
