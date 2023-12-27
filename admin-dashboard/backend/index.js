const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require('path');
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/students");
const deviceRoute = require("./routes/devices");

dotenv.config();

app.use(helmet());
app.use(cors());
app.use(morgan("common"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

mongoose
    .connect(process.env.MONGO_URL)
    .then((success) => {
        console.log("Connected to MongoDB");
        app.listen(8888);
        console.log("Server started at port 8888");
    })
    .catch((err) => console.log("Something wrong with the server. Please restart"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.use("/api/auth", authRoute);
app.use("/api/std", userRoute);
app.use("/api/device", deviceRoute);