const express = require('express');
const router = express.Router();
const db = require('../models');
const Tutorial = db.Tutorial;
const Op = db.Sequelize.Op;

router.post("/", async (req, res) => {
    let tutorial = req.body;
    let result = await Tutorial.create(tutorial);
    res.json(result);
});

router.get("/", async (req, res) => {
    let title = req.query.title;
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    
    let list = await Tutorial.findAll({
        where: condition,
        order: [['createdAt', 'DESC']]
    });
    res.json(list);
});

module.exports = router;
