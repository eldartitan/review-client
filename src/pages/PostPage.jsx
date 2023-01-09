import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  Button,
  Input,
  Rating,
  Stack,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import SimpleSlider from "../components/MySlider";
import MyButton from "../components/MyButton.jsx";
import {
  getReviews,
  likeReview,
  removeLikeReview,
} from "../store/thunks/reviewThunk.js";
import {
  getComments,
  getProducts,
  postComment,
  productRating,
} from "../store/thunks/otherThunk.js";
import TagsPanel from "../components/TagsPanel";
import { formatFromNow } from "../utils/index.js";

const PostPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const { review, error } = useSelector((state) => state.review);
  const { product, comments, categories } = useSelector((state) => state.other);

  const liked = review?.likes.includes(user?._id);
  const rating = product?.rating.filter((f) => f.user_id === user?._id)[0]
    ?.value;
  console.log(rating, "RATING");
  const category = categories?.filter((f) => f._id === review?.category)[0];

  const [focus, setFocus] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  const handleClick = () => {
    const data = {
      user_id: user?._id,
      review_id: review?._id,
      text: commentInput,
    };
    handleClickCansel();
    dispatch(postComment(data));
  };

  const handleClickCansel = () => {
    setFocus(false);
    setCommentInput("");
  };

  const handleLikeClick = () => {
    if (!liked) dispatch(likeReview({ review_id: review._id }));
    else dispatch(removeLikeReview({ review_id: review._id }));
  };

  const handleChange = (event) => {
    dispatch(
      productRating({
        product_id: review?.product_id,
        user_id: user?._id,
        value: event.target.value,
      })
    );
  };

  useEffect(() => {
    dispatch(getReviews({ id }));
    dispatch(getComments({ id }));
    // const interval = setInterval(() => {
    //   dispatch(getComments({ id }));
    // }, 3000);
    // return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (review) dispatch(getProducts({ id: review?.product_id }));
  }, [review]);

  if (review)
    return (
      <>
        <Container maxWidth="md" sx={{ mt: 3, fontFamily: "Roboto" }}>
          <Stack spacing={1}>
            <Stack direction="row" spacing={1}>
              <Typography fontWeight={700} variant="caption">
                {review.username}
              </Typography>
              <Typography variant="caption">
                posted {formatFromNow(review.createdAt)}
              </Typography>
            </Stack>

            <Typography variant={"h6"}>{review.title}</Typography>

            <TagsPanel tags={review.tags} />

            <Typography variant="body2" whiteSpace="pre-line">
              {review.text}
            </Typography>
            <SimpleSlider images={review.images} />
            <Stack
              alignItems="center"
              justifyContent="space-between"
              direction="row"
            >
              <Stack>
                <Typography sx={{ display: "flex", alignItems: "center" }}>
                  {product?.value} &#183; {category?.value}{" "}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ alignItems: "center", display: "inline" }}
                >
                  Review rating:
                  <Rating
                    defaultValue={review.user_rating}
                    max={10}
                    readOnly
                    size="small"
                  />
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ alignItems: "center", display: "inline" }}
                >
                  Users average rating: {product?.rating_avg}
                </Typography>
                {user && (
                  <Typography
                    variant="body1"
                    sx={{ alignItems: "center", display: "inline" }}
                  >
                    Your rating:{" "}
                    <Rating
                      onChange={(event) => handleChange(event)}
                      value={Number(rating)}
                      max={5}
                      size="small"
                    />
                  </Typography>
                )}
              </Stack>
              <MyButton onClick={handleLikeClick}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={liked ? { color: "#ff4500" } : null}
                >
                  {liked ? (
                    <Favorite sx={{ height: 22, width: 22 }} />
                  ) : (
                    <FavoriteBorderOutlined sx={{ height: 22, width: 22 }} />
                  )}
                  <span>{review.likes.length}</span>
                </Stack>
              </MyButton>
            </Stack>
          </Stack>
          <Stack sx={{ mt: 2, mb: 6 }} spacing={2}>
            <Typography>{comments?.length} comments</Typography>
            <Input
              placeholder="Add a comment..."
              multiline
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              onFocus={() => {
                if (!focus) setFocus(true);
                console.log(focus);
              }}
            />
            <Box display={focus ? "flex" : "none"} justifyContent="flex-end">
              <Button
                color="inherit"
                size="small"
                sx={{ mr: 1 }}
                onClick={handleClickCansel}
              >
                Cansel
              </Button>
              <Button
                color="inherit"
                size="small"
                onClick={handleClick}
                disabled={commentInput.length === 0}
              >
                Comment
              </Button>
            </Box>
            {comments?.map((comment) => (
              <Stack spacing={1} key={comment._id}>
                <Stack direction="row" spacing={1}>
                  <Typography fontWeight={700} variant="caption">
                    {comment.username}
                  </Typography>
                  <Typography variant="caption">
                    {formatFromNow(comment.createdAt)}
                  </Typography>
                </Stack>
                <Typography variant="body2">{comment.text}</Typography>
              </Stack>
            ))}
          </Stack>
        </Container>
      </>
    );
};

export default PostPage;
