import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, styled, Container, Grid } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { blueGrey, deepPurple, amber } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(4),
  maxWidth: 700,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: blueGrey[50],
  borderRadius: theme.shape.borderRadius,
  fontFamily: '"Press Start 2P"', // Retro pixelated font
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  fontFamily: '"Press Start 2P"',
  '& label.Mui-focused': {
    color: amber[500], // Retro amber color
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: amber[200],
    },
    '&:hover fieldset': {
      borderColor: amber[400],
    },
    '&.Mui-focused fieldset': {
      borderColor: amber[500],
    },
  },
}));

const StyledButton = styled(Button)({
  marginTop: '16px',
  padding: '10px 15px',
  background: amber[400], // Retro amber button
  color: 'black',
  fontFamily: '"Press Start 2P"',
  '&:hover': {
    background: amber[500],
  },
});

const StyledContainer = styled(Container)({
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const AddBlog = () => {
  const [blogData, setBlogData] = useState({ title: '', description: '', image: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const sendRequest = async() => {
    const res = await axios.post("https://retroheaven.cyclic.app/api/blog/createblog", {
      title: blogData.title,
      description: blogData.description,
      image: blogData.image,
      user: localStorage.getItem("userId")
    }).catch(err => console.log(err));
    const data = await res.data;
    return data;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then((data) => console.log(data)).then(() => navigate("/myBlogs/"));
  };

  return (
    <StyledContainer>
      <StyledPaper elevation={6}>
        <Typography variant="h4" color={amber[600]} gutterBottom>
          Create New Blog
        </Typography>
        <CreateIcon color="action" style={{ fontSize: '2rem' }} />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StyledTextField
                name="title"
                label="Blog Title"
                variant="outlined"
                fullWidth
                value={blogData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                name="description"
                label="Blog Description"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={blogData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                name="image"
                label="Image URL"
                variant="outlined"
                fullWidth
                value={blogData.image}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledButton type="submit" fullWidth variant="contained">
                Publish
              </StyledButton>
            </Grid>
          </Grid>
        </form>
      </StyledPaper>
    </StyledContainer>
  );
};

export default AddBlog;
