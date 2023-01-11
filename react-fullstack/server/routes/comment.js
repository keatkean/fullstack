const express = require('express');
const router = express.Router();
const { Comment } = require('../models');
const { validateToken } = require('../middlewares/auth');

router.get("/list/:postId", async (req, res) => {
    let postId = req.params.postId;
    let list = await Comment.findAll({
        where: { postId: postId },
        order: [['createdAt', 'DESC']]
    });
    res.json(list);
});

router.post("/create", validateToken, async (req, res) => {
    let comment = req.body;
    comment.userId = req.user.id;
    comment.username = req.user.username;
    let result = await Comment.create(comment);
    res.json(result);
});

router.delete("/:id", validateToken, async (req, res) => {
    let id = req.params.id;
    let comment = await Comment.findByPk(id);
    if (!comment) {
        res.status(400).json({
            message: "Comment is not found."
        });
        return;
    }
    
    if (comment.userId != req.user.id) {
        res.sendStatus(403);
        return;
    }

    let result = await Comment.destroy({
        where: { id: id }
    })
    console.log(`${result} comment deleted`);
    res.sendStatus(200);
})

module.exports = router;
