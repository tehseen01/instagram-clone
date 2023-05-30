import React from "react";
import formattedDate from "../../lib/utils/formatedDate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../../lib/requests";
import { toast } from "react-toastify";
import { IError, IPost } from "../../lib/interface";
import Image from "next/image";
import { useProfileData } from "../../hooks";

interface ICommentBoxProp {
  postData: IPost;
  postId: string;
  extraClass: string;
}

const CommentBox = ({ postData, postId, extraClass }: ICommentBoxProp) => {
  const { userData } = useProfileData();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["posts"]);
      toast.success(data.message);
    },
    onError: (error: IError) => {
      toast.error(error.message);
    },
  });

  interface Ids {
    postId: string;
    commentId: string;
  }
  const handleDeleteComment = (ids: Ids) => {
    mutate(ids);
  };

  return (
    <>
      {postData?.comments && postData?.comments.length > 0 ? (
        <div className={`${extraClass} overflow-y-scroll`}>
          {postData?.comments.map((comment) => (
            <div key={comment._id} className="p-2 flex items-center gap-4">
              <Image
                src={comment?.userId?.profilePicture || "/blank-profile.jpg"}
                width={100}
                height={100}
                alt={comment?.userId?.username}
                className="w-8 !h-8 object-cover rounded-full"
              />
              <div className="flex-1 relative">
                <div className="flex gap-1 text-sm">
                  <h3 className="font-medium">{comment?.userId?.username}</h3>
                  <p>{comment?.comment}</p>
                </div>
                <div className="flex gap-3 items-center">
                  <span> {formattedDate(comment?.date)}</span>
                  <div>reply</div>
                  {(userData?._id === comment?.userId?._id ||
                    userData?.posts?.some(
                      (post: IPost) => post._id === postId
                    )) && (
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        handleDeleteComment({
                          postId: postData?._id,
                          commentId: comment?._id,
                        })
                      }
                    >
                      Delete
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`${extraClass} text-center border-x`}>No comments</div>
      )}
    </>
  );
};

export default CommentBox;
