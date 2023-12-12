import express from "express"
import { 
    registerDevice,
    getDevices,
    deleteDevice,
    updateDevice
} from "../controllers/devices.controller.js"

const router = express.Router()

router.get("/", getDevices)
router.post("/register", registerDevice)
router.delete("/:uid", deleteDevice)

export default router