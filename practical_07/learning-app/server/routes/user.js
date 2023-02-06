const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');
const yup = require("yup");

router.post("/register", async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        name: yup.string().min(3).max(50).required(),
        email: yup.string().email().max(50).required(),
        password: yup.string().min(8).max(50).required()
    })
    try {
        await validationSchema.validate(data, { abortEarly: false });
    }
    catch (err) {
        res.status(400).json({ errors: err.errors });
        return;
    }

    // Check email
    let user = await User.findOne({
        where: { email: data.email }
    });
    if (user) {
        res.status(400).json({ message: "Email already exists." });
        return;
    }

    // Hash passowrd
    data.password = await bcrypt.hash(data.password, 10);
    // Create user
    let result = await User.create(data);
    res.json(result);
});

module.exports = router;
