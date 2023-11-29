const express = require('express')
const path = require('path')
const cors = require('cors')
const passport = require('passport')
var mysql = require('mysql2')
require("./config/passport")(passport)
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8080

app.use(cors({ origin: true, credentials: true }))

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "students"
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!!!")
  });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/test.html'));
})

// route goes here
// const blogsRouter = require('./routes/blogs')
// const classesRouter = require('./routes/classes')
// const courselogsRouter = require('./routes/course-logs')
// const coursesRouter = require('./routes/courses')
// const majorsRouter = require('./routes/majors')
// const studentsRouter = require('./routes/students')
// const resultsRouter = require('./routes/student-result')
// const authRouter = require('./routes/auth')
// const transcriptRouter = require('./routes/transcript')
// const adminLoginRouter = require('./routes/admin-auth')
// const surveyRouter = require('./routes/surveys')

// app.use("/blogs", blogsRouter)
// app.use("/classes", classesRouter)
// app.use("/courselogs", courselogsRouter)
// app.use("/courses", coursesRouter)
// app.use("/majors", majorsRouter)
// app.use("/students", studentsRouter)
// app.use("/results", resultsRouter)
// app.use("/auth", authRouter)
// app.use("/transcript", transcriptRouter)
// app.use("/adminlogin", adminLoginRouter)
// app.use("/surveys", surveyRouter)