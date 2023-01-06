import { useDispatch, useSelector } from "react-redux";
import { Grid, Container } from "@mui/material";
import TagsPanel from "../components/TagsPanel.jsx";
import MyCard from "../components/MyCard/index.jsx";
import { useEffect, useMemo } from "react";
import { getProducts, getReviews } from "../store/reviewSlice.js";
import { useParams } from "react-router";

const MainPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params);
  const { reviews } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(getReviews(params));
    dispatch(getProducts());
  }, []);

  if (reviews && Array.isArray(reviews))
    return (
      <Container maxWidth="sm" sx={{ my: 2 }}>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={1.5}
        >
          <Grid item>
            <TagsPanel />
          </Grid>
          {reviews?.map((review) => {
            // console.log(review);
            return (
              <Grid item key={review._id}>
                <MyCard data={review} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    );
};

export default MainPage;
