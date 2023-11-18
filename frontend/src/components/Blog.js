import React, { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  styled
} from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const RetroTypography = styled(Typography)({
    fontFamily: '"Press Start 2P", cursive', // Pixelated font
  });

const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  // Truncate the description to show only the first 100 characters
  const truncatedDescription = description.length > 100 ? description.substring(0, 100) + "..." : description;

  const handleCardClick = () => {
    navigate(`/myBlogs/${id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/updateblog/${id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setOpenDialog(true);
  };

  const deleteRequest = async () => {
    const res = await axios.delete(`https://retroheaven.cyclic.app/api/blog/deleteblog/${id}`).catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const confirmDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Card
        onClick={handleCardClick}
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          borderRadius: '16px', // Rounded corners for a softer look
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
            transform: "scale(1.05)",
          },
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {isUser && (
           <Box display="flex">
           <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
             <ModeEditOutlineIcon color="warning" />
           </IconButton>
           <IconButton onClick={handleDeleteClick}>
             <DeleteForeverIcon color="error" />
           </IconButton>
         </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {userName ? userName.charAt(0) : ""}
            </Avatar>
          }
          title={title}
          sx={{ fontWeight: "bold"  }}
        />
        <CardMedia
          component="img"
          height="194"
          image={imageURL}
          alt="Blog image"
        />
        <CardContent>
          <hr />
          <br />
          <RetroTypography variant="body2" color="text.secondary">
            <b>{userName}</b> {": "} {truncatedDescription}
          </RetroTypography>
        </CardContent>
      </Card>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this blog?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>No</Button>
          <Button onClick={confirmDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Blog;
