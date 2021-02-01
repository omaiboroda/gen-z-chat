// TODO
// [x] Add 2 List and Input
// [x] Introduce uuid
// [x] Add Bot response
// [x] "Respond to" in state
// [x] Bring Tailwind
// [x] Mobile-first layout
// [x] Autoscroll
// [x] Cypress text
// [x] Validation
// [x] Highlight selected message
// [x] Refactor & cleanup
// [x] Readme + Deploy + Repo
import React, { useState } from "react";
import { debounce, random } from "lodash";
import { v4 as uuidv4 } from "uuid";

import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import Header from "./Header";
import { Message } from "./MessageList";
import { ME, ADDRESSEE, ADDRESSEE_MESSAGES, BOT_DELAY } from "./const";

const botRespond = debounce((addMessage) => {
  addMessage({
    id: uuidv4(),
    author: ADDRESSEE,
    text: ADDRESSEE_MESSAGES[random(ADDRESSEE_MESSAGES.length - 1)],
  });
}, BOT_DELAY);

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [respondToMessage, setRespondToMessage] = useState<
    Message | undefined
  >();
  const addMessage = (message: Message) =>
    setMessages((messages) => [...messages, message]);

  const myRespond = (text: Message["text"]) => {
    addMessage({
      id: uuidv4(),
      author: ME,
      text,
      respondTo: respondToMessage,
    });
    setRespondToMessage(undefined);
    botRespond(addMessage);
  };

  const onMessageSelect = (selectedMessage: Message) =>
    setRespondToMessage((respondToMessage) => {
      return respondToMessage?.id === selectedMessage.id
        ? undefined
        : selectedMessage;
    });

  return (
    <div
      data-cy="app"
      className="container mx-auto max-w-sm flex flex-col flex-grow h-full text-gray-900"
    >
      <Header />
      <MessageList
        messages={messages}
        onMessageSelect={onMessageSelect}
        selectedMessage={respondToMessage}
      />
      <MessageInput onMessageSend={myRespond} />
    </div>
  );
}

export default App;
