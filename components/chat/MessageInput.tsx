import { useState } from "react";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IChat, sendMessage } from "../../lib/requests";

export const MessageInput = ({ chatAccess }: { chatAccess: IChat }) => {
  const [inputValue, setInputValue] = useState("");

  const { mutate } = useMutation({
    mutationFn: sendMessage,
  });

  const messageContent = {
    chatId: chatAccess?._id,
    content: inputValue,
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(messageContent);
    setInputValue("");
  };

  return (
    <div className="px-4 sticky bottom-0">
      <div className="border px-2 py-1 rounded-full">
        <form
          className="flex items-center"
          onSubmit={handleSendMessage}
          autoComplete="off"
        >
          <input
            type="text"
            placeholder="Message..."
            name="message"
            id="message"
            className="bg-transparent border-0 focus:ring-0 focus:border-0 w-full "
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {!inputValue && (
            <label htmlFor="image">
              <input type="file" name="image" id="image" className="hidden" />
              <MdOutlineInsertPhoto className="w-6 h-6" />
            </label>
          )}
          {inputValue !== "" && (
            <button
              type="submit"
              className="text-blue-400 hover:text-blue-500 font-medium p-2"
            >
              send
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
