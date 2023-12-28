import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import SideBarUsers from "../components/sidebar/SideBarUsers";
import ConversationList from "./components/ConversationList";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users=await getUsers()

  return (
    <SideBarUsers>
      <div className=" h-full ">
        <ConversationList users={users} initialItems={conversations} />
        {children}
      </div>
    </SideBarUsers>
  );
}
