import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config({path: './.env'})

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: process.env.DATABASE
})