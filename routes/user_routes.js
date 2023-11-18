const express = require('express');
const userRouter = express.Router();
const {
    getAllUsers,
    createUser,
    loginUser,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/user_controller');

userRouter.get("/", getAllUsers);
userRouter.post("/signup", createUser);
userRouter.post("/login", loginUser);  // Login route
userRouter.get("/:id", getUserById);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
