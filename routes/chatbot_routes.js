// routes/chatbot_routes.js

const express = require('express');
const chatbotController = require('../controllers/chatbot_controller');
const chatbotRouter = express.Router();

chatbotRouter.post('/', chatbotController);

module.exports = chatbotRouter;
