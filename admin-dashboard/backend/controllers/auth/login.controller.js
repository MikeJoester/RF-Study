const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const db = require('../db')

const service = require('../../services/admin.service')

router.get('/login', async(req, res) => {
    const { email, password } = req.body

    if (email && password) {

    }
})