import "./App.css";
import MainPage from "./pages/MainPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import { Navigate, Route, Routes } from "react-router";
import Layout from "./pages/Layout.jsx";
import CreatePost from "./pages/CreatePost";
import { useSelector } from "react-redux";
import AccountPage from "./pages/AccountPage";
import NotFoundPage from "./pages/NotFound";

function App() {
  const { user, loading, error } = useSelector((state) => state.user);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route
            path="my-page"
            element={user ? <AccountPage /> : <Navigate to={"/"} />}
          />
          <Route path="review/:id" element={<PostPage />} />
          <Route path="/:tag" element={<MainPage />} />
          <Route path="c/:category" element={<MainPage />}>
            <Route path="t/:tag" element={<MainPage />} />
          </Route>
          <Route
            path="create"
            element={user ? <CreatePost /> : <Navigate to={"/"} />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
