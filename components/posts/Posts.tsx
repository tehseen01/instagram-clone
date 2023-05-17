import { useQuery } from "@tanstack/react-query";
import CommentModal from "../comments/CommentModal";
import PostMenuModal from "../modals/PostMenuModal";
import Post from "./Post";
import Loader from "../loaders/Loader";
import { useAppSelector } from "../../redux/store";
import { fetchFollowingsPost, suggestionPosts } from "../../lib/utils/requests";

const Posts = () => {
  const { isPostModal, isOpenPostMenuModal } = useAppSelector(
    (state) => state.modal
  );

  const { isLoading, data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchFollowingsPost,
  });

  const posts = useQuery({
    queryKey: ["postsSuggestions"],
    queryFn: suggestionPosts,
  });

  // if (error) {
  //   return error.message;
  // }

  if (isLoading || posts.isLoading) {
    return <Loader />;
  }
  if (posts.isLoading) {
    return <Loader />;
  }

  return (
    <div className="mb-16">
      {data && data.length > 0 ? (
        data.map((post) => (
          <Post
            key={post._id}
            id={post._id}
            username={post?.userId?.username}
            caption={post?.caption}
            userImg={post?.userId?.profilePicture}
            img={post?.img}
            time={post?.createdAt}
            likes={post?.likes}
            comments={post?.comments}
            user={post?.userId}
          />
        ))
      ) : (
        <>
          <div>Suggestions</div>
          {posts.data && posts.data.length > 0 ? (
            posts?.data?.map((post) => (
              <Post
                key={post._id}
                id={post._id}
                username={post?.userId?.username}
                caption={post?.caption}
                userImg={post?.userId?.profilePicture}
                img={post?.img}
                time={post?.createdAt}
                likes={post?.likes}
                comments={post?.comments}
                user={post?.userId}
              />
            ))
          ) : (
            <div>No posts here!</div>
          )}
        </>
      )}

      {isOpenPostMenuModal === true && <PostMenuModal />}
      {isPostModal && <CommentModal />}
    </div>
  );
};

export default Posts;
