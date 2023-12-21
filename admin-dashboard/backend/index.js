const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require('path');

dotenv.config();
app.use(express.json())
app.use(express.urlencoded({extended: false}))

mongoose
    .connect(process.env.MONGO_URL)
    .then((success) => {
        console.log("Connected to MongoDB");
        app.listen(8888);
        console.log("Server started at port 8888");
    })
    .catch((err) => console.log(err.message));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})