const express = require('express');
const app = express();
app.use(express.json());

// Routers
const postRouter = require('./routes/post')
app.use("/post", postRouter);

const db = require('./models');
db.sequelize.sync({ alter: true }).then(() => {
    app.listen(3001, () => {
        console.log("⚡ Sever running on http://localhost:3001");
    })
})
