import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography } from "@mui/material";
import { formatDate } from "../utils/index.js";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { getReviews } from "../store/thunks/reviewThunk.js";
import { getProducts } from "../store/thunks/otherThunk.js";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "title", headerName: "title", width: 320, editable: true },
  { field: "text", headerName: "text", width: 320, editable: true },
  {
    field: "rating",
    headerName: "rating",
    type: "number",
    width: 90,
    editable: true,
  },
];

export default function AccountPage() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { reviews, loading, error } = useSelector((state) => state.review);
  const { products } = useSelector((state) => state.other);

  const rows = reviews.map((rev) => ({
    id: rev._id,
    text: rev.text,
    title: rev.title,
    rating: rev.user_rating,
  }));
  console.log(rows);

  useEffect(() => {
    dispatch(getReviews({ user_id: user?._id }));
    if (!products.length) dispatch(getProducts());
  }, []);

  return (
    <Container>
      <Typography variant="h6">{user?.username}</Typography>

      {!loading && (
        <>
          <div style={{ height: 400, width: "100%", marginTop: 10 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              // pageSize={5}
              // rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
            />
          </div>
        </>
      )}
    </Container>
  );
}
