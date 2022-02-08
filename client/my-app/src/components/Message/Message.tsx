import React from "react";

import "./Message.css";

import ReactEmoji from "react-emoji";

const Message = ({
  message: { text, user },
  name,
}: {
  message: { text: string; user: string };
  name: string;
}) => {
  let isSentByCurrentUser;
  const trimmedName = name.trim().toLowerCase();

  user === trimmedName
    ? (isSentByCurrentUser = true)
    : (isSentByCurrentUser = false);

  return isSentByCurrentUser ? (
    <div className="message justifyEnd">
      <p className="message__sent-text pr-10">{trimmedName.length >= 10 ? trimmedName.substring(0,6) + "..." : trimmedName}</p>
      <div className="message__box backgroundBlue">
        <p className="message__text colorWhite">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="message__container justifyStart">
      <div className="message__box backgroundLight">
        <p className="message__text colorDark">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="message__sent pl-10 ">{user.length >= 10 ? user.substring(0,6) + "..." : user}</p>
    </div>
  );
};

export default Message;
