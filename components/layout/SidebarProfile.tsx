import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IUser } from "../../lib/interface";

interface SidebarProfileProp {
  data: IUser
}

const SidebarProfile = ({ data }: SidebarProfileProp) => {
  return (
    <div className="hidden xl:flex items-center justify-center flex-col">
      <Link
        className="hidden xl:flex items-center justify-center mb-2 cursor-pointer"
        href="/[profile]"
        as={`/${data?.username}`}
      >
        <Image
          src={data?.profilePicture || "/blank-profile.jpg"}
          alt={data?.username || "username"}
          className="rounded-full p-1 border border-red-400 w-24 !h-24 object-cover"
          width={200}
          height={200}
        />
      </Link>

      <h2 className="text-2xl font-bold capitalize">{data?.name}</h2>
      <h3 className="text-gray-400">@{data?.username}</h3>

      <div className="grid grid-cols-3 gap-2 my-4">
        <div className="border-r border-gray400 flex items-center flex-col justify-center">
          <span>{data?.posts?.length}</span>
          <p className="text-sm text-gray-400">Posts</p>
        </div>
        <div className="border-r border-gray400 flex items-center flex-col justify-center pr-2">
          <span>{data?.followers?.length}</span>
          <p className="text-sm text-gray-400">Followers</p>
        </div>
        <div className=" flex items-center flex-col justify-center">
          <span>{data?.followings?.length}</span>
          <p className="text-sm text-gray-400">Followings</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarProfile;
