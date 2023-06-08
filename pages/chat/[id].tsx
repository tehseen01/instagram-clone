import ChatLayout from "../../components/layout/ChatLayout";
import { useRouter } from "next/router";
import { useWindowSize } from "../../hooks";
import { Conversation, MessageInput } from "../../components/chat";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { accessChat, getAllMessage } from "../../lib/requests/chat";
import { useEffect, useState } from "react";
import Loader from "../../components/loaders/Loader";

const chatBox = () => {
  const [messages, setMessages] = useState([]);
  const router = useRouter();
  const userId = router.query.id?.toString();

  const queryClient = useQueryClient();

  const {
    mutate,
    data: chatAccess,
    isLoading,
  } = useMutation({
    mutationFn: accessChat,
    onSuccess: (responseData) => {
      if (responseData && responseData._id) {
        queryClient.prefetchQuery(["messages"], () =>
          getAllMessage(responseData._id)
        );
      }
    },
  });

  useEffect(() => {
    if (userId) {
      mutate(userId);
    }
  }, [userId]);

  const chatId = chatAccess?._id;
  const { isLoading: messageLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: () => getAllMessage(chatId),
    onSuccess: (data) => {
      setMessages(data);
    },
    enabled: !!chatId,
  });

  if (isLoading || messageLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <Loader />
      </div>
    );
  }

  return (
    <div className="relative h-screen max-md:z-50 bg-white">
      <Conversation
        messages={messages}
        chatAccess={chatAccess}
        setMessages={setMessages}
      />
      <MessageInput chatAccess={chatAccess} />
    </div>
  );
};

chatBox.PageLayout = ({ children }: { children: React.ReactNode }) => {
  const { width } = useWindowSize();

  if (width > 768) {
    return <ChatLayout>{children}</ChatLayout>;
  }

  return <>{children}</>;
};

export default chatBox;
