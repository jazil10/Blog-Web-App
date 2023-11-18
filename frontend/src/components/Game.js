import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { keyframes } from '@emotion/react';

// Placeholder for your arcade machine image
const arcadeMachineImage = '/arcade.jpg'; // Replace with actual image URL

// Keyframes for animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const floating = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0); }
`;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw', // Set width to 100% of the viewport
    padding: '10px',
    backgroundImage: `url(${arcadeMachineImage})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'black', // Set the background color to black
    animation: `${fadeIn} 1s ease-out`,
  },
  title: {
    marginBottom: '20px',
    color: '#FFD700', // Gold color
    fontWeight: 'bold',
    fontFamily: '"Press Start 2P", cursive',
    textShadow: '0px 0px 10px rgba(255, 215, 0, 0.7)',
    animation: `${floating} 2s ease-in-out infinite`,
  },
  gamePaper: {
    position: 'absolute',
    top: '56%',  
    left: '50.95%', 
    transform: 'translate(-50%, -50%)',
    padding: '10px',
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  iframe: {
    borderRadius: '50px',
  }
};

const GameScreen = () => {
  return (
    <Box style={styles.container}>
      <Typography variant="h4" style={styles.title}>
        Game of the Week
      </Typography>
      <Paper style={styles.gamePaper}>
        <iframe
          src="https://www.retrogames.cc/embed/16973-earthworm-jim-2-usa.html"
          width="455"
          height="390"
          frameBorder="no"
          allowFullScreen
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          scrolling="no"
          style={styles.iframe}
        ></iframe>
      </Paper>
    </Box>
  );
};

export default GameScreen;
