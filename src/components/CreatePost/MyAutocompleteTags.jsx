import { Autocomplete, Chip, TextField } from "@mui/material";
import { useSelector } from "react-redux";

export default function MyAutocompleteTags({ setTags, tagsLocal }) {
  const { tags, error } = useSelector((state) => state.other);

  const handleChange = (event, value) => {
    console.log(value, "tags");
    setTags(value);
  };

  return (
    <Autocomplete
      id="tags-filled"
      freeSolo
      multiple
      value={tagsLocal}
      onChange={handleChange}
      options={tags.map((option) => option.value)}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          required
          margin="normal"
          color="info"
          size="small"
          variant="outlined"
          label="Tags"
          placeholder="Enter your tag"
        />
      )}
    />
  );
}
