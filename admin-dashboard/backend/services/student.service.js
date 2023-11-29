const db = require('../db')

module.exports.getAllStudents = async () => {
    const [records] = await db.query("SELECT * FROM users")
    return records
}

module.exports.getStudentById = async (id) => {
    const [records] = await db.query("SELECT * FROM users WHERE serialnumber = ?", [id])
    return records
}

module.exports.deleteStudent = async (id) => {
    const [{record}] = await db.query("DELETE FROM users WHERE serialnumber = ?", [id])
    return record
}

module.exports.addStudent = async(obj) => {
    const [{student}] = await db.query("INSERT INTO `users`(`username`, `serialnumber`, `card_uid`) VALUES (?, ?, ?)", 
    [
        obj.name,
        obj.serial,
        obj.cardId
    ])
    return student
}

module.exports.editStudent = async(obj, id) => {
    const [{student}] = await db.query("UPDATE `users` SET `username`= ?,`serialnumber`= ?,`email`= ? WHERE `id` = ?", 
    [
        obj.name,
        obj.serial,
        obj.email,
        id
    ])
    return student
}