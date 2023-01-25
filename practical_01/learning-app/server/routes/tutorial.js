const express = require('express');
const router = express.Router();
const { Tutorial } = require('../models');

let tutorialList = [];

router.post("/", async (req, res) => {
    let tutorial = req.body;
    let data = await Tutorial.create(tutorial);
    res.json(data);
});

router.get("/", (req, res) => {
    res.json(tutorialList);
});

module.exports = router;