import { Chip, Stack, Box, Button } from "@mui/material";
import { AssessmentOutlined, RocketOutlined } from "@mui/icons-material";
import { MemoryRouter, Navigate, useLocation } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../store/reviewSlice.js";
import { Link as RouterLink } from "react-router-dom";

export default function TagsPanel(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { tags } = useSelector((state) => state.review);

  function MyChip({ to, icon, label }) {
    return (
      <RouterLink to={to} style={{ textDecoration: "none" }}>
        <Chip
          size="small"
          icon={icon}
          label={label}
          color={"default"}
          onClick={() => null}
        />
      </RouterLink>
    );
  }

  useEffect(() => {
    dispatch(getTags());
  }, []);

  return (
    <Box
      sx={{
        background: "white",
        borderRadius: 1,
        color: "#898989",
        maxWidth: 574,
      }}
    >
      <Stack direction="row" spacing={1} sx={{ display: "inline-block" }}>
        {location.pathname.includes("/review/") ? (
          props.tags?.map((tag) => (
            <Chip key={tag} size="small" label={tag} onClick={() => null} />
          ))
        ) : (
          <>
            <MyChip
              to={"/s/rated"}
              label={"Highly rated"}
              icon={<RocketOutlined />}
            />
            <MyChip
              to={"/s/upload"}
              label={"Last updated"}
              icon={<AssessmentOutlined />}
            />

            {tags?.map((tag) => (
              <MyChip
                key={tag._id}
                to={`/t/${tag.value}`}
                label={tag.value}
                icon={null}
              />
            ))}
          </>
        )}
      </Stack>
    </Box>
  );
}
