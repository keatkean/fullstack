const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { User } = require('../models');
const { validateToken } = require('../middlewares/auth');
const yup = require("yup");
require('dotenv').config();

router.post("/register", async (req, res) => {
    // Validate input
    let data = req.body;
    let validationSchema = yup.object().shape({
        name: yup.string().min(3).max(50).required(),
        email: yup.string().email().max(50).required(),
        password: yup.string().min(8).max(50).required()
    })
    try {
        await validationSchema.validate(data, { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    // Validate email
    let user = await User.findOne({
        where: { email: data.email }
    });
    if (user) {
        res.status(400).json({ message: "Email already exists." });
        return;
    }

    // Create user
    let hash = await bcrypt.hash(password, 10);
    let result = await User.create({
        email: data.email,
        password: hash,
        name: data.name
    });
    res.json(result);
});

router.post("/login", async (req, res) => {
    // Validate input
    let data = req.body;
    let validationSchema = yup.object().shape({
        email: yup.string().email().max(50).required(),
        password: yup.string().min(8).max(50).required()
    })
    try {
        await validationSchema.validate(data, { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    // Validate email and password
    let errorMsg = "Email or password is not correct.";
    let user = await User.findOne({
        where: { email: data.email }
    });
    if (!user) {
        res.status(400).json({ message: errorMsg });
        return;
    }
    let match = await bcrypt.compare(data.password, user.password);
    if (!match) {
        res.status(400).json({ message: errorMsg });
        return;
    }

    // Return token and user info
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
});

router.get("/auth", validateToken, (req, res) => {
    res.json({
        id: req.user.id,
        email: req.user.email,
        name: req.user.name
    });
});

module.exports = router;
