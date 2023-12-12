import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const dbinfo = {
    host    : process.env.HOST,
    user    : process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
}

console.log(dbinfo)

export const db = mysql.createConnection(dbinfo)

db.connect(function(err) {
    if (err) console.log(err)
    else console.log("Database Connected!")
});