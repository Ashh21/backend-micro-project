const express = require('express')
const { healthApi, signUp, login } = require('../controllers/controllers')
const router = express.Router()

router.get('/health', healthApi)

router.post('/signup', signUp)

router.post('/login', login)

module.exports = router