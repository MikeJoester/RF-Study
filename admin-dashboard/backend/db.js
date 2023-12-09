import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

export const db = mysql.createConnection({
    host    : process.env.HOST.toString(),
    user    : process.env.USER.toString(),
    password: process.env.PWD.toString(),
    database: process.env.DATABASE.toString(),
})

db.connect(function(err) {
    if (err) console.log(err)
    else console.log("Database Connected!")
});