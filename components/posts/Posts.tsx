import React, { useState } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import CommentModal from "../comments/CommentModal";
import PostMenuModal from "../modals/PostMenuModal";
import Post from "./Post";
import Loader from "../loaders/Loader";
import Spinner from "../loaders/Spinner";

import { useAppSelector } from "../../redux/store";
import { userFeedPosts } from "../../lib/requests";

interface IErrorProp {
  status: number;
  message: string;
}

const Posts = () => {
  const { isPostModal, isOpenPostMenuModal } = useAppSelector(
    (state) => state.modal
  );

  const { data, isLoading, hasNextPage, fetchNextPage, error, isError } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam = 1 }) => userFeedPosts(pageParam),
      refetchOnWindowFocus: false,
      onError(err: IErrorProp) {
        console.log(err);
      },
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.page < lastPage.totalPages
          ? lastPage.page + 1
          : undefined;
      },
    });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="mb-16">
      {isError && <h2>{error.message}</h2>}
      {data && data?.pages.length > 0 ? (
        <InfiniteScroll
          dataLength={data ? data.pages?.length : 0}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={
            <div className="text-center">
              <Spinner className="w-6 h-6" />
            </div>
          }
          style={{ overflow: "unset" }}
          endMessage={<p className="text-center">No more posts!</p>}
        >
          {data?.pages?.map((page, i) => (
            <React.Fragment key={i}>
              {page.posts.map((post) => (
                <Post
                  key={post._id}
                  id={post._id}
                  caption={post?.caption}
                  img={post?.img}
                  time={post?.createdAt}
                  likes={post?.likes}
                  comments={post?.comments}
                  user={post?.userId}
                />
              ))}
            </React.Fragment>
          ))}
        </InfiniteScroll>
      ) : (
        <div>No posts here!</div>
      )}

      {isOpenPostMenuModal === true && <PostMenuModal />}
      {isPostModal && <CommentModal />}
    </div>
  );
};

export default Posts;
