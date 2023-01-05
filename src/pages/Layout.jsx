import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import MyHeader from "../components/MyHeader/index.jsx";

const Layout = () => {
  let location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <MyHeader />
      <Outlet />
    </>
  );
};
export default Layout;
