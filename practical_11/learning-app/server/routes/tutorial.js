const express = require('express');
const router = express.Router();
const { User, Tutorial, Sequelize } = require('../models');
const yup = require("yup");
const { validateToken } = require('../middlewares/auth');

router.post("/", validateToken, async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        title: yup.string().max(100).required(),
        description: yup.string().max(500).required()
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.userId = req.user.id;
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
    // Check id not found
    if (!tutorial) {
        res.sendStatus(404);
        return;
    }
    res.json(tutorial);
});

router.put("/:id", validateToken, async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let tutorial = await Tutorial.findByPk(id);
    if (!tutorial) {
        res.sendStatus(404);
        return;
    }
    
    // Check request user id
    let userId = req.user.id;
    if (tutorial.userId != userId) {
        res.sendStatus(403);
        return;
    }
    
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        title: yup.string().max(100),
        description: yup.string().max(500)
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

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
    // Check id not found
    let tutorial = await Tutorial.findByPk(id);
    if (!tutorial) {
        res.sendStatus(404);
        return;
    }

    // Check request user id
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
});

module.exports = router;