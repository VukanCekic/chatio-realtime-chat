import React, { SetStateAction } from "react";

import "./Input.css";

const Input = ({
  setMessage,
  sendMessage,
  message,
}: {
  setMessage: React.Dispatch<SetStateAction<string>>;
  sendMessage: (
    event:
       React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLInputElement>
  ) => void;
  message: string;
}) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(e) =>
        e.key === "Enter" ? sendMessage(e) : null
      }
    />
    <button className="sendButton" onClick={(e) => sendMessage(e)}>
      Send
    </button>
  </form>
);

export default Input;
