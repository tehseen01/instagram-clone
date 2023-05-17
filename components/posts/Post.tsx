import { HiOutlineDotsHorizontal } from "react-icons/hi";
import {
  BsChat,
  BsBookmark,
  BsHeart,
  BsHeartFill,
  BsSend,
} from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AddComment from "../comments/AddComment";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../redux/store";
import formattedDate from "../../lib/utils/formatedDate";
import {
  handelLikesUser,
  handelPostModal,
  handlePostMenu,
  openLikeModal,
  openPostMenuModal,
  openPostModal,
} from "../../redux/slices/modalSlice";
import { IComment, IUser } from "../../lib/interface";
import { likePost } from "../../lib/utils/requests";

interface IPostProp {
  id: string;
  img: string;
  userImg: string;
  caption: string;
  username: string;
  time: Date;
  likes: IUser[];
  comments: IComment[];
  user: IUser;
}

const Post = ({
  id,
  img,
  caption,
  likes,
  time,
  user,
  userImg,
  username,
}: IPostProp) => {
  const [liked, setLiked] = useState(false);

  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();
  const userData: IUser = queryClient.getQueryData(["user"]);

  const { mutate, data } = useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      queryClient.invalidateQueries(["postsSuggestions"]);
    },
  });

  useEffect(() => {
    let isLiked = false;

    likes.some((like) => {
      isLiked = like?._id === userData?._id;
    });

    setLiked(isLiked);
  }, [likes, data]);

  return (
    <div className="md:p-4 py-2 lg:px-16">
      {/* Header */}
      <div className="flex items-center p-2 md:border">
        <Image
          src={userImg || "/blank-profile.jpg"}
          alt={username}
          width={50}
          height={50}
          className="rounded-full h-8 w-8 object-cover mr-3"
        />
        <div className="flex-1 flex items-center gap-2">
          <Link href="/[profile]" as={`/${username}`} className="font-semibold">
            {username}
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

      {/* Img */}
      <Image
        width={450}
        height={450}
        src={img}
        alt={caption}
        className="object-scale-down w-full max-h-[600px] md:border-x"
      />

      {/* Buttons */}
      <div className="flex justify-between py-3 px-2 md:border-x md:border-t">
        <div className="flex space-x-4 items-center">
          <button onClick={() => mutate(id)}>
            {!liked ? (
              <BsHeart className="btn" />
            ) : (
              <BsHeartFill className="btn text-red-500" />
            )}
          </button>
          <button
            onClick={() => {
              dispatch(openPostModal(true)), dispatch(handelPostModal({ id }));
            }}
          >
            <BsChat className="btn" />
          </button>
          <BsSend className="btn " />
        </div>
        <div>
          <BsBookmark className="btn" />
        </div>
      </div>

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
        <span className="font-semibold mr-2">{username}</span>
        {caption}
      </p>

      {/* Comments */}

      {/* Input  box*/}
      <AddComment id={id} />
    </div>
  );
};

export default Post;
