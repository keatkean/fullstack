const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { User } = require('../models');
const { validateToken } = require('../middlewares/auth');
require('dotenv').config();

router.post("/register", async (req, res) => {
    try {
        let { email, password, name } = req.body;
        let user = await User.findOne({
            where: { email: email }
        });
        if (user) {
            res.status(400).json({ message: "Email already exists." });
            return;
        }

        let hash = await bcrypt.hash(password, 10);
        let result = await User.create({
            email: email,
            password: hash,
            name: name
        });
        res.json(result);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Failed to register." });
    }
});

router.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body;
        let errorMsg = "Email or password is not correct.";

        let user = await User.findOne({
            where: { email: email }
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

        let userInfo = {
            id: user.id,
            email: user.email,
            name: user.name
        };
        let accessToken = sign(userInfo, process.env.APP_SECRET);
        res.json({
            accessToken: accessToken,
            user: userInfo
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Failed to login." });
    }
});

router.get("/auth", validateToken, (req, res) => {
    res.json({
        id: req.user.id,
        email: req.user.email,
        name: req.user.name
    });
});

module.exports = router;
