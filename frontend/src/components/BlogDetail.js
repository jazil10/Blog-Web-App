import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography, Box, Paper, Chip, TextField, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Grid } from "@mui/material";
import { deepPurple, pink } from '@mui/material/colors';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editComments, setEditComments] = useState({});

  const userid = localStorage.getItem("userId");

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const res = await axios.get(`https://retroheaven.cyclic.app/api/blog/getblog/${id}`);
        setBlog(res.data.blog);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchComments = async () => {
      try {
        const commentsRes = await axios.get(`http://localhost:5000/api/comment/cblog/${id}`);
        setComments(commentsRes.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogDetails();
    fetchComments();
  }, [id]);

  const handleStartEditComment = (comment) => {
    setEditComments({ ...editComments, [comment._id]: comment.text });
  };

  const handleEditCommentChange = (id, text) => {
    setEditComments({ ...editComments, [id]: text });
  };


  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleEditComment = (comment) => {
    setNewComment(comment.text);
    setEditingCommentId(comment._id);
  };
  
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/comment/deleteComment/${commentId}`);
      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error(error);
    }
  };
  
  const updateComment = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/comment/updateComment/${editingCommentId}`, {
        text: newComment
      });
      const updatedComments = comments.map(comment => {
        if (comment._id === editingCommentId) {
          return { ...comment, text: newComment };
        }
        return comment;
      });
      setComments(updatedComments);
      setNewComment('');
      setEditingCommentId(null);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleUpdateComment = async (commentId) => {
    const updatedText = editComments[commentId];
    try {
      const res = await axios.put(`http://localhost:5000/api/comment/updateComment/${commentId}`, {
        text: updatedText
      });
      const updatedComments = comments.map(comment => {
        if (comment._id === commentId) {
          return { ...comment, text: updatedText };
        }
        return comment;
      });
      setComments(updatedComments);
      setEditComments(editComments => {
        const newEditComments = { ...editComments };
        delete newEditComments[commentId];
        return newEditComments;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const postComment = async () => {
    if (editingCommentId) {
      updateComment();
    } 
    else{
    
    if (newComment) {
      try {
        const res = await axios.post('http://localhost:5000/api/comment/createComment', {
          text: newComment,
          user: userid, 
          blog: id
        });
        setComments([...comments, res.data]);
        setNewComment('');
      } catch (error) {
        console.error(error);
      }
    }
  };
}
  const retroStyle = {
    paperContainer: {
      backgroundColor: '#f0ebe3',
      padding: '20px',
      margin: '30px auto',
      maxWidth: '800px',
      borderRadius: '15px',
      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
    },
    title: {
      fontFamily: '"Courier New", Courier, monospace',
      color: '#3e517a',
      textAlign: 'center',
      marginBottom: '20px',
    },
    description: {
      fontFamily: 'Georgia, serif',
      lineHeight: 1.8,
      color: '#333333',
    },
    chip: {
      margin: '5px',
    },
    commentBox: {
      padding: '10px',
      borderRadius: '10px',
      backgroundColor: deepPurple[50],
      margin: '20px 0',
    },
    commentInput: {
      width: '100%',
      backgroundColor: 'white',
      borderRadius: '5px',
    },
    commentButton: {
      marginTop: '10px',
      backgroundColor: deepPurple[500],
      color: 'white',
      '&:hover': {
        backgroundColor: deepPurple[700],
      },
    },
    commentItem: {
      padding: '10px',
      borderRadius: '10px',
      backgroundColor: pink[50],
      margin: '10px 0',
    },
    avatar: {
      backgroundColor: deepPurple[500],
    },
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#fdf6e3' }}>
      <Box
        sx={{
          position: 'relative',
          backgroundImage: `url(${blog.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '40vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
        }}
      >
        <Typography variant="h3" sx={retroStyle.title}>
          {blog.title}
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          By {blog.user && blog.user.name}
        </Typography>
      </Box>
      <Paper elevation={3} sx={retroStyle.paperContainer}>
        <Typography variant="body1" paragraph sx={retroStyle.description}>
          {blog.description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {blog.tags && blog.tags.map((tag, index) => (
            <Chip key={index} label={tag} sx={retroStyle.chip} color="primary" />
          ))}
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ ...retroStyle.paperContainer, marginTop: '20px' }}>
        <Typography variant="h5" sx={{ marginBottom: '10px', textAlign: 'center' }}>Comments</Typography>
        <List sx={{ width: '100%' }}>
          {comments.map((comment, index) => (
            <Paper key={index} sx={retroStyle.commentItem} elevation={3}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={retroStyle.avatar}>{comment.user && comment.user.name ? comment.user.name.charAt(0) : '?'}</Avatar>
                </ListItemAvatar>
                {editComments[comment._id] !== undefined ? (
                  <TextField
                    fullWidth
                    multiline
                    variant="outlined"
                    value={editComments[comment._id]}
                    onChange={(e) => handleEditCommentChange(comment._id, e.target.value)}
                  />
                ) : (
                  <ListItemText
                    primary={comment.user.name}
                    secondary={
                      <>
                        {comment.text}
                        <Typography sx={{ display: 'block', color: 'text.secondary', fontSize: '0.8rem', marginTop: '5px' }} component="span">
                          {new Date(comment.createdAt).toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                )}
              </ListItem>
              {comment.user._id === userid && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                  {editComments[comment._id] !== undefined ? (
                    <Button size="small" color="primary" onClick={() => handleUpdateComment(comment._id)}>
                      Update
                    </Button>
                  ) : (
                    <Button size="small" color="primary" onClick={() => handleStartEditComment(comment)}>
                      Edit
                    </Button>
                  )}
                  <Button size="small" color="secondary" onClick={() => handleDeleteComment(comment._id)}>
                    Delete
                  </Button>
                </Box>
              )}
              {index < comments.length - 1 && <Divider variant="inset" component="li" />}
            </Paper>
          ))}
        </List>
        <Grid container spacing={2} sx={retroStyle.commentBox}>
        <Grid item xs={12}>
        <TextField
  label={editingCommentId ? "Edit your comment..." : "Write a comment..."}
  multiline
  rows={4}
  variant="outlined"
  value={newComment}
  onChange={handleCommentChange}
  sx={retroStyle.commentInput}
/>

        </Grid>
        <Grid item xs={12}>
        <Button onClick={postComment} variant="contained" sx={retroStyle.commentButton}>
  {editingCommentId ? "Update Comment" : "Post Comment"}
</Button>

        </Grid>
      </Grid>
      </Paper>
    </Box>
  );
};

export default BlogDetail;
