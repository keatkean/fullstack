const express = require('express');
const router = express.Router();
const { Comment } = require('../models');
const { validateToken } = require('../middlewares/auth');

router.get("/list/:postId", async (req, res) => {
    let postId = req.params.postId;
    let list = await Comment.findAll({
        where: { PostId: postId },
        order: [['createdAt', 'DESC']]
    });
    res.json(list);
});

router.post("/create", validateToken, async (req, res) => {
    let comment = req.body;
    comment.UserId = req.UserId;
    comment.username = req.username;
    let result = await Comment.create(comment);
    res.json(result);
});

module.exports = router;
