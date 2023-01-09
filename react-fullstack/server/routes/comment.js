const express = require('express');
const router = express.Router();
const { Comment } = require('../models');

router.get("/list/:postId", async (req, res) => {
    let postId = req.params.postId;
    let list = await Comment.findAll(
        { where: { PostId: postId } }
    );
    res.json(list);
});

router.post("/create", async (req, res) => {
    let comment = req.body;
    comment.username = "alex";
    let result = await Comment.create(comment);
    res.json(result);
});

module.exports = router;
