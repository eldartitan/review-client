import { Box, Typography, CardMedia, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import TextWithBlur from "../TextWithBlur.jsx";

export default function ContentBock({ text, title, images, id }) {
  return (
    <Box
      sx={{ color: "#1c1c1c", cursor: "pointer" }}
      onClick={() => console.log("click")}
    >
      <NavLink
        to={`/review/${id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Stack>
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            color="#222222"
            sx={{ fontWeight: 500 }}
            fontSize={20}
          >
            {title}
          </Typography>
          <Box sx={{ position: "relative" }}>
            <Typography
              variant="body2"
              maxHeight={120}
              align="justify"
              overflow="hidden"
              sx={{
                wordBreak: "break-word",
                display: "flex",
              }}
            >
              {text}
            </Typography>
            <TextWithBlur />
          </Box>
          {images.length > 0 && (
            <CardMedia
              sx={{ borderRadius: 0, maxHeight: 472, mt: 1 }}
              component="img"
              image={images[0]}
              alt="green iguana"
            />
          )}
        </Stack>
      </NavLink>
    </Box>
  );
}
