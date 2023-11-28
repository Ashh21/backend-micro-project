const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')
const routes = require('./routes/weekListRoute')
const app = express()

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use('/', routes)

app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found'
    })
})

app.listen(process.env.PORT, () => {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log('server running successfully'))
        .catch((err) => console.error(err))
    console.log("listening to port", process.env.PORT)
})