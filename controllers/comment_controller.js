const Comment = require('../models/comment_model');
const Blog = require('../models/blog_model');
const User = require('../models/user_model');

// Get all comments
const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find().populate('user', 'name');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single comment by ID
const getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id).populate('user', 'name');
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new comment
const createComment = async (req, res) => {
    const { text, user, blog } = req.body;
    try {
        const comment = new Comment({ text, user, blog });
        await comment.save();
        
        await Blog.findByIdAndUpdate(blog, { $push: { comments: comment._id } });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing comment
const updateComment = async (req, res) => {
    const { text } = req.body;
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Optional: Check if the user updating the comment is the one who created it
        // if (comment.user.toString() !== req.user.id) {
        //     return res.status(401).json({ message: "Unauthorized" });
        // }

        comment.text = text;
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a comment
const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Optional: Check if the user deleting the comment is the one who created it
        // if (comment.user.toString() !== req.user.id) {
        //     return res.status(401).json({ message: "Unauthorized" });
        // }

        await Blog.findByIdAndUpdate(comment.blog, { $pull: { comments: comment._id } });
       // await comment.remove();

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCommentsByBlogId = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const comments = await Comment.find({ blog: blogId }).populate('user', 'name');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
    getCommentsByBlogId
};
