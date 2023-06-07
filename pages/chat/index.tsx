import React from "react";
import ChatLayout from "../../components/layout/ChatLayout";
import { BsChatDots } from "react-icons/bs";

const chat = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center gap-4">
      <div>
        <BsChatDots className="w-20 h-20" />
      </div>
      <div className="text-center">
        <h1 className="text-lg font-medium">Start your conversation</h1>
        <p className="text-gray-500">
          Send private photos and messages to a friend
        </p>
      </div>
    </div>
  );
};

chat.PageLayout = ChatLayout;

export default chat;
