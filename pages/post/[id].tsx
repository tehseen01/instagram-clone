import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import React from "react";
import { BsChevronLeft } from "react-icons/bs";

import Loader from "../../components/loaders/Loader";
import Post from "../../components/posts/Post";
import PostMenuModal from "../../components/modals/PostMenuModal";
import CommentModal from "../../components/comments/CommentModal";

import { useAppSelector } from "../../redux/store";
import { getSinglePost } from "../../lib/requests";
import { IError } from "../../lib/interface";
import { toast } from "react-toastify";
import SinglePost from "../../components/posts/SinglePost";

const post = () => {
  const router = useRouter();
  const id = router.query.id?.toString();

  const { isOpenPostMenuModal } = useAppSelector((state) => state.modal);

  const { isPostModal } = useAppSelector((state) => state.modal);

  const { data, isLoading } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getSinglePost(id),
    onError: (error: IError) => {
      toast.error(error.message);
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="ml sm:p-2 mb-16">
      <div className="px-4 py-2 flex items-center justify-center border-b md:hidden">
        <div onClick={() => router.back()} className="cursor-pointer flex-1">
          <BsChevronLeft className="w-5 h-5" />
        </div>
        <div className="flex-1 font-medium basis-2">Photo</div>
      </div>
      <SinglePost singleData={data} />

      {isOpenPostMenuModal === true && <PostMenuModal />}
      {isPostModal && <CommentModal />}
    </main>
  );
};

export default post;
