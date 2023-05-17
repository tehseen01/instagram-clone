import React from "react";
import { IUser } from "../../lib/interface";

interface IProps {
  data: IUser;
}

const PostsFollowsCount = ({ data }: IProps) => {
  return (
    <div className="flex max-md:justify-around py-2 items-center md:gap-6">
      <div className="text-center">
        <span className="max-md:block md:mr-2 font-semibold">
          {data?.posts?.length}
        </span>
        Posts
      </div>
      <div className="text-center">
        <span className="max-md:block md:mr-2 font-semibold">
          {data?.followers?.length}
        </span>
        Followers
      </div>
      <div className="text-center">
        <span className="max-md:block md:mr-2 font-semibold">
          {data?.followings?.length}
        </span>
        Followings
      </div>
    </div>
  );
};

export default PostsFollowsCount;
