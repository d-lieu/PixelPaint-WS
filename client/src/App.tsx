import { useState, useEffect } from "react";
import Canvas from "./components/Canvas/Canvas";
import ConnectedUsers from "./components/ConnectedUsers/ConnectedUsers";
import { UserContext, UserContextProvider } from "./hooks/UserContext";
import { io } from "socket.io-client";
import Box from "@mui/material/Box";
import UserModal from "./components/UserModal/UserModal";
import { Header } from "./components/Header/Header";
import { Socket } from "./Types/global";

const defaultUser = { name: "", color: "#000000", gridSize: 1 };

function App() {
  const [user, setUser] = useState(defaultUser);
  const [socket, setSocket] = useState<Socket>();
  const myUserContext: UserContextProvider = { user, setUser, socket };

  const initializeSocket = () => {
    const s = io("http://localhost:3001");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  };

  useEffect(initializeSocket, []);

  return (
    <Box>
      <UserContext.Provider value={myUserContext}>
        <UserModal />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Header />
          <ConnectedUsers />
        </Box>
        <Canvas />
      </UserContext.Provider>
    </Box>
  );
}

export default App;
