import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import React from "react";
import { BsChevronLeft } from "react-icons/bs";

import Loader from "../../components/loaders/Loader";
import Post from "../../components/posts/Post";
import PostMenuModal from "../../components/modals/PostMenuModal";
import CommentModal from "../../components/comments/CommentModal";

import { useAppSelector } from "../../redux/store";
import { getSinglePost } from "../../lib/utils/requests";

const post = () => {
  const router = useRouter();
  const id = router.query.id?.toString();

  const { isOpenPostMenuModal } = useAppSelector((state) => state.modal);

  const { isPostModal } = useAppSelector((state) => state.modal);

  const { data, isLoading } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getSinglePost(id),
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="ml sm:p-2 mb-16">
      <div className="px-4 py-2 flex items-center justify-center border-b">
        <div onClick={() => router.back()} className="cursor-pointer flex-1">
          <BsChevronLeft className="w-5 h-5" />
        </div>
        <div className="flex-1 font-medium basis-2">Photo</div>
      </div>
      {data && Object.keys(data).length > 0 ? (
        <Post
          key={data?._id}
          id={data?._id}
          caption={data?.caption}
          comments={data?.comments}
          img={data?.img}
          likes={data?.likes}
          time={data?.createdAt}
          userImg={data?.userId?.profilePicture}
          user={data?.userId}
          username={data?.userId?.username}
        />
      ) : null}

      {isOpenPostMenuModal === true && <PostMenuModal />}
      {isPostModal && <CommentModal />}
    </main>
  );
};

export default post;
