"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketioServer = void 0;
const socket_io_1 = __importDefault(require("socket.io"));
const users_1 = require("./helpers/users");
const logger_1 = require("./logger");
const socketioServer = (server) => {
    const io = (0, socket_io_1.default)(server);
    io.on("connect", (socket) => {
        socket.on("join", ({ name, room }, callback) => {
            try {
                const user = users_1.UserHelper.addUser({ id: socket.id, name, room });
                socket.join(user.room);
                logger_1.logger.debug(`User ${user.name} has joined ${user.room}`);
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
                    users: users_1.UserHelper.getUsersInRoom(user.room),
                });
                callback();
            }
            catch (error) {
                logger_1.logger.error(error);
                return callback(error);
            }
        });
        socket.on("sendMessage", (message, callback) => {
            try {
                const user = users_1.UserHelper.getUser(socket.id);
                io.to(user.room).emit("message", { user: user.name, text: message });
                callback();
            }
            catch (error) {
                logger_1.logger.error(error);
                callback();
            }
        });
        socket.on("disconnect", () => {
            const user = users_1.UserHelper.removeUser(socket.id);
            if (user) {
                logger_1.logger.debug(`User ${user.name} has left ${user.room}`);
                io.to(user.room).emit("message", {
                    user: "Admin",
                    text: `${user.name} has left.`,
                });
                io.to(user.room).emit("roomData", {
                    room: user.room,
                    users: users_1.UserHelper.getUsersInRoom(user.room),
                });
            }
        });
    });
};
exports.socketioServer = socketioServer;
//# sourceMappingURL=io.js.map