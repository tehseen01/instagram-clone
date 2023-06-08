import React, { useEffect, useRef, useState } from "react";
import { IAllMessages, IChat } from "../../lib/requests/chat";
import { useProfileData } from "../../hooks";
import clsx from "clsx";
import Image from "next/image";
import { ChatHeader } from "./ChatHeader";
import { ChatProfile } from "./ChatProfile";
import { ScrollToBottom } from "../common/ScrollToBottom";
import {
  isLastMessage,
  isSameSender,
  isSameUser,
} from "../../lib/config/chatLogic";

interface IConversationProp {
  messages: IAllMessages[];
  chatAccess: IChat;
}

export const Conversation = ({ messages, chatAccess }: IConversationProp) => {
  const { userData } = useProfileData();

  const participant = chatAccess?.participants.find(
    (participant) => participant._id !== userData?._id
  );

  return (
    <section className="overflow-y-scroll h-[calc(100vh_-_60px)] relative ">
      <ChatHeader user={participant} />
      <ChatProfile user={participant} />
      {messages &&
        messages.length > 0 &&
        messages?.map((message, i) => (
          <div
            key={message?._id}
            className={clsx(
              "px-2",
              isLastMessage(messages, i, userData._id) ? "" : ""
            )}
          >
            <div
              className={clsx(
                "flex gap-1 items-center",
                userData?._id === message?.sender?._id
                  ? "justify-end"
                  : "justify-start"
              )}
            >
              {isSameSender(messages, i, message, userData._id) ||
              isLastMessage(messages, i, userData._id) ? (
                <div className="w-8 h-8">
                  <Image
                    src={
                      message?.sender?.profilePicture || "/blank-profile.jpg"
                    }
                    width={100}
                    height={100}
                    alt={message?.sender?.name}
                    className="rounded-full object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-8 h-8"></div>
              )}
              <div
                className={clsx(
                  " rounded-lg p-2 max-w-[80%] md:max-w-md",
                  isSameUser(messages, i, message) ? "mt-1" : "mt-3",
                  message?.sender?._id === userData?._id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                )}
              >
                {message?.content}
              </div>
            </div>
          </div>
        ))}
      <ScrollToBottom />
    </section>
  );
};
