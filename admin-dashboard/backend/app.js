const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
require('express-async-errors')

const port = 8080
const db = require('./db')
const bodyParser = require('body-parser')
    studentRoutes = require('./controllers/student.controller')

app.use(cors(
    { 
        origin: [""], 
        methods: ["POST, GET"],
        credentials: true
    }
))

// db.query("SELECT 1")
//     .then(() => {
//         console.log("Database connection succeeded!")
//         app.listen(port, () => {
//             console.log(`Server is running on port: ${port}`)
//         })
//     })
//     .catch(err => console.log("Database connection failed! \n" + err))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/test.html'));
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

//middleware
app.use(bodyParser.json())
app.use('/api/students', studentRoutes)
app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).send('Something went wrong!');
})