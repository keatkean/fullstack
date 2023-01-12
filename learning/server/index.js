require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

let port = process.env.APP_PORT;
app.listen(port, () => {
    console.log(`⚡ Sever running on http://localhost:${port}`);
});
