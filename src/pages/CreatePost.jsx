import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Typography,
  Box,
  TextField,
  CssBaseline,
  Button,
  Rating,
  Stack,
} from "@mui/material";
import MyAutocompleteTags from "../components/CreatePost/MyAutocompleteTags.jsx";
import MyAutocompleteProduct from "../components/CreatePost/MyAutocompleteProduct.jsx";
import MyImageList from "../components/CreatePost/MyImageList.jsx";
import SelectCats from "../components/CreatePost/SelectCats";
import { postReview } from "../store/thunks/reviewThunk.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.js";
import { v4 } from "uuid";

const theme = createTheme();

export default function CreatePost() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [user_rating, setRating] = useState(0);
  const [tagsLocal, setTags] = useState([]);
  const [cats, setCats] = useState("");
  const [product, setProduct] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    uploadFile();
  }, [imageUpload]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      text,
      title,
      user_rating,
      tags: tagsLocal,
      category: cats,
      product,
      images: imageUrls,
    };
    console.log(data);
    dispatch(postReview(data));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{ mb: 8 }}>
        <CssBaseline />
        <Stack
          alignItems="center"
          sx={{
            mt: 8,
          }}
        >
          <Typography variant="h6">Creating review</Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              label="Title"
              id="Title"
              size="small"
              margin="normal"
              fullWidth
              required
              multiline
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <TextField
              label="Text"
              id="Text"
              size="small"
              margin="normal"
              fullWidth
              required
              multiline
              value={text}
              onChange={(event) => {
                setText(event.target.value);
              }}
            />
            <SelectCats cats={cats} setCats={(p) => setCats(p)} />
            <MyAutocompleteProduct setProduct={(p) => setProduct(p)} />
            <MyAutocompleteTags tags={tagsLocal} setTags={(p) => setTags(p)} />
            <MyImageList
              images={imageUrls}
              imageUpload={imageUpload}
              setImages={(i) => setImageUpload(i)}
              uploadFile={() => uploadFile()}
            />
            <Box sx={{ mt: 2 }}>
              <Typography>Rating</Typography>
              <Rating
                name="simple-controlled"
                value={user_rating}
                max={10}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="inherit"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}
