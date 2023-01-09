import { Grid, IconButton, Typography } from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";
import MyButton from "../MyButton.jsx";

export default function MyImageList({
  images,
  setImages,
  uploadFile,
  imageUpload,
}) {
  return (
    <Grid container spacing={2}>
      <Grid
        item
        width={120}
        height={120}
        alignItems="center"
        justifyContent="center"
        sx={{ display: "flex" }}
      >
        <IconButton variant="contained" component="label">
          <AddPhotoAlternate />
          <input
            hidden
            type="file"
            onChange={(event) => setImages(event.target.files[0])}
          />
        </IconButton>
      </Grid>
      {images.map((url) => (
        <Grid
          item
          alignItems="center"
          justifyContent="center"
          sx={{ display: "flex", position: "relative" }}
          key={url}
        >
          <img width={120} src={url} alt="image" />
        </Grid>
      ))}
    </Grid>
  );
}
