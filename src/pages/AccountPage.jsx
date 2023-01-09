import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography } from "@mui/material";
import { formatDate } from "../utils/index.js";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { getReviews } from "../store/thunks/reviewThunk.js";
import { getProducts } from "../store/thunks/otherThunk.js";

export default function AccountPage() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { reviews, loading, error } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(getReviews({ user_id: user?._id }));
  }, []);

  return (
    <Container>
      <Typography variant="h6">{user?.username}</Typography>

      {!loading && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Reviews</TableCell>
                <TableCell align="right">likes</TableCell>
                <TableCell align="right">comments</TableCell>
                <TableCell align="right">created</TableCell>
                {/*<TableCell align="right">Protein&nbsp;(g)</TableCell>*/}
              </TableRow>
            </TableHead>
            <TableBody>
              {reviews?.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <NavLink
                      style={{ color: "inherit" }}
                      to={`/review/${row._id}`}
                    >
                      {row.title}
                    </NavLink>
                  </TableCell>
                  <TableCell align="center">{row.likes.length}</TableCell>
                  <TableCell align="center">{row.comments.length}</TableCell>
                  <TableCell align="center">
                    {formatDate(row.createdAt)}
                  </TableCell>
                  {/*<TableCell align="right">{row.protein}</TableCell>*/}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
