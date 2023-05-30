import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { handelPostModal, openPostModal } from "../../redux/slices/modalSlice";
import {
  BsBookmark,
  BsChat,
  BsHeart,
  BsHeartFill,
  BsSend,
} from "react-icons/bs";
import { useQueryClient } from "@tanstack/react-query";
import { DataMessage, IUser } from "../../lib/interface";

interface IPostBtnProp {
  id: string;
  likes: IUser[];
  data: DataMessage;
  mutate: (id: string) => void;
}

const PostBtn = ({ likes, id, mutate, data }: IPostBtnProp) => {
  const [liked, setLiked] = useState(false);
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();
  const userData: IUser = queryClient.getQueryData(["user"]);

  useEffect(() => {
    let isLiked = false;

    likes.some((like) => {
      isLiked = like?._id === userData?._id;
    });

    setLiked(isLiked);
  }, [likes, data]);

  return (
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
  );
};

export default PostBtn;
