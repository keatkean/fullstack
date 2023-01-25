const express = require('express');
const router = express.Router();
const { Tutorial } = require('../models');

let tutorialList = [];

router.post("/", async (req, res) => {
    try {
        let tutorial = req.body;
        let data = await Tutorial.create(tutorial);
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error when creating the tutorial." });
    }
});

router.get("/", (req, res) => {
    res.json(tutorialList);
});

module.exports = router;