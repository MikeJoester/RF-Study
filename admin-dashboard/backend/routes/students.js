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
router.put("/:id", async (req, res) => {
  if (req.body._id === req.params.id) {
    try {
      const user = await Students.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Student info has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("Error updating student info!");
  }
});

//delete student
router.delete("/:id", async (req, res) => {
  if (req.body._id === req.params.id) {
    try {
      await Students.findByIdAndDelete(req.params.id);
      res.status(200).json("Student has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("Error deleting student info!");
  }
});

//add student log
router.post("/:id/logs", async (req, res) => {
  try {
    const student = await Students.findById(req.params.id);
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const newLog = {
      name : student.name,
      serial: student.serial,
      cardId: student.cardId,
      device_uid: student.device_uid,
      department: student.department,
      checkinDate: today,
      timein: (!student.card_status) ? time : 0,
      timeout: (student.card_status) ? time : 0,
    }
    const Log =  new StudentLogs(newLog);
    const savedLog = await Log.save();

    await student.updateOne({
      $set: { card_status: !student.card_status },
      $push: { logs: savedLog._id }
    })
    return res.status(200).json(savedLog)
  }catch (err) {
    return res.status(500).json(err);
  }
});

//update student log
router.put("/:id/logs", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await Students.findById(req.params.id);
        const currentUser = await Students.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("user has been unfollowed");
        } else {
          res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }
  });

module.exports = router;