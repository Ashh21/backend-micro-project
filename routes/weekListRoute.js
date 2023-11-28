const express = require('express')
const { healthApi, signUp } = require('../controllers/controllers')
const router = express.Router()

router.get('/health', healthApi)

router.post('/signup', signUp)

module.exports = router