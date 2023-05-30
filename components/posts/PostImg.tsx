import Image from "next/image";
import React, { useState } from "react";
import { BsHeartFill } from "react-icons/bs";

interface IPostImgProp {
  img: string;
  time: Date;
  username: string;
  id: string;
  mutate: (id: string) => void;
  extraClassName: string;
}

const PostImg = ({
  img,
  time,
  username,
  mutate,
  id,
  extraClassName,
}: IPostImgProp) => {
  const [animateHeart, setAnimateHeart] = useState(false);

  return (
    <div className={` ${extraClassName} max-h-[600px] relative`}>
      <Image
        width={450}
        height={450}
        src={img}
        alt={`this post uploaded by ${username} at ${time}`}
        className="object-scale-down  md:border-x w-full"
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
  );
};

export default PostImg;
