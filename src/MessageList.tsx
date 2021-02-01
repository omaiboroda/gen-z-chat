import React, { useEffect, useRef } from "react";
import cx from "classnames";

import { ME } from "./const";

export type Message = {
  id: string;
  text: string;
  author: string;
  respondTo?: Message;
};
export type MessageListProps = {
  messages: Message[];
  onMessageSelect: (message: Message) => void;
  selectedMessage: Message | undefined;
};

const MessageList: React.FC<MessageListProps> = ({
  messages,
  onMessageSelect,
  selectedMessage,
}) => {
  const messageListRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messageListRef.current !== null) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={messageListRef}
      data-cy="messageList"
      className="flex flex-grow flex-col p-4 overflow-y-auto bg-gray-50"
    >
      {messages.map((message) => {
        const isSelected = message.id === selectedMessage?.id;
        return (
          <div
            data-cy="messageText"
            key={message.id}
            className={cx("flex", { "justify-end": message.author === ME })}
          >
            <div>
              {message.respondTo && (
                <div className="italic text-gray-500 text-sm text-right">
                  {message.respondTo.text}
                </div>
              )}
              <div
                onClick={() => onMessageSelect(message)}
                className={cx(
                  "py-0.5 px-3 mb-4 rounded-full flex cursor-pointer",
                  {
                    "bg-gray-200": message.author === ME && !isSelected,
                    "bg-blue-200": message.author !== ME && !isSelected,
                    "bg-gray-300": message.author === ME && isSelected,
                    "bg-blue-300": message.author !== ME && isSelected,
                  }
                )}
              >
                {message.text}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
