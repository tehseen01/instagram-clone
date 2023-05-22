import Image from "next/image";
import { IComment, IError, IUser } from "../../lib/interface";

import AddComment from "../comments/AddComment";
import PostHeader from "./PostHeader";
import PostBtn from "./PostBtns";

import { useAppDispatch } from "../../redux/store";
import { handelLikesUser, openLikeModal } from "../../redux/slices/modalSlice";
import { BsHeartFill } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost } from "../../lib/utils/requests";
import { toast } from "react-toastify";
import { useState } from "react";

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
  const [liked, setLiked] = useState(false);
  const [animateHeart, setAnimateHeart] = useState(false);

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
      {/* Header */}
      <PostHeader user={user} time={time} id={id} />

      {/* Img */}
      <div className="flex justify-center max-h-[600px] relative">
        <Image
          width={450}
          height={450}
          src={img}
          alt={`this post uploaded by ${user?.username} at ${time}`}
          className="object-scale-down  md:border-x"
          onDoubleClick={() => {
            mutate(id);
            setAnimateHeart(true);
            setTimeout(() => {
              setAnimateHeart(false);
            }, 1000);
          }}
        />
        {animateHeart && (
          <div className="absolute w-full h-full flex items-center justify-center">
            <BsHeartFill className="w-16 h-16 text-white animate-ping" />
          </div>
        )}
      </div>

      {/* Buttons */}
      <PostBtn
        likes={likes}
        id={id}
        data={data}
        mutate={mutate}
        liked={liked}
        setLiked={setLiked}
      />

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
