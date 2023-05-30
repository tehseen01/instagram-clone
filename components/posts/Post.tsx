import Image from "next/image";
import { IComment, IError, IUser } from "../../lib/interface";

import AddComment from "../comments/AddComment";
import PostHeader from "./PostHeader";
import PostBtn from "./PostBtns";

import { useAppDispatch } from "../../redux/store";
import { handelLikesUser, openLikeModal } from "../../redux/slices/modalSlice";
import { BsHeartFill } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost } from "../../lib/requests";
import { toast } from "react-toastify";
import { useState } from "react";
import PostImg from "./PostImg";

interface IPostProp {
  id: string;
  img: string;
  caption: string;
  time: Date;
  likes: IUser[];
  comments: IComment[];
  user: IUser;
}

const Post = ({ id, img, caption, likes, time, user }: IPostProp) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { mutate, data } = useMutation(likePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error: IError) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="md:p-4 py-2 lg:px-16">
      <PostHeader user={user} time={time} id={id} />

      <PostImg
        time={time}
        username={user.username}
        mutate={mutate}
        img={img}
        id={id}
        extraClassName="flex justify-center"
      />

      {/* Buttons */}
      <PostBtn likes={likes} id={id} data={data} mutate={mutate} />

      {likes && likes.length > 0 && (
        <div
          className="px-2 cursor-pointer md:border-x"
          onClick={() => {
            dispatch(openLikeModal(true)), dispatch(handelLikesUser(likes));
          }}
        >
          {likes.length} likes
        </div>
      )}

      {/* Caption */}
      <p className="truncate px-2 md:border-x">
        <span className="font-semibold mr-2">{user?.username}</span>
        {caption}
      </p>

      {/* Input  box*/}
      <AddComment id={id} />
    </div>
  );
};

export default Post;
