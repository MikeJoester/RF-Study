const mongoose = require("mongoose");

const students = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    serial: {
        type: Number,
        required:true
    },
    cardId: {
        type: Number,
        required:true
    },
    card_status: {
        type: Boolean,
        required:true,
        default: false,
    },
    device_uid: {
        type: Number,
        required:true
    },
    department: {
        type: String,
        required:true
    },
    logs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Log",
      },
    ],
}, { timestamps: true });

const student_logs = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    serial: {
        type: Number,
        required:true
    },
    cardId: {
        type: Number,
        required:true
    },
    device_uid: {
        type: Number,
        required:true
    },
    department: {
        type: String,
        required:true
    },
    checkinDate: {
        type: Date,
        required:true,
    },
    timein: {
        type: String,
        required:true,
    },
    timeout: {
        type: String,
        required:true
    }
}, { timestamps: true });

let Students = mongoose.model("Student", students);
let StudentLogs = mongoose.model("Log", student_logs);

module.exports = { Students, StudentLogs };