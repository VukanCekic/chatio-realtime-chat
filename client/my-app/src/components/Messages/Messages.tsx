import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from '../Message/Message';

import './Messages.css';

const Messages = ({ messages, name }: {messages: {user: string, text: string}[]; name: string}) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => message.text ? <div key={i}><Message message={message} name={name}/></div> : "")}
  </ScrollToBottom>
);

export default Messages;