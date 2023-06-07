import { IAllMessages } from "../requests";

export const isSameSender = (
  messages: IAllMessages[],
  i: number,
  message: IAllMessages,
  userId: string
) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== message.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (
  messages: IAllMessages[],
  i: number,
  userId: string
) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser = (
  messages: IAllMessages[],
  i: number,
  message: IAllMessages
) => {
  return i > 0 && messages[i - 1].sender._id === message.sender._id;
};
