import Image from "next/image";
import React from "react";
import { SearchUser } from "../chat";
import Link from "next/link";
import { useProfileData, useWindowSize } from "../../hooks";
import { fetchChats } from "../../lib/requests/chat";
import { useQuery } from "@tanstack/react-query";
import { IError } from "../../lib/interface";
import { toast } from "react-toastify";
import Loader from "../loaders/Loader";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  const { width } = useWindowSize();
  const { userData } = useProfileData();

  const { data, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: fetchChats,
    onError: (error: IError) => {
      toast.error(error.message);
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="ml flex ">
      <aside className="border-r md:w-[350px] w-full bg-white z-20">
        <SearchUser />
        <div className="text-lg font-semibold p-2">Messages</div>
        <div className="overflow-y-scroll h-[calc(100vh_-_103px)]">
          {data &&
            data?.length > 0 &&
            data.map((chats) => {
              const chatUser = chats?.participants?.filter(
                (participant) => participant?._id !== userData?._id
              );

              return chatUser.map((user) => (
                <Link
                  href={`/chat/${user?._id}`}
                  className="hover:bg-gray-200 flex items-center gap-4 px-3 py-2"
                  key={user?._id}
                >
                  <div className="w-12 h-12">
                    <Image
                      src={user?.profilePicture || "/profile.jpg"}
                      width={200}
                      height={200}
                      alt={user?.name}
                      className="rounded-full object-cover h-full w-full"
                    />
                  </div>
                  <div>
                    <h2 className="font-medium">{user?.name}</h2>
                    <p className="text-slate-600">
                      {chats?.latestMessage?.content.length > 20
                        ? chats?.latestMessage?.content.substring(0, 21) + "..."
                        : chats?.latestMessage?.content}
                    </p>
                  </div>
                </Link>
              ));
            })}
        </div>
      </aside>
      <main className="flex-grow max-md:hidden ">
        {width >= 768 && children}
      </main>
    </div>
  );
};

export default ChatLayout;
