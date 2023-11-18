import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box, Snackbar, Alert, Avatar } from '@mui/material';
import axios from 'axios';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useDispatch } from 'react-redux';
import { authAction } from '../store';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const AuthContainer = styled(Box)({
  display: 'flex',
  height: '91.5vh',
  overflow: 'hidden',
  backgroundColor: '#f3f4f6',
});

const Slideshow = styled(Box)({
  width: '69%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  animation: 'fadein 3s',
  '@keyframes fadein': {
    from: { opacity: 0 },
    to: { opacity: 1 }
  },
});

const FormContainer = styled(Box)({
  width: '30%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
});

const StyledIcon = styled(LockOutlinedIcon)({
  marginBottom: '2px',
  fontSize: '30px',
  color: '#FE6B8B',
});

const StyledButton = styled(Button)({
  margin: '10px 0',
  padding: '10px 0',
  borderRadius: '20px',
  color: 'white',
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  '&:hover': {
    background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
  },
});

const StyledTextField = styled(TextField)({
  margin: '10px 0',
  '& label.Mui-focused': {
    color: '#FF8E53',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#FE6B8B',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#FE6B8B',
    },
  },
});

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({ name: "", email: "", password: "" });
  const [isSignup, setIsSignup] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'info' });
  const [currentImage, setCurrentImage] = useState(0);
  const images = ['/mario.png', '/metalslug.png', '/streetfighter.jpg', '/kof.jpg']; // Add your image paths here

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const sendRequest = async (type = "login") => {
    const endpoint = type === "signup" ? "createUser" : "login";
    try {
      const res = await axios.post(`https://retroheaven.cyclic.app/api/user/${endpoint}`, input);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestType = isSignup ? "signup" : "login";
    sendRequest(requestType)
      .then(data => {
        if (data && data.user) {
          localStorage.setItem('userId', data.user._id);
          dispatch(authAction.login());
          navigate("/blogs");
          setSnack({ open: true, message: 'Operation successful', severity: 'success' });
        } else {
          setSnack({ open: true, message: 'Operation successful', severity: 'success' });
        }
      })
      .catch(err => {
        const errorMessage = err.response?.data?.message || 'Error occurred during the request';
        setSnack({ open: true, message: errorMessage, severity: 'error' });
      });
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack({ ...snack, open: false });
  };

  return (
    <AuthContainer>
      <Slideshow style={{ backgroundImage: `url(${images[currentImage]})` }} />
      <FormContainer>
        <Avatar sx={{ m: 2, bgcolor: 'secondary.main' }}>
          <StyledIcon />
        </Avatar>
        <Typography variant="h5" gutterBottom>
          {isSignup ? "Signup" : "Login"}
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {isSignup && (
            <StyledTextField
              name="name"
              onChange={handleChange}
              value={input.name}
              label="Name"
              placeholder="Enter your Name"
              variant="outlined"
              fullWidth
            />
          )}
          <StyledTextField
            name="email"
            value={input.email}
            onChange={handleChange}
            label="Email"
            placeholder="Enter your email"
            type="email"
            variant="outlined"
            fullWidth
          />
          <StyledTextField
            name="password"
            onChange={handleChange}
            value={input.password}
            label="Password"
            placeholder="Enter your password"
            type="password"
            variant="outlined"
            fullWidth
          />
          <StyledButton type="submit" variant="contained" fullWidth>
            {isSignup ? "Sign Up" : "Sign In"}
          </StyledButton>
          <StyledButton onClick={() => setIsSignup(!isSignup)} variant="contained" fullWidth>
            {isSignup ? "Have an account? Sign In" : "Don't have an account? Sign Up"}
          </StyledButton>
        </form>
        <Snackbar open={snack.open} autoHideDuration={6000} onClose={handleCloseSnack}>
          <Alert onClose={handleCloseSnack} severity={snack.severity} sx={{ width: '100%' }}>
            {snack.message}
          </Alert>
        </Snackbar>
      </FormContainer>
    </AuthContainer>
  );
};

export default Auth;
