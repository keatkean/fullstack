const express = require('express');
const router = express.Router();
const { Tutorial, Sequelize } = require('../models');

router.post("/", async (req, res) => {
    let tutorial = req.body;
    if (!tutorial.title) {
        res.status(400).json({
            message: "Content cannot be empty."
        });
        return;
    }

    let data = await Tutorial.create(tutorial);
    res.json(data);
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

router.put("/:id", async (req, res) => {
    let id = req.params.id;
    let tutorial = req.body;

    let num = await Tutorial.update(tutorial, {
        where: { id: id }
    });
    if (num == 1) {
        res.json({
            message: "Tutorial was updated successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot update tutorial with id ${id}.`
        });
    }
});

router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    let num = await Tutorial.destroy({
        where: { id: id }
    })
    if (num == 1) {
        res.json({
            message: "Tutorial was deleted successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot delete tutorial with id ${id}.`
        });
    }
})

module.exports = router;
