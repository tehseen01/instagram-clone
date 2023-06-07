import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IChatProfileProp {
  _id: string;
  profilePicture: string;
  name: string;
  username: string;
}

export const ChatProfile = ({ user }: { user: IChatProfileProp }) => {
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center gap-4 my-4">
        <div className="w-28 h-28">
          <Image
            src={user?.profilePicture || "/blank-profile.jpg"}
            width={200}
            height={200}
            alt={`this profile belong to ${user?.username}`}
            className="rounded-full w-full h-full object-cover"
          />
        </div>
        <div className="text-center">
          <h1 className="font-bold text-base">{user?.name}</h1>
          <h2 className="text-gray-500">{user?.username}</h2>
        </div>
        <div>
          <Link
            href={`/[profile]`}
            className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
          >
            View profile
          </Link>
        </div>
      </div>
    </div>
  );
};
