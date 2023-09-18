import React, { useState, useEffect } from "react";
import Canvas from "./components/Canvas";
import ColorPicker from "./components/ColorPicker";
import ConnectedUsers from "./components/ConnectedUsers";
import { UserContext } from "./hooks/UserContext";
import { io } from "socket.io-client";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import UserModal from "./components/UserModal";

const defaultUser = { name: "", color: "#000000" };

function App() {
  const [user, setUser] = useState(defaultUser);
  const [socket, setSocket] = useState();

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
      <UserContext.Provider value={{ user, setUser, socket }}>
        <UserModal />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box ml={4}>
            <Typography sx={{ marginY: 2 }} variant="h2">
              pixel paint
            </Typography>
            <ColorPicker />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignSelf: "flex-end",
            }}
          >
            <ConnectedUsers />
          </Box>
        </Box>
        <Box my={2}>
          <Box
            sx={{
              border: "1px solid #bbb",
              display: "inline-flex",
              position: "relative",
            }}
          >
            <Canvas />
          </Box>
        </Box>
      </UserContext.Provider>
    </Box>
  );
}

export default App;
