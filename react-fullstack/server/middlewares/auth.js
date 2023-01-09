const { verify } = require('jsonwebtoken');
require('dotenv').config();

const validateToken = (req, res, next) => {
    try {
        const accessToken = req.header("Authorization").split(" ")[1];
        if (!accessToken) {
            return res.sendStatus(401);
        }

        const payload = verify(accessToken, process.env.APP_SECRET);
        req.userId = payload.id;
        req.username = payload.username;
        return next();
    }
    catch (err) {
        return res.sendStatus(401);
    }
}

module.exports = { validateToken };
