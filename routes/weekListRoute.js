const express = require('express')
const { healthApi, signUp, login, createWeeklist, isLoggedIn, updateWeekList, deleteWeekList, getWeekLists } = require('../controllers/controllers')
const router = express.Router()

router.get('/health', healthApi)

router.post('/signup', signUp)

router.post('/login', login)

router.post('/weekList', isLoggedIn, createWeeklist)

router.patch('/weekList:id', isLoggedIn, updateWeekList)

router.delete('/weekList/:id', isLoggedIn, deleteWeekList)

router.get('/weekList', isLoggedIn, getWeekLists)


module.exports = router