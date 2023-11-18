const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: String,
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
