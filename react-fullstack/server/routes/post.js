const express = require('express');
const router = express.Router();
const { Post } = require('../models');

router.get("/list", async (req, res) => {
    let list = await Post.findAll();
    res.json(list);
})

router.post("/create", async (req, res) => {
    const post = req.body;
    let result = await Post.create(post);
    res.json(result);
})

module.exports = router;
