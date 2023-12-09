import express from "express"
import {
  addStudent,
  deleteStudent,
  getStudent,
  getStudents,
  //updateStudent,
  verifyStudent
} from "../controllers/students.controller.js"

const router = express.Router()

router.get("/", getStudents)
router.get("/:id", getStudent)
router.get("/")
router.post("/", addStudent);
router.post("/:cardId", verifyStudent);
router.delete("/:id", deleteStudent)
// router.put("/:id", updateStudent);

export default router