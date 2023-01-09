import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import MyHeader from "../components/MyHeader/index.jsx";
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
      <Outlet />
    </>
  );
};
export default Layout;
