import React from "react";
import { INotification } from "../../lib/interface";
import Image from "next/image";
import formattedDate from "../../lib/utils/formatedDate";
import Link from "next/link";

interface IFollowNotifyProp
  extends Pick<
    INotification,
    "comment" | "createdAt" | "post" | "sender" | "type" | "_id"
  > {}

const NotificationCard = ({
  sender,
  post,
  comment,
  type,
  createdAt,
  _id,
}: IFollowNotifyProp) => {
  return (
    <div className="flex items-center px-4 py-2 gap-4">
      <Link href={"[profile]"} as={`${sender.username}`}>
        <Image
          src={sender.profilePicture}
          width={44}
          height={44}
          alt={`This is the profile picture of ${sender.profilePicture}`}
          className="w-[44px] !h-[44px] rounded-full object-cover"
        />
      </Link>
      <div className="flex-1">
        <Link href={"[profile]"} as={`${sender.username}`}>
          <span className="font-bold">{sender.username}</span>{" "}
        </Link>
        {type === "follow" ? (
          <span>started following you</span>
        ) : type === "like" ? (
          <span>liked your photo</span>
        ) : (
          <span className="overflow-hidden whitespace-normal overflow-ellipsis">
            commented: {comment}
          </span>
        )}
        <span className="text-slate-500 ml-1">{formattedDate(createdAt)}</span>
      </div>
      {type === "follow" ? (
        <button>follow</button>
      ) : (
        <Link href={`/post/${post?._id}`}>
          <Image
            src={post.img}
            width={44}
            height={44}
            alt={`This post uploaded by ${post.userId}`}
            className="w-[44px] !h-[44px] object-cover"
          />
        </Link>
      )}
    </div>
  );
};

export default NotificationCard;
