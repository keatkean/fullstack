const express = require('express');
const router = express.Router();
const { Tutorial, Sequelize } = require('../models');

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

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let tutorial = await Tutorial.findByPk(id);
    if (!tutorial) {
        res.sendStatus(404);
        return;
    }
    res.json(tutorial);
});

module.exports = router;