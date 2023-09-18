import React, { useState, useContext, useEffect } from "react";
import { AvatarGroup, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { UserContext } from "../hooks/UserContext";

export default function ConnectedUsers() {
  const [drawerIsOpen, setDrawerIsOpen] = useState();
  const [users, setUsers] = useState();
  const { user, socket } = useContext(UserContext);

  const createMappableUsers = (users) => {
    let usersArr = [];
    Object.values(users).forEach((user) => {
      usersArr.push(user);
    });
    setUsers(usersArr);
  };

  const handleInitialUsers = () => {
    if (socket == null) return;
    socket.emit("user-Connected", user);

    // get current connected users
    socket.emit("load-InitialUsers");
    socket.on("receive-InitialUsers", createMappableUsers);
    return () => socket.off("receive-InitialUsers");
  };

  useEffect(handleInitialUsers, [socket, users]);

  return (
    <Box mr={4}>
      <AvatarGroup
        sx={{ cursor: "pointer" }}
        onClick={() => setDrawerIsOpen(true)}
      >
        {users &&
          users.map((user, index) => (
            <Avatar key={`${user.name}-${index}`} sx={{ bgcolor: user.color }}>
              {user.name.toLowerCase().charAt(0)}
            </Avatar>
          ))}
      </AvatarGroup>
      <Drawer
        anchor="right"
        open={drawerIsOpen}
        onClose={() => setDrawerIsOpen(false)}
      >
        <Box sx={{ width: 150 }}>
          <Typography my={1} mx={1.5} variant="h6">
            {user.name}
          </Typography>
          <Stack spacing={2}>
            <Divider />
            {users &&
              users.map((user, index) => (
                <Box
                  key={`${user.name}-${index}`}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "baseline",
                    marginTop: 3,
                  }}
                >
                  <Avatar sx={{ bgcolor: user.color, marginX: 1 }}>
                    {user.name.toLowerCase().charAt(0)}
                  </Avatar>
                  <Box>{user.name}</Box>
                </Box>
              ))}
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
}
