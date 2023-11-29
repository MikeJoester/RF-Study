import express from "express";
import authRoutes from './routes/auth.routes.js'
//import studentsRoutes from './routes/students.routes.js'
import cookieParser from 'cookie-parser'
const app = express()

const PORT = 8888;

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.json("Backend is working")
})

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log("Connected at port " + PORT)
})