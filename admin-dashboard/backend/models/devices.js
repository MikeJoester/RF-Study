const mongoose = require("mongoose");

const devices = new mongoose.Schema({
    device_name: {
        type: String,
        required:true
    },
    device_email: {
        type: String,
        required:true
    },
    device_uid: {
        type: String,
        required:true
    },
    device_date: {
        type: Date,
        required:true
    },
    device_mode: {
        type: Boolean,
        required:true
    },
});