import socketio, { Socket } from "socket.io";
import { UserHelper } from "./helpers/users";
import { logger } from "./logger";
import { CustomError } from "./models/CustomError";
export const socketioServer = (server) => {
  const io = socketio(server);

  io.on("connect", (socket) => {
    socket.on(
      "join",
      (
        { name, room }: { name: string; room: string },
        callback: (error: CustomError | void) => void
      ) => {
        try {
          const user = UserHelper.addUser({ id: socket.id, name, room });
          socket.join(user.room);
          logger.debug(`User ${user.name} has joined ${user.room}`);

          socket.emit("message", {
            user: "admin",
            text: `${user.name}, welcome to room ${user.room}.`,
          });

          socket.broadcast.to(user.room).emit("message", {
            user: "admin",
            text: `${user.name} has joined!`,
          });

          io.to(user.room).emit("roomData", {
            room: user.room,
            users: UserHelper.getUsersInRoom(user.room),
          });

          callback();
        } catch (error) {
          logger.error(error);
          return callback(error);
        }
      }
    );

    socket.on("sendMessage", (message: string, callback: () => void) => {
      try {
        const user = UserHelper.getUser(socket.id);
        io.to(user.room).emit("message", { user: user.name, text: message });
        callback();
      } catch(error) {
        logger.error(error);
        callback();
      }
    });

    socket.on("disconnect", () => {
      const user = UserHelper.removeUser(socket.id);
      if (user) {
        logger.debug(`User ${user.name} has left ${user.room}`);
        io.to(user.room).emit("message", {
          user: "Admin",
          text: `${user.name} has left.`,
        });
        io.to(user.room).emit("roomData", {
          room: user.room,
          users: UserHelper.getUsersInRoom(user.room),
        });
      }
    });
  });
};
