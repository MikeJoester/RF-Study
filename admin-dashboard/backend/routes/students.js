const {Students, StudentLogs} = require("../models/students");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//get students
router.get("/", async (req, res) => {
  try {
    const user = await Students.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get student by id
router.get("/:id", async (req, res) => {
  try {
    const user = await Students.findById(req.params.id);
    // const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//add student 
router.post("/", async (req, res) => {
  const newStudent = new Students(req.body);
  try {
    const savedStudent = await newStudent.save();
    return res.status(200).json(savedStudent);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

//update student
router.patch("/:id", async (req, res) => {
  try {
    const user = await Students.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Student info has been updated");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//delete student
router.delete("/:id", async (req, res) => {
  try {
    await Students.findByIdAndDelete(req.params.id);
    res.status(200).json("Student has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//view student logs
router.get("/:id/logs", async (req, res) => {
  try {
    const student = await Students.findById(req.params.id).populate('logs');
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    return res.status(200).json(student.logs);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//add student log
router.post("/:id/logs", async (req, res) => {
  try {
    const student = await Students.findOne({ cardId: req.params.id });
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    const newLog = {
      name : student.name,
      serial: student.serial,
      cardId: student.cardId,
      device_uid: student.device_uid,
      department: student.department,
      checkinDate: today,
    }

    if (!student.card_status) {
      const Log =  new StudentLogs({
        ...newLog, 
        timein: time,
        timeout: 0
      });
      const savedLog = await Log.save();

      await student.updateOne({
        $set: { card_status: !student.card_status },
        $push: { logs: savedLog._id }
      });
      return res.status(200).json(savedLog);
    } else {
      const studentLogs = await Students.findOne({ cardId: req.params.id }).populate('logs');
      const lastLog = studentLogs.logs[studentLogs.logs.length - 1];

      const updatedLog = await StudentLogs.findByIdAndUpdate(
        lastLog._id,
        {
          $set: {
            timeout: time,
          },
        },
        { new: true }
      );

      await student.updateOne({
        $set: { card_status: !student.card_status }
      });
      return res.status(200).json(updatedLog);
    }  
  }catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;