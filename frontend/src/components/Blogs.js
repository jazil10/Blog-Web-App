import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog';
import { Box, Typography } from '@mui/material';

const Blogs = () => {
  const [blogs, setBlogs] = useState();

  const sendRequest = async () => {
    try {
      const res = await axios.get("https://retroheaven.cyclic.app/api/blog");
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    sendRequest().then(data => setBlogs(data.blogs));
  }, []);

  const retroStyle = {
    container: {
      padding: '20px',
      backgroundColor: '#f0f0f0', // Light background for a clean look
      minHeight: '100vh',
    },
    header: {
      fontFamily: '"Press Start 2P", cursive', // Retro-style font for the title
      color: '#333', // Dark color for a classic look
      textAlign: 'center',
      marginBottom: '20px',
    },
  };

  return (
    <Box sx={retroStyle.container}>
      <Typography variant="h4" sx={retroStyle.header}>Retro Gaming Blogs</Typography>
      {blogs && blogs.map((blog, index) => (
        <Blog
          key={blog._id}
          id={blog._id}
          isUser={localStorage.getItem("userId") === blog.user._id}
          title={blog.title}
          description={blog.description}
          imageURL={blog.image}
          userName={blog.user.name}
        />
      ))}
    </Box>
  );
};

export default Blogs;
