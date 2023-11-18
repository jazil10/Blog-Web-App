const Blog = require('../models/blog_model');
const User = require('../models/user_model');


// Get all blogs
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('user');
        res.status(200).json({ blogs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ blog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new blog
const createBlog = async (req, res) => {
    const { title, description, image, user } = req.body;
    if (!title || !description || !user) {
        return res.status(400).json({ message: "Title, Description, and User are required" });
    }

    try {
        // Check if the user exists
        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(400).json({ message: "Unable to find user by this ID" });
        }

        const newBlog = new Blog({ title, description, image, user });
        await newBlog.save();

        // Optionally add the blog ID to the user's blogs array
        existingUser.blogs.push(newBlog._id);
        await existingUser.save();

        res.status(201).json({ newBlog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update an existing blog
const updateBlog = async (req, res) => {
    const {title, description} = req.body;
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {title,description}, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ updatedBlog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a blog
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Remove blog from the user's blogs array
        await User.findByIdAndUpdate(blog.user, { $pull: { blogs: blog._id } });

        res.status(200).json({ message: "Blog successfully deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserBlogs = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userWithBlogs = await User.findById(userId).populate('blogs');

        if (!userWithBlogs) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user: userWithBlogs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    getUserBlogs
};
