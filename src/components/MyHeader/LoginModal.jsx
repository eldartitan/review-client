import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MyButton from "../MyButton.jsx";
import { Google } from "@mui/icons-material";
import discord from "../../assets/discord-icon.svg";

const API_URL = import.meta.env.VITE_REACT_API_URL;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function LoginModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <MyButton
        onClick={handleOpen}
        sx={{
          color: "white",
          background: "#222222",
          borderRadius: 20,
          height: 32,
          padding: "0 25px",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
          }}
        >
          Log in
        </Typography>
      </MyButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center", mb: 3 }}
          >
            Log in with
          </Typography>
          <Box sx={{ width: 320, margin: "auto" }}>
            <Button
              fullWidth
              variant="contained"
              color="inherit"
              sx={{ mb: 2 }}
              onClick={() => window.open(`${API_URL}/auth/google`, "_self")}
            >
              <Google />
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="inherit"
              onClick={() => window.open(`${API_URL}/auth/discord`, "_self")}
            >
              <img
                alt="discord"
                src={discord}
                height={32}
                style={{ color: "inherit" }}
              />
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
