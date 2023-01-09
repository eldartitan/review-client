import "./App.css";
import MainPage from "./pages/MainPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import { Navigate, Route, Routes } from "react-router";
import Layout from "./pages/Layout.jsx";
import CreatePost from "./pages/CreatePost";
import { useSelector } from "react-redux";
import { Box, LinearProgress } from "@mui/material";

function App() {
  const { user, loading, error } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
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
    </Routes>
  );
}

export default App;
