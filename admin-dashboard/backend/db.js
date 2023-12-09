import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

export const db = mysql.createConnection({
    host    : process.env.HOST,
    user    : process.env.USER,
    password: process.env.PWD,
    database: process.env.DATABASE,
})

db.connect(function(err) {
    if (err) console.log(err)
    else console.log("Database Connected!")
});