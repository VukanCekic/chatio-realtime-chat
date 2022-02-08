import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { MouseEvent, KeyboardEvent } from "react";
import { useLocation } from "react-router-dom";
import CustomError from "../../interfaces/CustomError";
import Input from "../Input/Input";
import InfoBar from "../InfoBar/InfoBar";
import Messages from "../Messages/Messages";

import "./Chat.css";
let socket: SocketIOClient.Socket;


const Chat: React.FunctionComponent = (props) => {
  const [myName, setName] = useState("");
  const [myRoom, setRoom] = useState("");
  const [users, setUsers] = useState([{ id: "", name: "", room: "" }]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([{ user: "", text: "" }]);

  let location = useLocation();
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);

    if (typeof name === "string" && typeof room === "string") {
      setRoom(room);
      setName(name);
    }

    socket.emit("join", { name, room }, (error: CustomError) => {
      if (error) {
        alert(error.message);
      }
    });
  }, [location.search]);

  useEffect(() => {
    socket.on("message", (message: { user: ""; text: "" }) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }: { users: {id: string; name: string; room: string}[]}) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (e: MouseEvent | KeyboardEvent) => {
    e.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  const usersInRoom = (users: { id: string; name: string; room: string }[]) => {
    if (users.length >= 5) {
      return (
        <div className="activeItem">
          <h3 style={{ color: "white" }}>Currently chatting: </h3>

          <h3 style={{ color: "white" }}>{users.length} users </h3>
        </div>
      );
    }
    return (
      <div className="activeItem">
        <h3 style={{ color: "white" }}>Currently chatting: </h3>
        {users.map(({ name }, index) =>
          index !== users.length-1 ? (
            <div style={{ color: "white" }}>{name.length >= 6 ? name.substring(0,6) + "..." : name} ,</div>
          ) : (
            <div style={{ color: "white" }}>{name.length >= 6 ? name.substring(0,6) + "..." : name}</div>
          )
        )}
      </div>
    );
  };

  return (
    <div className="chat__container">
      <div className="container">
        <InfoBar room={myRoom} />
        <Messages messages={messages} name={myName} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      {usersInRoom(users)}
    </div>
  );
};
export default Chat;
