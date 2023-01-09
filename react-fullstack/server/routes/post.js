const express = require('express');
const router = express.Router();
const { Post } = require('../models');

router.get("/list", async (req, res) => {
    let list = await Post.findAll({
        order: [['createdAt', 'DESC']]
    });
    res.json(list);
});

router.get("/details/:id", async (req, res) => {
    let id = req.params.id;
    let post = await Post.findByPk(id);
    res.json(post);
});

router.post("/create", async (req, res) => {
    let post = req.body;
    if (!post.username) {
        post.username = "alex";
    }
    let result = await Post.create(post);
    res.json(result);
});

module.exports = router;
