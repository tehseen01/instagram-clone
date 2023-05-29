import React, { ReactNode, useEffect } from "react";
import Overlay from "../common/Overlay";
import { MdClose } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { closeFollowModal } from "../../redux/slices/followSlice";
import { IError, IUser } from "../../lib/interface";
import Image from "next/image";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followOrUnFollowUser } from "../../lib/requests";
import { toast } from "react-toastify";

interface IFollowModalProp {
  data: IUser;
  owner: IUser;
}

const FollowsModal = ({ data, owner }: IFollowModalProp) => {
  const dispatch = useAppDispatch();

  const { isFollowData } = useAppSelector((state) => state.follow);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: followOrUnFollowUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error: IError) => {
      toast.error(error.message);
    },
  });

  return (
    <Overlay className="">
      <div className="w-[400px] h-[400px] bg-white rounded-md overflow-hidden max-sm:w-11/12">
        <div className="flex items-center border-b p-2">
          <div className="flex-1 text-center font-semibold">
            {isFollowData ? "followers" : "followings"}
          </div>{" "}
          <div
            onClick={() => dispatch(closeFollowModal(false))}
            className="cursor-pointer"
          >
            <MdClose className="w-6 h-6" />
          </div>
        </div>{" "}
        {isFollowData ? (
          <div className="p-4 overflow-y-scroll h-400-41">
            {data.followers.map((user) => (
              <FollowList user={user} key={user._id}>
                <button
                  className={`
                  ${
                    owner.followings.some(
                      (followingUser) => followingUser._id === user._id
                    )
                      ? "bg-gray-200"
                      : "bg-blue-400 text-white"
                  }
                  px-2 py-1 rounded-md`}
                  onClick={() => mutate(user?._id)}
                >
                  {owner.followings.some(
                    (followingUser) => followingUser._id === user._id
                  )
                    ? "following"
                    : "follow"}
                </button>
              </FollowList>
            ))}
          </div>
        ) : (
          <div className="p-4 overflow-y-scroll h-400-41">
            {data.followings.map((user) => (
              <FollowList user={user} key={user._id}>
                <button
                  className={`${
                    owner.followings.some(
                      (followingUser) => followingUser._id === user._id
                    )
                      ? "bg-gray-200"
                      : "bg-blue-400 text-white"
                  }
                  px-2 py-1 rounded-md`}
                  onClick={() => mutate(user?._id)}
                >
                  {owner.followings.some(
                    (followingUser) => followingUser._id === user._id
                  )
                    ? "following"
                    : "follow"}
                </button>
              </FollowList>
            ))}
          </div>
        )}
      </div>
    </Overlay>
  );
};

export default FollowsModal;

interface IFollowListProp {
  user: IUser;
  children: ReactNode;
}

const FollowList = ({ user, children }: IFollowListProp) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center gap-4 mb-2">
      <div className="w-[55px] h-[55px] overflow-hidden rounded-full">
        <Image
          src={user?.profilePicture || "/blank-profile.jpg"}
          width={55}
          height={55}
          alt={user?.username}
          className="w-[55px] h-[55px] object-cover"
        />
      </div>
      <div className="flex-1">
        <Link
          href={"[profile]"}
          as={`${user.username}`}
          className="font-bold"
          onClick={() => dispatch(closeFollowModal(false))}
        >
          {user?.username}
        </Link>
        <p className="text-gray-500">{user?.name}</p>
      </div>
      {children}
    </div>
  );
};
