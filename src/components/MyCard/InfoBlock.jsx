import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { average, formatDate } from "../../utils/index.js";
import { Star } from "@mui/icons-material";

export default function InfoBlock({
  category_id,
  username,
  created,
  product_id,
  rating,
}) {
  const { categories, products } = useSelector((state) => state.other);
  const category = categories?.filter((f) => f._id === category_id)[0];
  const product = products?.filter((f) => f._id === product_id)[0];
  // console.log(product);
  const color = rating > 6 ? "#6c3" : rating > 4 ? "#fc3" : "#f00";

  return (
    <Stack
      direction="row"
      sx={{ my: 1, width: "100%" }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography color="#1c1c1c" variant="caption" underline="hover">
        {product?.value} &#183; posted by {username} {formatDate(created)}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: color,
          width: 28,
          height: 28,
          borderRadius: 1,
        }}
      >
        <Typography variant="body2" color="white">
          {rating}
          &#9733;
        </Typography>
      </Box>
    </Stack>
  );
}
