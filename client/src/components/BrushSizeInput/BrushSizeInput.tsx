import { useContext } from "react";
import { UserContext, UserContextProvider } from "../../hooks/UserContext";
import { TextField, Box, Typography } from "@mui/material";
import { User } from "../../Types/global";

export default function BrushSizeInput() {
  const { user, setUser } = useContext<UserContextProvider>(UserContext);

  const handleOnChange = (e: string) => {
    // TextField will return a number as e but in string format, so we can safely parse here
    setUser((prevUser: User) => ({ ...prevUser, gridSize: parseInt(e) }));
  };

  return (
    <Box sx={{ marginY: 2 }}>
      <Box sx={{ marginTop: 1, marginX: 1 }}>
        <Typography variant="body1">brush size</Typography>
      </Box>
      <TextField
        inputProps={{ type: "number" }}
        onChange={(e) => handleOnChange(e.target.value)}
        defaultValue={1}
      />
    </Box>
  );
}
