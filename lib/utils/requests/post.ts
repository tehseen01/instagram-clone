import { toast } from "react-toastify";
import { makeRequest } from ".";
import { DataMessage, IPost } from "../../interface";

interface ICreatePost {
  caption: string;
  image: string;
}

export const createPost = async (post: ICreatePost): Promise<IPost> => {
  try {
    const { data } = await makeRequest.post("/posts", post);
    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    }
    console.log(err);
    throw new Error(err.message);
  }
};

interface IAllPosts {
  totalPages: number;
  currentPage: number;
  posts: IPost[];
}

export const fetchPosts = async (): Promise<IAllPosts> => {
  try {
    const { data } = await makeRequest.get("/posts");
    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    }
    console.log(err);
    throw new Error(err.message);
  }
};

export const fetchFollowingsPost = async (): Promise<IPost[]> => {
  try {
    const { data } = await makeRequest.get("/posts/followings");
    return data.posts;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    }
    console.log(err);
    throw new Error(err.message);
  }
};

export const deletePost = async (id: string): Promise<DataMessage> => {
  try {
    const { data } = await makeRequest.delete(`/posts/${id}`);
    console.log(data);
    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    }
    console.log(err);
    throw new Error(err.message);
  }
};

export const likePost = async (id: string): Promise<DataMessage> => {
  try {
    const { data } = await makeRequest.put(`/posts/like/${id}`);
    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    }
    console.log(err);
    throw new Error(err.message);
  }
};

export const postComment = async (
  id: string,
  comment: string
): Promise<DataMessage> => {
  try {
    const { data } = await makeRequest.post(`/posts/comment/${id}`, {
      comment,
    });

    toast.success(data.message);
    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    }
    console.log(err);
    throw new Error(err.message);
  }
};

export const deleteComment = async (ids: {
  postId: string;
  commentId: string;
}): Promise<DataMessage> => {
  try {
    const { postId, commentId } = ids;
    const { data } = await makeRequest.delete(`/posts/comment/${postId}`, {
      data: { commentId },
    });
    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    }
    console.log(err);
    throw new Error(err.message);
  }
};

export const getSinglePost = async (id: string): Promise<IPost> => {
  try {
    const { data } = await makeRequest.get(`/posts/post/${id}`);
    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    }
    console.log(err);
    throw new Error(err.message);
  }
};

export const suggestionPosts = async (): Promise<IPost[]> => {
  try {
    const { data } = await makeRequest.get(`/posts/timeline/all`);
    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    }
    console.log(err);
    throw new Error(err.message);
  }
};
