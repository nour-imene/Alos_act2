const express = require('express')
const app = express()
const prt = 3000
const jsonDataBase = require('./db.json')
const {body, validationResult} = require('express-validator');

app.get('/', (req, res) => {
    res.send('hi')
})

app.listen(prt, () => {
    console.log(` ${prt}`)
})


app.get('/users', (req, res) => {
    res.send(jsonDataBase)
})

app.get('/users/by_id/:id', [body('id').isNumeric()], (req, res) => {

    const id = parseInt(req.params.id)
    const users = jsonDataBase.participants.find(Users =>users.id === id)

    res.status(users ? 200 : 404).send(users ? users : 'users with id ' + id + ' not found')

})

app.get('/users/by_name/:name', [body('name').isString()], (req, res) => {

    const name = req.params.name.toLowerCase().trim()
    const users = jsonDataBase.users.find(users => users.name.toLowerCase().trim() === name)

    res.status(users ? 200 : 404).send(users ? users : 'users with name ' + name + ' not found')

})
