import { makeRequest } from "./index";

interface IChatUser {
  _id: string;
  name: string;
  username: string;
  profilePicture: string;
}

interface ILatestMessage {
  _id: string;
  sender: IChatUser;
  content: string;
  chat: string;
  createdAt: Date;
  updatedAd: Date;
}

export interface IChat {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  participants: IChatUser[];
  latestMessage: ILatestMessage;
}

export const fetchChats = async (): Promise<IChat[]> => {
  try {
    const { data } = await makeRequest.get("/chat/");
    return data.chats;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    }
    console.log(err);
    throw new Error(err.message);
  }
};

export const accessChat = async (userId: string): Promise<IChat> => {
  try {
    const { data } = await makeRequest.post(`/chat/`, {
      userId,
    });

    return data.chat;
  } catch (err) {
    if (err.response && err.response.data) {
      console.log(err);
      throw new Error(err.response.data.message);
    }
    console.log(err);
    throw new Error(err.message);
  }
};

export interface IAllMessages {
  _id: string;
  chat: IChat;
  content: string;
  sender: IChatUser;
  createdAt: Date;
  updatedAt: Date;
}

export const getAllMessage = async (id: string): Promise<IAllMessages[]> => {
  try {
    const { data } = await makeRequest.get(`/message/${id}`);
    return data.messages;
  } catch (err) {
    if (err.response && err.response.data) {
      console.log(err);
      throw new Error(err.response.data.message);
    }
    console.log(err);
    throw new Error(err.message);
  }
};

interface ISendMessageProp {
  chatId: string;
  content: string;
}

export const sendMessage = async (
  message: ISendMessageProp
): Promise<IAllMessages[]> => {
  try {
    const { data } = await makeRequest.post(`/message/`, message);
    return data.messages;
  } catch (err) {
    if (err.response && err.response.data) {
      console.log(err);
      throw new Error(err.response.data.message);
    }
    console.log(err);
    throw new Error(err.message);
  }
};
