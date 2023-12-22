const mongoose = require("mongoose");

const devices = new mongoose.Schema({
    device_name: {
        type: String,
        required:true
    },
    department: {
        type: String,
        required:true
    },
    device_uid: {
        type: String,
        required:true
    },
    device_mode: {
        type: Boolean,
        required:true
    },
}, { timestamps: true });

module.exports = mongoose.model("devices", devices);