const router = require("express").Router();
const User = require("../models/admin");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
    try {
      //generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.admin_password, salt);
  
      //create new user
      const newUser = new User({
        admin_name: req.body.admin_name,
        admin_email: req.body.admin_email,
        admin_password: hashedPassword,
      });
  
      //save user and respond
      const user = await newUser.save();
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  });
  
  //LOGIN
  router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ admin_email: req.body.admin_email });
      if (!user) return res.status(404).json("User not found");
  
      const validPassword = await bcrypt.compare(req.body.admin_password, user.admin_password);
      if (!validPassword) return res.status(400).json("Wrong password");
  
      res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  });
  
  module.exports = router;