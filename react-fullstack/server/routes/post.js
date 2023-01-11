const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const { validateToken } = require('../middlewares/auth');

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

router.post("/create", validateToken, async (req, res) => {
    let post = req.body;
    post.userId = req.user.id;
    post.username = req.user.username;
    let result = await Post.create(post);
    res.json(result);
});

router.delete("/:id", validateToken, async (req, res) => {
    let id = req.params.id;
    let post = await Post.findByPk(id);
    if (!post) {
        res.status(400).json({
            message: "Post is not found."
        });
        return;
    }
    
    if (post.userId != req.user.id) {
        res.sendStatus(403);
        return;
    }

    let result = await Post.destroy({
        where: { id: id }
    })
    console.log(`${result} post deleted`);
    res.sendStatus(200);
})

module.exports = router;
