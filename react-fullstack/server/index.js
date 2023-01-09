const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

// Routers
const userRouter = require('./routes/user');
app.use("/user", userRouter);
const postRouter = require('./routes/post');
app.use("/post", postRouter);
const commentRouter = require('./routes/comment');
app.use("/comment", commentRouter);

const db = require('./models');
db.sequelize.sync({ alter: true }).then(() => {
    app.listen(3001, () => {
        console.log("⚡ Sever running on http://localhost:3001");
    })
});
