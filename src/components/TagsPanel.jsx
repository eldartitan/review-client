import { Chip, Stack, Box } from "@mui/material";
import { AssessmentOutlined, RocketOutlined } from "@mui/icons-material";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../store/thunks/otherThunk.js";
import { getReviews } from "../store/thunks/reviewThunk.js";
import { NavLink } from "react-router-dom";

export default function TagsPanel(props) {
  const dispatch = useDispatch();
  const location = useLocation();

  const { tags } = useSelector((state) => state.other);

  const cLocate = location.pathname.includes("/c/")
    ? `${location.pathname.split("/t/")[0]}/t`
    : "";

  const handleClick = (params) => {
    dispatch(getReviews(params));
  };

  useEffect(() => {
    dispatch(getTags());
  }, [location]);

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
            <NavLink
              key={tag}
              to={`/${tag}`}
              style={{ textDecoration: "none" }}
              state={{ tags: tag }}
            >
              <Chip
                key={tag}
                label={tag}
                size="small"
                color={"default"}
                onClick={() => console.log({ tags: tag }, "TAGS VALUE")}
              />
            </NavLink>
          ))
        ) : (
          <>
            <Chip
              size="small"
              icon={<RocketOutlined />}
              label="Highly rated"
              color={"default"}
              onClick={() => handleClick({ sort: "rated" })}
            />
            <Chip
              size="small"
              icon={<AssessmentOutlined />}
              label="Last updated"
              color={"default"}
              onClick={() => handleClick({ sort: "upload" })}
            />

            {tags?.map((tag) => (
              <NavLink
                key={tag._id}
                to={`${cLocate}/${tag.value}`}
                style={{ textDecoration: "none" }}
                state={{ tags: tag.value }}
              >
                <Chip
                  key={tag._id}
                  size="small"
                  label={tag.value}
                  color={"default"}
                  onClick={() => console.log({ tags: tag.value }, "TAGS VALUE")}
                />
              </NavLink>
            ))}
          </>
        )}
      </Stack>
    </Box>
  );
}
