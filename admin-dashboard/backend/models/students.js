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
    card_select: {
        type: Boolean,
        required:true
    },
    user_date: {
        type: Date,
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
});

const student_logs = new mongoose.Schema({
    name: {
      type: String,
      required:true
    },
    year: {
      type: Number,
      required:true
  },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
});