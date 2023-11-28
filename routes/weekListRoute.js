const express = require('express')
const { healthApi } = require('../controllers/controllers')
const router = express.Router()

router.get('/health', healthApi)

module.exports = router