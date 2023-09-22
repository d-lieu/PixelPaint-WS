import React, { useContext, useState } from "react";
import Modal from "@mui/material/Modal";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ColorPicker from "../ColorPicker/ColorPicker";
import { UserContext } from "../../hooks/UserContext";
import Button from "@mui/material/Button";

export default function UserModal() {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const onSuccess = () => {
    setUser((prevUser) => ({ ...prevUser, name }));
    setModalIsOpen(false);
  };

  return (
    <Modal open={modalIsOpen}>
      <Box
        mt={12}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          outline: "none",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: 200,
            padding: 4,
          }}
        >
          <Typography variant="h3">Welcome to Pixel Paint</Typography>
          <Box my={2}>
            <Typography variant="body1">Choose a name 😊</Typography>
            <TextField
              error={error}
              id="outlined-basic"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box my={2}>
            <Typography variant="body1">Choose a color 🎨</Typography>
            <ColorPicker />
          </Box>
          <Button
            variant="contained"
            sx={{ backgroundColor: user.color }}
            onClick={() => {
              !name ? setError(true) : onSuccess();
            }}
          >
            Let's Paint 🖌️
          </Button>
        </Paper>
      </Box>
    </Modal>
  );
}
