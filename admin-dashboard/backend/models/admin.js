const mongoose = require("mongoose");

const admin = new mongoose.Schema({
    admin_name: {
        type: String,
        required:true,
        min: 3,
        max: 20,
        unique: true
    },
    admin_email: {
        type: String,
        required:true,
        max: 50,
        unique: true
    },
    admin_password: {
        type: String,
        required:true,
        min: 8,
    },
});

module.exports = mongoose.model("admin", admin);