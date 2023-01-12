const express = require('express');
const router = express.Router();
const { Tutorial } = require('../models');

router.post("/", async (req, res) => {
    let tutorial = req.body;
    let result = await Tutorial.create(tutorial);
    res.json(result);
});

router.get("/", async (req, res) => {
    let list = await Tutorial.findAll({
        order: [['createdAt', 'DESC']]
    });
    res.json(list);
});

module.exports = router;
