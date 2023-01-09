import { Box, LinearProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box sx={{ width: "100%", color: "#9e9e9e", position: "absolute", top: 0 }}>
      <LinearProgress color="inherit" />
    </Box>
  );
}
