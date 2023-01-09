import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import MyHeader from "../components/MyHeader/index.jsx";
import { Box, Container, LinearProgress, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

const Layout = () => {
  let location = useLocation();
  const { user, loading, error } = useSelector((state) => state.user);
  const { loading: loadingReview, error: errorReview } = useSelector(
    (state) => state.review
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {loadingReview && <Loading />}
      <MyHeader />
      {/*{errorReview ? (*/}
      {/*  <Container*/}
      {/*    sx={{ display: "flex", justifyContent: "center", m: "auto" }}*/}
      {/*  >*/}
      {/*    <Typography variant="body1" fontStyle="italic">*/}
      {/*      Something get wrong...*/}
      {/*    </Typography>*/}
      {/*  </Container>*/}
      {/*) : (*/}
      {/*  <Outlet />*/}
      {/*)}*/}
      <Outlet />
    </>
  );
};
export default Layout;
