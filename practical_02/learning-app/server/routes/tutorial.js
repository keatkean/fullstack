const express = require('express');
const router = express.Router();

let tutorialList = [];

router.post("/", (req, res) => {
    let tutorial = req.body;
    tutorialList.push(tutorial);
    res.json(tutorial);
});

router.get("/", (req, res) => {
    res.json(tutorialList);
});

module.exports = router;