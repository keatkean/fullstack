const express = require('express');
const router = express.Router();
const { validateToken } = require('../middlewares/auth');
const { upload } = require('../middlewares/upload');
require('dotenv').config();

router.post('/upload', validateToken, upload, (req, res) => {
    console.log(req.file);
    res.json({ filename : req.file.filename });
});

module.exports = router;