import { useEffect, useState } from "react";
import { Stack, Typography, Box, CardMedia } from "@mui/material";
import {
  ChatBubbleOutline,
  Favorite,
  FavoriteBorderOutlined,
} from "@mui/icons-material";
import MyButton from "../MyButton.jsx";
import { Link } from "react-router-dom";
import {
  getReviews,
  likeReview,
  removeLikeReview,
} from "../../store/thunks/reviewThunk.js";
import { useDispatch, useSelector } from "react-redux";

export default function ButtonsBlock({ likes, comments, id }) {
  // console.log(id);
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    if (!liked) dispatch(likeReview({ review_id: id }));
    else dispatch(removeLikeReview({ review_id: id }));
  };

  useEffect(() => {
    setLiked(likes?.includes(user?._id));
  }, [likes]);

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ height: 40, ml: 1 }}
      >
        <MyButton onClick={handleClick}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={liked ? { color: "#ff4500" } : null}
          >
            {liked ? (
              <Favorite sx={{ height: 20, width: 20 }} />
            ) : (
              <FavoriteBorderOutlined sx={{ height: 20, width: 20 }} />
            )}
            <Typography variant="body2">{likes?.length} likes</Typography>
          </Stack>
        </MyButton>
        <MyButton>
          <Link
            to={`/review/${id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <ChatBubbleOutline sx={{ height: 20, width: 20 }} />
              <Typography variant="body2">
                {comments?.length} comments
              </Typography>
            </Stack>
          </Link>
        </MyButton>
      </Stack>
    </Box>
  );
}
