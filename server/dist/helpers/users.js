"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHelper = void 0;
const CustomError_1 = require("../models/CustomError");
class UserHelper {
    constructor() { }
}
exports.UserHelper = UserHelper;
_a = UserHelper;
UserHelper._users = [];
UserHelper.getInstance = () => {
    if (_a._users) {
        return _a._users;
    }
    _a._users = [];
    return _a._users;
};
UserHelper.addUser = ({ id, name, room, }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    const existingUser = _a._users.find((user) => user.room === room && user.name === name);
    if (existingUser) {
        const err = new CustomError_1.CustomError(`User already exists in the "${room}" room`);
        err.code = 400;
        throw err;
    }
    const user = { id, name, room };
    _a._users.push(user);
    return user;
};
UserHelper.removeUser = (id) => {
    const index = _a._users.findIndex((el) => el.id === id);
    if (index !== -1)
        return _a._users.splice(index, 1)[0];
};
UserHelper.getUser = (id) => _a._users.find((user) => user.id === id);
UserHelper.getUsersInRoom = (room) => _a._users.filter((user) => user.room === room);
//# sourceMappingURL=users.js.map