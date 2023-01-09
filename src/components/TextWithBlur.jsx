import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const TextWithBlur = styled(Box)({
  content: '""',
  height: 80,
  position: "absolute",
  zIndex: 1,
  bottom: 0,
  left: 0,
  pointerEvents: "none",
  backgroundImage: "linear-gradient(to bottom, #ffffff00, #ffffff 100%)",
  width: "100%",
});

export default TextWithBlur;
