const express = require('express');
const router = express.Router();
const { User, Tutorial, Sequelize } = require('../models');
const { validateToken } = require('../middlewares/auth');
const yup = require("yup");

const validationSchema = yup.object().shape({
    title: yup.string()
        .max(100, 'Title should be of maximum 100 characters length')
        .required('Title is required'),
    description: yup.string()
        .max(500, 'Description should be of maximum 500 characters length')
        .required('Description is required')
});

router.post("/", validateToken, async (req, res) => {
    let tutorial = req.body;
    try {
        await validationSchema.validate(tutorial, { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    tutorial.userId = req.user.id;
    let data = await Tutorial.create(tutorial);
    res.json(data);
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
    if (!tutorial) {
        res.sendStatus(404);
        return;
    }
    //console.log(tutorial.toJSON());
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
