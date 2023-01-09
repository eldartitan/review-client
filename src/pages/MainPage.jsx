import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getReviews } from "../store/thunks/reviewThunk.js";
import { getProducts } from "../store/thunks/otherThunk.js";
import { useLocation } from "react-router";
import { Grid, Container } from "@mui/material";
import TagsPanel from "../components/TagsPanel.jsx";
import MyCard from "../components/MyCard/index.jsx";

const MainPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { reviews, loading, error } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(getReviews(location?.state));
    dispatch(getProducts());
  }, [location]);

  return (
    <>
      {reviews && Array.isArray(reviews) && (
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
            {!loading &&
              reviews?.map((review) => {
                // console.log(review);
                return (
                  <Grid item key={review._id}>
                    <MyCard data={review} />
                  </Grid>
                );
              })}
          </Grid>
        </Container>
      )}
    </>
  );
};
export default MainPage;
