import React, { createContext } from "react";
import { Socket, User } from "../Types/global";

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

export type UserContextProvider = {
  user: User;
  setUser: SetStateFunction<User>;
  socket: Socket;
};

const defaultContextProvider = {
  user: {
    name: "",
    color: "000000",
    gridSize: 1,
  },
  setUser: () => {},
  socket: null,
};

export const UserContext = createContext<UserContextProvider>(
  defaultContextProvider
);
