const mysql = require('mysql2/promise')
const dotenv = require('dotenv')

dotenv.config({path: './.env'})

const database = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: process.env.DATABASE
})

// database.query("SELECT *")
//     .then(data => console.log(data))
//     .catch(err => console.log("Database connection failed! \n" + err))

module.exports = database