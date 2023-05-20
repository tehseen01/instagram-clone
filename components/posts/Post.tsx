import Image from "next/image";
import { IComment, IUser } from "../../lib/interface";

import AddComment from "../comments/AddComment";
import PostHeader from "./PostHeader";
import PostBtn from "./PostBtns";

import { useAppDispatch } from "../../redux/store";
import { handelLikesUser, openLikeModal } from "../../redux/slices/modalSlice";

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

  return (
    <div className="md:p-4 py-2 lg:px-16">
      {/* Header */}
      <PostHeader user={user} time={time} id={id} />

      {/* Img */}
      <Image
        width={450}
        height={450}
        src={img}
        alt={`this post uploaded by ${user?.username} at ${time}`}
        className="object-scale-down w-full max-h-[600px] md:border-x"
      />

      {/* Buttons */}
      <PostBtn likes={likes} id={id} />

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
