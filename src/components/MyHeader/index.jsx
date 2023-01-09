import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  IconButton,
  MenuItem,
  Stack,
  FormControl,
  Select,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
import MySearch from "../MySearch/index.jsx";
import LoginModal from "./LoginModal.jsx";
import MyButton from "../MyButton.jsx";
import MyDrawer from "./MyDrawer.jsx";
import HeaderMenu from "./HeaderMenu";
import { useDispatch, useSelector } from "react-redux";
import { loginGoogle } from "../../store/authSlice.js";
import { getCategories } from "../../store/thunks/otherThunk.js";
import { useLocation } from "react-router";

export default function MyHeader() {
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location);
  const { user, loading, error } = useSelector((state) => state.user);
  const {
    categories,
    loading: loadingReview,
    error: errorReview,
  } = useSelector((state) => state.other);

  const [lang, setLang] = useState("EN");

  const handleChange = (event) => {
    setLang(event.target.value);
  };

  useMemo(() => {
    dispatch(loginGoogle());
    dispatch(getCategories());
  }, []);

  return (
    <Toolbar>
      <Stack direction="row" alignItems="center" spacing={1}>
        <MyDrawer />
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        >
          <NavLink
            to={"/"}
            style={{
              width: "86px",
              height: "32px",
              background: "#ff4500",
              borderRadius: 0.5,
              textDecoration: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography fontWeight={700} color="white">
              Reviews
            </Typography>
          </NavLink>
        </Box>
      </Stack>
      <MySearch />
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "block",
          },
        }}
      >
        <Stack
          direction="row"
          spacing={3}
          sx={{
            mr: 1,
          }}
        >
          {categories?.map((cat) => (
            <NavLink
              key={cat._id}
              to={`/c/${cat.value}`}
              state={{ category: cat.value }}
              style={({ isActive }) =>
                isActive
                  ? {
                      textDecoration: "none",
                      color: "inherit",
                      borderBottom: "2px solid #222222",
                    }
                  : { textDecoration: "none", color: "#222222" }
              }
            >
              <Typography>{cat.value}</Typography>
            </NavLink>
          ))}
        </Stack>
      </Box>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ color: "#878a8c" }}
      >
        <IconButton
          aria-label="search"
          sx={{
            display: {
              sm: "flex",
              md: "none",
            },
            alignItems: "center",
          }}
        >
          <SearchIcon />
        </IconButton>
        {user && (
          <Box
            sx={{
              display: {
                md: "block",
                sm: "none",
                xs: "none",
              },
            }}
          >
            <NavLink
              to={"/create"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MyButton
                style={{
                  color: "white",
                  backgroundColor: "#222222",
                  borderRadius: 20,
                  height: 32,
                  padding: "0 25px",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  Create
                </Typography>
              </MyButton>
            </NavLink>
          </Box>
        )}
        <FormControl
          sx={{
            width: 68,
            color: "inherit",
            display: {
              md: "block",
              sm: "none",
              xs: "none",
            },
          }}
          size="small"
        >
          <Select
            size="small"
            labelId="demo-select-small"
            value={lang}
            onChange={handleChange}
            sx={{ height: 32 }}
          >
            <MenuItem value={"EN"}>EN</MenuItem>
            <MenuItem value={"RU"}>RU</MenuItem>
          </Select>
        </FormControl>
        {user ? <HeaderMenu /> : <LoginModal />}
      </Stack>
    </Toolbar>
  );
}
