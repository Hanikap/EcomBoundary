import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const UserModal = ({ isOpen, onClose, username }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="div" gutterBottom>
          User Information
        </Typography>
        <Typography variant="body1" gutterBottom>
          Username: {username}
        </Typography>
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default UserModal;
