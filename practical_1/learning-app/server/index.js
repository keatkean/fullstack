const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Simple Route
app.get("/", (req, res) => {
    res.send("Welcome to the learning space.");
});

let port = 3001;
app.listen(port, () => {
    console.log(`⚡ Sever running on http://localhost:${port}`);
});
