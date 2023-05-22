import { makeRequest } from ".";
import { DataMessage, IUpdatePassword, IUser } from "../interface";

interface IRegisterUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface ILogin {
  usernameOrEmail: string;
  password: string;
}

export const signUpUser = async (user: IRegisterUser): Promise<IUser> => {
  try {
    const { data } = await makeRequest.post("/auth/register", user);
    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    }
    console.log(err);
    throw new Error(err.message);
  }
};

export const loginUser = async (user: ILogin): Promise<IUser> => {
  try {
    const { data } = await makeRequest.post("/auth/login", user);
    return data;
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

export const logoutUser = async (): Promise<DataMessage> => {
  try {
    const { data } = await makeRequest.get("/auth/logout");
    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    }
    console.log(err);
    throw new Error(err.message);
  }
};

export const updatePassword = async (
  value: IUpdatePassword
): Promise<DataMessage> => {
  try {
    const { data } = await makeRequest.put(`/user/update/password`, value);
    return data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    }
    console.log(err);
    throw new Error(err.message);
  }
};
