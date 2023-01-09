import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Autocomplete, IconButton, Box, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function MySearch() {
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

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
              }}
            />
          )}
        />

        <IconButton>
          <NavLink
            to={"/"}
            state={{ text }}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <SearchIcon sx={{ color: "#878a8c" }} />
          </NavLink>
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
