import { Box } from "@mui/material";
import Typography from "@mui/material/Typography/Typography";
import ColorPicker from "../ColorPicker/ColorPicker";
import BrushSizeInput from "../BrushSizeInput/BrushSizeInput";

export const Header = () => {
  return (
    <Box ml={4}>
      <Typography sx={{ marginY: 2 }} variant="h2">
        pixel paint
      </Typography>
      <ColorPicker />
      <BrushSizeInput />
    </Box>
  );
};
