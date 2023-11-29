const express = require('express')
const router = express.Router()
const db = require('../db')

const service = require('../services/student.service')

router.get('/', async(req, res) => {
    const students = await service.getAllStudents()
    res.send(students)
})

router.get('/:id', async(req, res) => {
    const student = await service.getStudentById(req.params.id)
    if (student.length == 0)
        res.status(404).json('Student with id ' + req.params.id + ' is not found')
    else res.send(student)
})

router.delete('/:id', async(req, res) => {
    const student = await service.deleteStudent(req.params.id)
    if (student == 0) 
    res.status(404).json('Student with id ' + req.params.id + ' is not found')
    else res.send('Student removed successfully!')
})

router.post('/', async(req, res) => {
    await service.addStudent(req.body)
    res.status(201).send('Created Successfully!')
})

router.patch('/:id', async(req, res) => {
    await service.editStudent(req.body, req.params.id)
    if (student == 0) 
    res.status(404).json('Student with id ' + req.params.id + ' is not found')
    else res.send('Patched Successfully!')
})

module.exports = router