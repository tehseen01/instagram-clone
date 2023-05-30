import React from "react";
import { IError, IPost } from "../../lib/interface";
import Post from "./Post";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUser, likePost } from "../../lib/requests";
import Image from "next/image";
import GalleryImg from "../common/GalleryImg";
import PostImg from "./PostImg";
import { toast } from "react-toastify";
import PostHeader from "./PostHeader";
import PostBtn from "./PostBtns";
import AddComment from "../comments/AddComment";
import { useAppDispatch } from "../../redux/store";
import { handelLikesUser, openLikeModal } from "../../redux/slices/modalSlice";
import CommentBox from "../comments/CommentBox";
import { useWindowSize } from "../../hooks";

interface ISinglePostProp {
  singleData: IPost;
}

const SinglePost = ({ singleData }: ISinglePostProp) => {
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();
  const { mutate, data } = useMutation(likePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error: IError) => {
      toast.error(error.message);
    },
  });

  const { data: userData } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchUser(singleData.userId.username as string),
  });

  return (
    <section className="md:p-4 flex flex-col gap-8">
      {width > 769 ? (
        <>
          {singleData && Object.keys(singleData).length > 0 ? (
            <div className="flex min-h-[520px] max-h-[580px]  lg:px-20">
              <div className="flex border flex-1">
                <PostImg
                  time={singleData.createdAt}
                  username={singleData.userId.username}
                  id={singleData._id}
                  img={singleData.img}
                  mutate={mutate}
                  extraClassName="flex justify-end"
                />
              </div>
              <div className="flex-1">
                <PostHeader
                  id={singleData._id}
                  time={singleData.createdAt}
                  user={singleData.userId}
                />

                <div className="">
                  <CommentBox
                    postData={singleData}
                    postId={singleData._id}
                    extraClass="h-[404px] min-h-[350px]"
                  />
                </div>

                <PostBtn
                  likes={singleData.likes}
                  id={singleData._id}
                  mutate={mutate}
                  data={data}
                />

                {singleData?.likes && singleData?.likes?.length > 0 && (
                  <div
                    className="px-2 cursor-pointer md:border-x"
                    onClick={() => {
                      dispatch(openLikeModal(true)),
                        dispatch(handelLikesUser(singleData?.likes));
                    }}
                  >
                    {singleData?.likes?.length} likes
                  </div>
                )}

                <AddComment id={singleData?._id} />
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <>
          {singleData && Object.keys(singleData).length > 0 ? (
            <Post
              key={singleData._id}
              id={singleData._id}
              caption={singleData?.caption}
              img={singleData?.img}
              time={singleData?.createdAt}
              likes={singleData?.likes}
              comments={singleData?.comments}
              user={singleData?.userId}
            />
          ) : null}
        </>
      )}
      {userData && Object.keys(userData).length > 0 ? (
        <div className=" md:px-20 px-4">
          <h2 className="py-2  text-slate-500">
            More posts from{" "}
            <span className="text-black font-semibold">
              {userData.username}{" "}
            </span>
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {userData?.posts
              ?.filter((post) => post?._id !== singleData?._id)
              .map((post) => (
                <GalleryImg post={post} key={post._id} />
              ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </section>
  );
};

export default SinglePost;
