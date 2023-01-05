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
  AppBar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import MySearch from "../MySearch/index.jsx";
import LoginModal from "./LoginModal.jsx";
import MyButton from "../MyButton.jsx";
import MyDrawer from "./MyDrawer.jsx";
import HeaderMenu from "./HeaderMenu";
import { useDispatch, useSelector } from "react-redux";
import { loginGoogle } from "../../store/authSlice.js";
import { getCategories } from "../../store/reviewSlice.js";

export default function MyHeader() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.review);

  const [lang, setLang] = useState("EN");

  const handleChange = (event) => {
    setLang(event.target.value);
  };

  useMemo(() => {
    dispatch(loginGoogle());
    dispatch(getCategories());
  }, []);

  return (
    <Toolbar
      sx={
        {
          // display: "flex",
          // background: "white",
          // color: "black",
        }
      }
    >
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
          <Link
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
          </Link>
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
            <Link
              key={cat._id}
              to={`/c/${cat.value}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography>{cat.value}</Typography>
            </Link>
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
            <Link
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
            </Link>
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
            // label="Lang"
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
