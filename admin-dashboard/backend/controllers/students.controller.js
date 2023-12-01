import {db}  from '../db.js'
import jwt from 'jsonwebtoken'

export const getStudents = (req, res) => {
    const q = "SELECT * FROM users"
    db.query(q, [req], (err, data) => {
        if (err) return res.send(err)

        return res.status(200).json(data)
    })
}

export const getStudent = (req, res) => {
    const q = "SELECT * FROM users WHERE id = ?"
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.send(err)

        if (data.length) return res.status(200).json(data)
        else return res.send("No students found!")
    })
}

export const addStudent = (req, res) => {
    // const token = req.cookies.access_token
    // if (!token) return res.status(401).json("Not authenticated!")

    // jwt.verify(token, "jwtkey", (err, userInfo) => {
    // if (err) return res.status(403).json("Token is not valid!")

    const q = "INSERT INTO users(`username`, `serialnumber`, `gender`, `email`, `card_uid`, `card_select`, `device_uid`, `device_dep`, `add_card`, `user_date`) VALUES (?, CURDATE())"

    const values = [
      req.body.name,
      req.body.serial,
      req.body.gender,
      req.body.email,
      req.body.cardId,
      req.body.cardSelect,
      req.body.deviceId,
      req.body.deviceDep,
      req.body.addCard
    ]

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err)
      return res.json("Student added!")
    })
//   })
}

export const updateStudent = (req, res) => {
    
}


export const deleteStudent = (req, res) => {
    const q = "DELETE FROM users WHERE id = ?"
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.send(err)

        res.status(200).send("Student Deleted!")
    })
}

export const verifyStudent = (req, res) => {
    
}