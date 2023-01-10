const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

router.post("/register", async (req, res) => {
    let { username, password } = req.body;
    let user = await User.findOne({
        where: { username: username }
    });
    if (user) {
        res.status(400).json({ message: "Username already exists." });
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
        res.status(400).json({ message: errorMsg });
        return;
    }

    //console.log(user.toJSON());
    let match = await bcrypt.compare(password, user.password);
    if (!match) {
        res.status(400).json({ message: errorMsg });
        return;
    }

    let accessToken = sign({
        id: user.id,
        username: user.username
    }, process.env.APP_SECRET);
    res.json({
        username: user.username,
        accessToken: accessToken
    });
});

module.exports = router;
