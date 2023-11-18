import React, { useState, useRef, useEffect } from 'react';
import { Box, Paper, TextField, Button, Typography, Avatar } from '@mui/material';
import axios from 'axios';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
const ChatbotPage = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatDisplayRef = useRef(null);
  const inputRef = useRef(null); // Ref for the input field

  const sendMessage = async () => {
    if (inputMessage.trim() === '') return;
  
    const userMessage = { text: inputMessage, user: true };
    setChatHistory(prevChatHistory => [...prevChatHistory, userMessage]);
    setInputMessage('');
  
    try {
      const response = await axios.post('https://retroheaven.cyclic.app/api/chatbot', { message: inputMessage });
      const botResponse = response.data.message;
      const botMessage = { text: botResponse, user: false };
      setChatHistory(prevChatHistory => [...prevChatHistory, botMessage]);
    } catch (error) {
      console.error('Error interacting with the chatbot:', error);
    }
  };
  
  // This effect handles the scrolling of the chat
  useEffect(() => {
    if (chatDisplayRef.current) {
      chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{ fontFamily: 'Arial, sans-serif', p: 2 }}
    >
      <Paper elevation={6} sx={{ width: '100%', height: '100%', overflow: 'hidden', boxShadow: '0px 4px 20px rgba(0,0,0,0.1)' }}>
        <Typography variant="h5" sx={{ p: 2, bgcolor: 'primary.main', color: 'common.white', fontWeight: 'bold' }}>
          GBOT - Retro Game Expert <VideogameAssetIcon sx={{ verticalAlign: 'middle' }} />
        </Typography>
        <Box ref={chatDisplayRef} sx={{ overflowY: 'auto', flexGrow: 1, p: 2, maxHeight: 'calc(100vh - 150px)' }}>
          {chatHistory.map((message, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: message.user ? 'flex-end' : 'flex-start', mb: 1 }}>
              {!message.user && <Avatar sx={{ bgcolor: 'secondary.main', mr: 1 }}>B</Avatar>}
              <Typography
                variant="body1"
                sx={{
                  bgcolor: message.user ? 'primary.main' : 'secondary.light',
                  color: 'common.white',
                  p: 1,
                  borderRadius: 2,
                  maxWidth: '70%',
                  wordWrap: 'break-word',
                }}
              >
                {message.text}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box position="fixed" bottom={0} left={0} right={0} p={2} bgcolor="background.paper" boxShadow={1}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <TextField
              label="Type your message..."
              variant="outlined"
              fullWidth
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              ref={inputRef} // Attach the ref to the TextField
              sx={{ mr: 1 }}
            />
            <Button variant="contained" color="primary" onClick={sendMessage}>
              Send
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatbotPage;
