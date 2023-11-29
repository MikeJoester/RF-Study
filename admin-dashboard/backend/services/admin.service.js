const db = require('../db')

module.exports.createAccount = async (obj, res) => {
    const [records] = await db.query("INSERT INTO `admin`(`admin_name`, `admin_email`, `admin_pwd`) VALUES (?, ?, ?)", 
    [
        obj.name,
        obj.email,
        obj.pwd
    ])
    return records
}

module.exports.getAdminEmail = async (email, res) => {
    const [mail] = await db.query("SELECT `admin_email` FROM `admin` WHERE `admin_email` = ?", email)
    return mail
}

module.exports.getAdminEmail = async (obj, res) => {
    const [records] = await db.query("SELECT * FROM users")
    return records
}