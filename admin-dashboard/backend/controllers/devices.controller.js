import {db}  from '../db.js'

export const getDevices = (req, res) => {
    const q = "SELECT * FROM devices"
    db.query(q, [req], (err, data) => {
        if (err) return res.send(err)

        return res.status(200).json(data)
    })
}

export const registerDevice = (req, res) => {
    //check existing user
    const q = "SELECT * FROM devices WHERE device_name = ?"
    db.query(q, [req.body.name, req.body.uid], (err, data) => {
        if (err) return res.json(err)
        if (data.length) return res.status(409).json("Device name or ID already exists!")

        const q = "INSERT INTO devices(`device_name`, `device_dep`, `device_uid`, `device_mode`, `device_date`) VALUES(?, CURDATE())"
        const values = [
            req.body.name,
            req.body.maj,
            req.body.uid,
            req.body.mode
        ]

        //post the new device
        db.query(q, [values], (err, data) => {
            if (err) return res.json(err)
            return res.status(200).json("New device registered!")
        })
    })
}

export const deleteDevice = (req, res) => {
    const q = "DELETE FROM devices WHERE uid = ?"
    db.query(q, [req.params.uid], (err, data) => {
        if (err) return res.send(err)

        res.status(200).send("Device Deleted!")
    })
}

export const updateDevice = (req, res) => {
    // const token = req.cookies.access_token
    // if (!token) return res.status(401).json("Not authenticated!")

    // jwt.verify(token, "jwtkey", (err, userInfo) => {
    //     if (err) return res.status(403).json("Token is not valid!")

        
    // })
    const deviceId = req.params.id;
    const q = "UPDATE devices SET `device_name`, `device_dep`, `device_mode` WHERE `device_uid` = ?"

    const values = [
        req.body.name,
        req.body.maj, 
        req.body.mode
    ]

    db.query(q, [...values, deviceId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.json("Device has been updated.")
    })
}