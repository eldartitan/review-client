import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Autocomplete, IconButton, InputBase, TextField } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { useDeferredValue, useState } from "react";
import { useDebounce } from "../../utils/debounce.js";

export default function MySearch() {
  const [text, setText] = useState("");
  const deferredValue = useDeferredValue(text);
  console.log(deferredValue);

  // console.log(text);
  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Autocomplete
        sx={{
          width: 220,
          display: {
            xs: "none",
            sm: "none",
            md: "block",
          },
        }}
        color="inherit"
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={[].map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            fullWidth
            {...params}
            size="small"
            value={text}
            placeholder={"Search"}
            onChange={handleChange}
            sx={{ borderRadius: 24, borderColor: "inherit" }}
            InputProps={{
              ...params.InputProps,
              type: "search",
              // endAdornment: (
              //   <>
              //     <IconButton size="small">
              //       <SearchIcon sx={{ width: 20 }} />
              //     </IconButton>
              //     {params.InputProps.endAdornment}
              //   </>
              // ),
            }}
          />
        )}
      />
    </Box>
  );
}
