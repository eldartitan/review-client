import { useSelector } from "react-redux";
import { Autocomplete, TextField } from "@mui/material";

export default function SelectCats({ setCats }) {
  const { categories, error } = useSelector((state) => state.other);

  const handleChange = (event, value) => {
    console.log(value, event.target.value);
    setCats(value);
  };

  return (
    <Autocomplete
      disablePortal
      fullWidth
      id="combo-box-demo"
      size="small"
      onChange={handleChange}
      options={categories.map((option) => option.value)}
      renderInput={(params) => (
        <TextField {...params} margin="normal" label="Categories" required />
      )}
    />
  );
}
