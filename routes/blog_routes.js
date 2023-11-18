const express = require('express');
const blogRouter = express.Router();
const {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    getUserBlogs
} = require('../controllers/blog_controller');

blogRouter.get('/', getAllBlogs);
blogRouter.get('/getblog/:id', getBlogById);
blogRouter.post('/createblog', createBlog);
blogRouter.put('/update/:id', updateBlog);
blogRouter.delete('/deleteblog/:id', deleteBlog);
blogRouter.get('/:userId/userblogs', getUserBlogs);

module.exports = blogRouter;
