import express from "express";
import authRoutes from './routes/auth.routes.js'
import studentsRoutes from './routes/students.routes.js'
import devicesRoutes from './routes/devices.routes.js'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

const PORT = process.env.SVPORT;

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.json("Backend is working")
})

app.use("/api/auth", authRoutes)

app.use("/api/std", studentsRoutes)

app.use("/api/device", devicesRoutes)

app.listen(PORT, () => {
    console.log("Connected at port " + PORT)
})