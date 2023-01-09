import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useSelector } from "react-redux";

const filter = createFilterOptions();

export default function MyAutocompleteProduct({ setProduct }) {
  const [value, setValue] = useState(null);
  const { products, error } = useSelector((state) => state.other);

  useEffect(() => {
    setProduct(value?.value);
  }, [value]);

  return (
    <Autocomplete
      value={value}
      fullWidth
      size="small"
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue({
            value: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            value: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some(
          (option) => inputValue === option.value
        );
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            value: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={products}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.value;
      }}
      renderOption={(props, option) => <li {...props}>{option.value}</li>}
      freeSolo
      renderInput={(params) => (
        <TextField margin="normal" {...params} label="Product" required />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
