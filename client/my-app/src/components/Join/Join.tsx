import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";

const Join: React.FunctionComponent = (props) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="join__container">
      <div className="join__container__inner">
        <h1 className="heading">Join a room </h1>
        <div>
          <input
            type="text"
            placeholder="Name"
            className="join__input"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Room"
            className="join__input"
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <Link to={`/chat?name=${name}&room=${room}`} >
          <button className="button mt-20" type="submit" disabled={ (!name || !room) === true ? true: false}>
           { (!name || !room) === true ? "x" : "Sign in" }
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
