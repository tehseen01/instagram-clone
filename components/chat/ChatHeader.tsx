import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { BsChevronLeft } from "react-icons/bs";

interface IChatHeaderProp {
  _id: string;
  profilePicture: string;
  name: string;
  username: string;
}

export const ChatHeader = ({ user }: { user: IChatHeaderProp }) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4 border-b sticky inset-x-0 top-0 bg-white  px-3 py-2">
      <div className="cursor-pointer" onClick={() => router.back()}>
        <BsChevronLeft className="w-5 h-5" />
      </div>
      <div className="w-10 h-10">
        <Image
          src={user?.profilePicture || "/blank-profile.jpg"}
          width={200}
          height={200}
          alt={`this profile belong to ${user?.username}`}
          className="rounded-full w-full h-full object-cover"
        />
      </div>
      <div>
        <h1 className="font-semibold">{user?.name}</h1>
        <h2 className="text-gray-500">{user?.username}</h2>
      </div>
    </div>
  );
};
