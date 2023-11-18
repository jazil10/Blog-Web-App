const express = require('express');
const commentRouter = express.Router();
const {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
    getCommentsByBlogId
} = require('../controllers/comment_controller');

commentRouter.get('/', getAllComments);
commentRouter.get('/:id', getCommentById);
commentRouter.post('/createComment', createComment);
commentRouter.put('/updateComment/:id', updateComment);
commentRouter.delete('/deleteComment/:id', deleteComment);
commentRouter.get('/cblog/:blogId', getCommentsByBlogId);

module.exports = commentRouter;
