import React from "react";
import { IPost } from "../../lib/interface";
import { BsChatFill, BsFillHeartFill } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

interface IGalleryImgProp {
  post: IPost;
}

const GalleryImg = ({ post }: IGalleryImgProp) => {
  return (
    <Link
      href={`/post/${post?._id}`}
      key={post?._id}
      className="block relative pt-[100%] w-full h-full"
    >
      <Image
        src={post?.img}
        width={500}
        height={500}
        alt={`Photo by ${post?.userId?.name}`}
        className=" object-cover absolute m-auto top-0 left-0 right-0 bottom-0 w-full !h-full rounded-md"
      />
      <div className="absolute w-full h-full text-xl text-white bg-black/30 top-0 left-0 flex gap-4 items-center justify-center opacity-0 hover:opacity-100 rounded-md">
        <span className="flex items-center justify-center gap-1">
          <BsFillHeartFill className="w-5 h-5" /> {post?.likes?.length}
        </span>
        <span className="flex items-center justify-center gap-1">
          <BsChatFill className="w-5 h-5" /> {post?.comments?.length}
        </span>
      </div>
    </Link>
  );
};

export default GalleryImg;
