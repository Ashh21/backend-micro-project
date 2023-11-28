const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')
const routes = require('./routes/weekListRoute')
const app = express()

app.use(bodyParser.json())
app.use('/', routes)

app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found'
    })
})

app.listen(3000, () => {
    console.log("listening to port")
})