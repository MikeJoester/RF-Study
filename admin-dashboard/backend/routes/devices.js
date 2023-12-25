const Device = require("../models/devices");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//Get All Devices
router.get("/", async (req, res) => {
  try {
    const device = await Device.find();
    res.status(200).json(device);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Device
router.get("/:id", async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    res.status(200).json(device);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create Device
router.post("/", async (req, res) => {
  const newDevice = new Device(req.body);
  try {
    const savedDevice = await newDevice.save();
    return res.status(200).json(savedDevice);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

//Update Device Info
router.patch("/:id", async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    try {
      const updatedDevice = await Device.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json(updatedDevice);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

//Delete Device
router.delete("/:id", async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    try {
      await device.delete();
      res.status(200).json("Device has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;