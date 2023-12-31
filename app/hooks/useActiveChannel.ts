import { useEffect, useState } from "react";
import useActiveList from "./useActiveList";
import { Channel, Members } from "pusher-js";
import { pusherClient } from "../libs/pusher";

const useActiveChannel = () => {
  const { set, remove, add } = useActiveList();
  const [acticeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    let channel = acticeChannel;
    if (!channel) {
      channel = pusherClient.subscribe("presence-messenger");
      setActiveChannel(channel);
    }
    channel.bind("pusher:subscription_succeeded", (members: Members) => {
      const initialMembers: string[] = [];
      members.each((member: Record<string, any>) =>
        initialMembers.push(member.id)
      );
      set(initialMembers)
    });
    channel.bind("pusher:member_added",(member:Record<string,any>)=>{
        add(member.id)
    })
    channel.bind("pusher:member_remove",(member:Record<string,any>)=>{
        remove(member.id)
    })
    return ()=>{
        if(acticeChannel){
            pusherClient.unsubscribe("presence-messenger")
            setActiveChannel(null)
        }
    }
  }, [acticeChannel,set,add,remove]);
};

export default useActiveChannel;
