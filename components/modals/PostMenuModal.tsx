import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsBookmark, BsSend, BsTrash3 } from "react-icons/bs";
import { FiMinus, FiUserMinus, FiUserPlus } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { closePostMenuModal } from "../../redux/slices/modalSlice";
import {
  deletePost,
  followOrUnFollowUser,
  getProfile,
} from "../../lib/utils/requests";

const PostMenuModal = () => {
  const dispatch = useAppDispatch();
  const { postMenuControl } = useAppSelector((state) => state.modal);

  const router = useRouter();

  const postId = router.asPath.split("/").pop();

  const queryClient = useQueryClient();

  const [drag, setDrag] = useState(false);
  const [position, setPosition] = useState(0);
  const [height, setHeight] = useState(350);

  const { data: user } = useQuery({ queryKey: ["user"], queryFn: getProfile });

  const followUnFollow = useMutation(followOrUnFollowUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(data.message);
    },
  });

  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: (data) => {
      if (router.asPath === `/post/${postId}`) {
        router.back();
      }
      queryClient.invalidateQueries(["posts"]);
      toast.warning(data.message);
    },
  });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setPosition(e.clientY);
    setDrag(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (drag && e.clientY > position) {
      setPosition(e.clientY);
      setHeight(height - 2);
    }
  };

  useEffect(() => {
    if (height < 280) {
      dispatch(closePostMenuModal(false));
    }
  }, [height]);

  return (
    <section className="flex sm:items-center items-end justify-center  overlay max-h-screen sm:py-6">
      <button
        className="sm:block hidden absolute top-5 right-5 z-20 text-white"
        onClick={() => dispatch(closePostMenuModal(false))}
      >
        <MdClose className="w-6 h-6" />
      </button>

      <div
        className="sm:w-1/3 w-full bg-white sm:rounded-md rounded-t-md max-sm:h-[350px]"
        style={{ height: height }}
      >
        <div
          className="flex sm:hidden items-center justify-center cursor-pointer"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
        >
          <FiMinus className="w-10 h-8" />
        </div>
        <div className="flex items-center gap-4 sm:justify-center p-3 border-b">
          <BsBookmark className="w-5 h-5 block sm:hidden" /> <span>Save</span>
        </div>
        <div className="flex items-center gap-4 sm:justify-center p-3 border-b">
          <BsSend className="w-5 h-5 block sm:hidden" /> <span>Share</span>
        </div>
        {postMenuControl &&
        Object.entries(postMenuControl).length > 0 &&
        user.posts.some((post) => post._id === postMenuControl?.id) ? (
          <div
            className="flex items-center gap-4 sm:justify-center p-3 border-b text-red-500 cursor-pointer"
            onClick={() => {
              mutate(postMenuControl.id), dispatch(closePostMenuModal(false));
            }}
          >
            <BsTrash3 className="w-5 h-5 block sm:hidden" />
            <span>Delete</span>
          </div>
        ) : (
          <div
            className="flex items-center gap-4 sm:justify-center p-3 border-b cursor-pointer"
            onClick={() => followUnFollow.mutate(postMenuControl?.user?._id)}
          >
            {user?.followings.includes(postMenuControl?.user?._id) ? (
              <>
                <FiUserMinus className="w-5 h-5 block sm:hidden" />
                <span>Unfollow</span>
              </>
            ) : (
              <>
                <FiUserPlus className="w-5 h-5 block sm:hidden" />
                <span>follow</span>
              </>
            )}
          </div>
        )}

        <div
          className="flex items-center gap-4 sm:justify-center p-3 cursor-pointer"
          onClick={() => dispatch(closePostMenuModal(false))}
        >
          <span>Cancel</span>
        </div>
      </div>
    </section>
  );
};

export default PostMenuModal;
