import { CustomError } from "../models/CustomError";
import { User } from "../models/User";

export class UserHelper {
  private static _users: User[] = [];

  private constructor() {}

  public static getInstance = () => {
    if (this._users) {
      return this._users;
    }
    this._users = [];
    return this._users;
  };

  public static addUser = ({
    id,
    name,
    room,
  }: {
    id: string;
    name: string;
    room: string;
  }): User => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = this._users.find(
      (user: User) => user.room === room && user.name === name
    );

    if (existingUser) {
      const err = new CustomError(`User already exists in the "${room}" room`);
      err.code = 400;
      throw err;
    }

    const user = { id, name, room };
    this._users.push(user);
    return user;
  };

  public static removeUser = (id: string) => {
    const index = this._users.findIndex((el: User) => el.id === id);
    if (index !== -1) return this._users.splice(index, 1)[0];
  };

  public static getUser = (id: string) =>
    this._users.find((user: User) => user.id === id);

  public static getUsersInRoom = (room: string) =>
    this._users.filter((user) => user.room === room);
}
