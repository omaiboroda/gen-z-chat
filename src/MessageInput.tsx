import React from "react";
import { Message } from "./MessageList";
import { useFormik } from "formik";

type MessageInputProps = {
  onMessageSend: (message: Message["text"]) => void;
};

const MessageInput: React.FC<MessageInputProps> = ({ onMessageSend }) => {
  const formik = useFormik({
    initialValues: { text: "" },
    onSubmit: ({ text }) => {
      onMessageSend(text);
      formik.resetForm();
    },
  });
  return (
    <form
      data-cy="messageInput"
      className="flex p-4 bg-gray-50"
      onSubmit={formik.handleSubmit}
    >
      <input
        data-cy="textarea"
        className="border border-blue-500 w-full resize-none rounded-md p-2"
        name="text"
        onChange={formik.handleChange}
        value={formik.values.text}
      />
      <button
        data-cy="submit"
        className="ml-4 bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none disabled:bg-gray-600"
        type="submit"
        disabled={formik.values.text === ""}
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
