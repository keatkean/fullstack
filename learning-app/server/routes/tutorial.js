const express = require('express');
const router = express.Router();
const { User, Tutorial, Sequelize } = require('../models');
const { validateToken } = require('../middlewares/auth');

router.post("/", validateToken, async (req, res) => {
    try {
        let tutorial = req.body;
        tutorial.userId = req.user.id;
        let data = await Tutorial.create(tutorial);
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Error when creating the tutorial." });
    }
});

router.get("/", async (req, res) => {
    let search = req.query.search;
    let condition = search ? { title: { [Sequelize.Op.like]: `%${search}%` } } : null;

    let list = await Tutorial.findAll({
        where: condition,
        order: [['createdAt', 'DESC']],
        include: { model: User, as: "user", attributes: ['name'] }
    });
    res.json(list);
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let tutorial = await Tutorial.findByPk(id, {
        include: { model: User, as: "user", attributes: ['name'] }
    });
    if (!tutorial) {
        res.sendStatus(404);
        return;
    }
    res.json(tutorial);
});

router.put("/:id", validateToken, async (req, res) => {
    let id = req.params.id;
    let tutorial = await Tutorial.findByPk(id);
    if (!tutorial) {
        res.sendStatus(404);
        return;
    }

    let userId = req.user.id;
    if (tutorial.userId != userId) {
        res.sendStatus(403);
        return;
    }

    let data = req.body;
    let num = await Tutorial.update(data, {
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

router.delete("/:id", validateToken, async (req, res) => {
    let id = req.params.id;
    let tutorial = await Tutorial.findByPk(id);
    if (!tutorial) {
        res.sendStatus(404);
        return;
    }

    let userId = req.user.id;
    if (tutorial.userId != userId) {
        res.sendStatus(403);
        return;
    }

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
