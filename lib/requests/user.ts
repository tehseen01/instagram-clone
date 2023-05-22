import { makeRequest } from ".";
import { DataMessage, IUpdateProfile, IUser } from "../interface";

export const getProfile = async (): Promise<IUser> => {
  try {
    const { data } = await makeRequest.get("/user/me");
    return { ...data.user, isAdmin: true };
  } catch (err) {
    if (err.response && err.response.data) {
      console.log(err);
      throw {
        status: err.response?.status,
        message: err.response?.data?.message,
      };
    }
    console.log(err);
    throw new Error(err.message);
  }
};

export const updateProfile = async (
  updated: IUpdateProfile
): Promise<DataMessage> => {
  try {
    const { data } = await makeRequest.put(`/user/update/profile`, updated);
    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    }
    console.log(err);
    throw new Error(err.message);
  }
};

export const fetchUser = async (idOrUsername: string): Promise<IUser> => {
  try {
    const { data } = await makeRequest.get(`/user/${idOrUsername}`);
    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message);
  }
};

interface ISearchUser {
  name: string;
  username: string;
  profilePicture: string;
  _id: string;
}

export const searchUser = async (keyword: string): Promise<ISearchUser[]> => {
  try {
    const { data } = await makeRequest.get(`/user?q=${keyword}`);
    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    }
    console.log(err);
    throw new Error(err.message);
  }
};

export const suggestedUser = async (): Promise<IUser[]> => {
  try {
    const { data } = await makeRequest.get("/user/random/u");
    return data.users;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    }
    console.log(err);
    throw new Error(err.message);
  }
};

export const followOrUnFollowUser = async (
  id: string
): Promise<DataMessage> => {
  try {
    const { data } = await makeRequest.put(`/user/follow/${id}`);
    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    }
    console.log(err);
    throw new Error(err.message);
  }
};
