import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {
  Autocomplete,
  IconButton,
  InputBase,
  Stack,
  TextField,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { useCallback, useDeferredValue, useEffect, useState } from "react";
import { useDebounce } from "../../utils/debounce.js";
import { useDispatch } from "react-redux";
import MyButton from "../MyButton.jsx";
import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { getReviews } from "../../store/thunks/reviewThunk.js";

export default function MySearch() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  // const debounced = useDebounce(text, 500);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleClick = () => {
    dispatch(getReviews({ text }));
  };

  // useEffect(() => {
  //   console.log(debounced);
  // }, [debounced]);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          flexGrow: 1,
          display: {
            xs: "none",
            sm: "none",
            md: "flex",
          },
        }}
      >
        <Autocomplete
          sx={{
            width: 220,
            mr: 1,
          }}
          color="inherit"
          freeSolo
          id="free-solo-2-demo"
          options={[].map((option) => option.title)}
          renderInput={(params) => (
            <TextField
              fullWidth
              {...params}
              size="small"
              value={text}
              placeholder={"Search"}
              onChange={handleChange}
              sx={{ borderColor: "inherit" }}
              InputProps={{
                ...params.InputProps,
                // endAdornment: (
                //
                // ),
              }}
            />
          )}
        />
        {/*<NavLink to={"/"} style={{ textDecoration: "none", color: "inherit" }}>*/}
        {/*</NavLink>*/}
        <IconButton onClick={handleClick}>
          <SearchIcon sx={{ color: "#878a8c" }} />
        </IconButton>
      </Stack>
      <Box
        sx={{
          flexGrow: 1,
          display: {
            xs: "flex",
            sm: "flex",
            md: "none",
          },
        }}
      />
    </>
  );
}
