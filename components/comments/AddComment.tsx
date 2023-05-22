import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import { useAppSelector } from "../../redux/store";
import { postComment } from "../../lib/requests";

const AddComment = ({ id }: { id: string }) => {
  const [addComment, setAddComment] = useState("");
  const { commentsUser } = useAppSelector((state) => state.modal);

  const queryClint = useQueryClient();

  const handelComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await postComment(id, addComment);
    queryClint.invalidateQueries(["posts", id]);
    setAddComment("");
  };

  return (
    <div className="p-2 md:border-x md:border-b">
      <form className="flex items-center" onSubmit={handelComment}>
        <Image
          src={commentsUser?.profilePicture || "/blank-profile.jpg"}
          width={20}
          height={20}
          alt="comment user"
        />
        <input
          type="text"
          placeholder="Add comment"
          className="flex-1 border-none focus:ring-0 focus:outline-none focus:border-none"
          value={addComment}
          onChange={(e) => setAddComment(e.target.value)}
        />
        <button
          type="submit"
          className="text-blue-600 disabled:text-blue-300 text-medium"
          disabled={!addComment}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default AddComment;
