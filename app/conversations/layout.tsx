import getConversations from "../actions/getConversations";
import SideBarUsers from "../components/sidebar/SideBarUsers";
import ConversationList from "./components/ConversationList";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();

  return (
    <SideBarUsers>
      <div className=" h-full ">
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </SideBarUsers>
  );
}
