import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { BsBookmark, BsSend, BsTrash3 } from "react-icons/bs";
import { FiUserMinus, FiUserPlus } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { closePostMenuModal } from "../../redux/slices/modalSlice";
import { deletePost } from "../../lib/requests";
import { useFollowControl, useProfileData } from "../../hooks";
import { IError } from "../../lib/interface";
import Link from "next/link";

const PostMenuModal = () => {
  const { follow } = useFollowControl();
  const { userData } = useProfileData();

  const dispatch = useAppDispatch();
  const { postMenuControl } = useAppSelector((state) => state.modal);

  const router = useRouter();

  const postId = router.asPath.split("/").pop();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: (data) => {
      if (router.asPath === `/post/${postId}`) {
        router.back();
      }
      queryClient.invalidateQueries(["posts"]);
      toast.warning(data.message);
    },
    onError: (error: IError) => {
      toast.error(error.message);
    },
  });

  return (
    <section className="flex sm:items-center items-end justify-center  overlay max-h-screen sm:py-6">
      <button
        className="sm:block hidden absolute top-5 right-5 z-20 text-white"
        onClick={() => dispatch(closePostMenuModal(false))}
      >
        <MdClose className="w-6 h-6" />
      </button>

      <div className="sm:w-1/3 w-full bg-white sm:rounded-md rounded-t-md max-sm:h-[350px]">
        <div className="flex items-center gap-4 sm:justify-center p-3 border-b">
          <BsBookmark className="w-5 h-5 block sm:hidden" /> <span>Save</span>
        </div>
        <div className="flex items-center gap-4 sm:justify-center p-3 border-b">
          <BsSend className="w-5 h-5 block sm:hidden" /> <span>Share</span>
        </div>
        <Link
          href={`/post/${postMenuControl?.id}`}
          className="flex items-center gap-4 sm:justify-center p-3 border-b"
          onClick={() => dispatch(closePostMenuModal(false))}
        >
          <span>Go to post</span>
        </Link>
        {postMenuControl &&
        Object.entries(postMenuControl).length > 0 &&
        userData.posts.some((post) => post._id === postMenuControl?.id) ? (
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
            onClick={() => follow.mutate(postMenuControl?.user?._id)}
          >
            {userData?.followings.includes(postMenuControl?.user?._id) ? (
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
