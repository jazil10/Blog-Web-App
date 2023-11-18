import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";


//         const res = await axios.get(`http://localhost:5000/api/blog/getblog/${id}`);

const HomePage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/game`);
  };

  // Inline styles for the component
  const styles = {
    backgroundImage: {
      backgroundImage: `url('/bg.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100vw',
      height: 'calc(100vh - 70px)', // Adjusted height considering header height
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      overflow: 'hidden', // Prevent scrolling
    },
    text: {
      color: '#000',
      textAlign: 'center',
      marginBottom: '20px',
    },
  };

  return (
    <Box style={styles.backgroundImage}>
      <Typography variant="h2" style={styles.text}>
        Welcome to Retro Game Heaven, 8BitBlogger
      </Typography>
      <Typography variant="h5" style={styles.text}>
        Explore, Play, and Share your thoughts on classic retro games!
      </Typography>
      {/* <Button onClick={handleButtonClick} variant="contained" color="primary">
        Play Game Of The Week
      </Button> */}
    </Box>
  );
};

export default HomePage;
