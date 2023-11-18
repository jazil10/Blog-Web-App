import React, { useState } from 'react';
import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../store';

const StyledAppBar = styled(AppBar)({
  background: '#0a0a0a', // Dark retro arcade feel
  borderBottom: '3px solid #FFD700', // Gold border for a classic retro look
  boxShadow: 'none',
  fontFamily: '"Press Start 2P", cursive', // Retro pixelated font
});

const StyledButton = styled(Button)({
  margin: 8,
  borderRadius: 4, 
  padding: '6px 20px',
  color: 'white',
  backgroundColor: '#FF8E53',
  '&:hover': {
    backgroundColor: '#FE6B8B',
  },
});

const RetroTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: '#FFD700',
  },
});

const RetroTab = styled(Tab)({
  fontFamily: '"Press Start 2P", cursive', // Retro pixelated font for tabs
  textTransform: 'none',
  fontSize: '0.9rem',
});

const Header = () => {
  const [value, setValue] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmLogout = () => {
    dispatch(authAction.logout());
    navigate("/auth");
    handleCloseDialog();
  };

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'orange', fontFamily: '"Press Start 2P", cursive' }}>
        8BitBlogger
        </Typography>
        <Box display="flex">
          {isLoggedIn && (
            <Box display="flex">
              <RetroTabs textColor="inherit" value={value} onChange={(e, val) => setValue(val)}>
                <RetroTab LinkComponent={Link} to="/blogs" label="All blogs" />
                <RetroTab LinkComponent={Link} to="/myblogs" label="My blogs" />
                <RetroTab LinkComponent={Link} to="/blogs/add" label="Add New Blog" />
                <RetroTab LinkComponent={Link} to="/game" label="GOW" />
                <RetroTab LinkComponent={Link} to="/chatbot" label="GBOT" />
              </RetroTabs>
            </Box>
          )}
          {!isLoggedIn && (
            <>
              <StyledButton LinkComponent={Link} to="/auth" variant="contained">
                Login
              </StyledButton>
              <StyledButton LinkComponent={Link} to="/auth" variant="contained">
                Signup
              </StyledButton>
            </>
          )}
          {isLoggedIn && (
            <StyledButton onClick={handleOpenDialog} variant="contained">
              Logout
            </StyledButton>
          )}
        </Box>
      </Toolbar>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmLogout} autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </StyledAppBar>
  );
};

export default Header;
