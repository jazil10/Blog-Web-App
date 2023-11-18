const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const userRouter = require('./routes/user_routes');
const blogRouter = require('./routes/blog_routes');
const chatbotRouter = require('./routes/chatbot_routes');
const commentRouter = require('./routes/comment_routes');

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/user",userRouter);
app.use("/api/blog",blogRouter);
app.use("/api/chatbot", chatbotRouter);
app.use('/api/comment', commentRouter);


const port = process.env.PORT || 5000;
mognouri = "mongodb+srv://syedjazilali0:barcelona@blogclus.qfnuajs.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mognouri,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=> app.listen(port, () => {console.log(`server running on port ${port}`);})).then(() => console.log("MongoDB Connected.")).catch((err) => console.log(err));

//  mongoose
//   .connect(mognouri, {
//     useNewUrlParser: true,
//   })
//   .then(() => {
//     console.log("DB connected");
//   })
//   .catch((error) => {
//     console.log("Error: ", error);

//     return error;
//   });

//  app.listen(port, () => {console.log(`server running on port ${port}`)});