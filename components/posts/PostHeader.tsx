import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import formattedDate from "../../lib/utils/formatedDate";
import {
  handlePostMenu,
  openPostMenuModal,
} from "../../redux/slices/modalSlice";
import { useAppDispatch } from "../../redux/store";
import { IUser } from "../../lib/interface";

interface IPostHeaderProp {
  id: string;
  time: Date;
  user: IUser;
}

const PostHeader = ({ user, time, id }: IPostHeaderProp) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center p-2 md:border">
      <Image
        src={user?.profilePicture || "/blank-profile.jpg"}
        alt={user?.username}
        width={50}
        height={50}
        className="rounded-full h-8 w-8 object-cover mr-3"
      />
      <div className="flex-1 flex items-center gap-2">
        <Link
          href="/[profile]"
          as={`/${user?.username}`}
          className="font-semibold"
        >
          {user?.username}
        </Link>
        <span className="text-gray-400 text-sm">{formattedDate(time)}</span>
      </div>
      <HiOutlineDotsHorizontal
        className="h-6 cursor-pointer"
        onClick={() => {
          dispatch(openPostMenuModal(true)),
            dispatch(handlePostMenu({ user, id }));
        }}
      />
    </div>
  );
};

export default PostHeader;
