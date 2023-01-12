const express = require('express');
const router = express.Router();
const { Tutorial, Sequelize } = require('../models');

router.post("/", async (req, res) => {
    let tutorial = req.body;
    let result = await Tutorial.create(tutorial);
    res.json(result);
});

router.get("/", async (req, res) => {
    let title = req.query.title;
    let condition = title ? { title: { [Sequelize.Op.like]: `%${title}%` } } : null;
    
    let list = await Tutorial.findAll({
        where: condition,
        order: [['createdAt', 'DESC']]
    });
    res.json(list);
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let tutorial = await Tutorial.findByPk(id);
    res.json(tutorial);
});

module.exports = router;
