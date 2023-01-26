const express = require('express');
const router = express.Router();
const { Tutorial, Sequelize } = require('../models');

router.post("/", async (req, res) => {
    let data = req.body;
    let result = await Tutorial.create(data);
    res.json(result);
});

router.get("/", async (req, res) => {
    let search = req.query.search;
    let condition = search ? {
        [Sequelize.Op.or]: [
            { title: { [Sequelize.Op.like]: `%${search}%` } },
            { description: { [Sequelize.Op.like]: `%${search}%` } }
        ]
    } : null;

    let list = await Tutorial.findAll({
        where: condition,
        order: [['createdAt', 'DESC']]
    });
    res.json(list);
});

module.exports = router;