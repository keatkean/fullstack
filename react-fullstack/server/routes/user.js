const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');

router.post("/register", async (req, res) => {
    let { username, password } = req.body;
    let user = await User.findOne({
        where: { username: username }
    });
    if (user) {
        res.json({ error: "Username already exists." });
        return;
    }

    let hash = await bcrypt.hash(password, 10);
    let result = await User.create({
        username: username,
        password: hash
    });
    res.json(result);
});

router.post("/login", async (req, res) => {
    let { username, password } = req.body;
    let errorMsg = "Username or password is not correct.";

    let user = await User.findOne({
        where: { username: username }
    });
    if (!user) {
        res.json({ error: errorMsg });
        return;
    }

    //console.log(user.toJSON());
    let match = await bcrypt.compare(password, user.password);
    if (!match) {
        res.json({ error: errorMsg });
        return;
    }

    res.json({});
});

module.exports = router;
