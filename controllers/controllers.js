const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const WeekList = require('../models/weekListModel')

const healthApi = async (req, res) => {
    try {
        const serverName = 'The Week List'
        const currentTime = new Date().toLocaleString()
        let serverStatus = 'inActive'

        const isServerHealthy = true
        if (isServerHealthy) {
            serverStatus = 'active'
        }

        res.status(200).json({
            serverName, currentTime, serverStatus
        })
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const signUp = async (req, res) => {
    try {
        const { fullname, email, password, age, gender, mobile } = req.body
        const encryptPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ fullname, email, password: encryptPassword, age, gender, mobile })
        const sigupjwttoken = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
        await user.save()
        res.status(200).json({
            user,
            sigupjwttoken,
            message: 'user created successfully'
        })
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(403).json({
                message: 'Incorrect credentials! user not found'
            })
        }

        const isPassworMatched = await bcrypt.compare(password, user.password)
        if (isPassworMatched) {
            const token = { userId: user._id, email: user.email }
            const loginjwttoken = jwt.sign(token, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
            return res.status(200).json({
                message: "You've successfully logged in",
                loginjwttoken
            })
        } else {
            res.status(403).json({
                message: 'Incorrect credentials! Please try again'
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

const isLoggedIn = (req, res, next) => {
    try {
        const { loginjwttoken } = req.headers;
        const user = jwt.verify(loginjwttoken, process.env.JWT_SECRET_KEY)
        req.user = user;
        next()
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const createWeeklist = async (req, res) => {
    try {
        const activeWeeklist = await WeekList.countDocuments({
            completed: false
        })
        if (activeWeeklist >= 2) {
            return res.status(403).json({
                error: 'User can have only two active week lists at a time, complete previous one to create new weeklist'
            })
        }
        const { description, tasks, } = req.body
        // const currentTime = Date.now()
        // const timeLeft = 24 * 60 * 60 * 1000 - currentTime
        // console.log(timeLeft)
        // console.log(currentTime)
       
        const newWeekList = await WeekList.create({
            userId: req.user.userId,
            description,
            tasks,
            completed: false,
            weekListId: await WeekList.countDocuments() + 1,
            createdAt: Date.now(),
            timeLeft
        })

        const timeLeft = (20 * 60 * 60 * 60 * 1000 - newWeekList.createdAt)
        

        res.status(201).json({ newWeekList, timeLeft })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

const updateWeekList = async (req, res) => {
    try {
        const { id } = req.params
        const weekList = await WeekList.findById(id)

        const currentTime = Date.now()

        const updateIn = currentTime - weekList.createdAt

        if (updateIn > 24 * 60 * 60 * 1000) {
            res.status(400).json({
                error: "you can update weeklist within 24 hours so 24hrs passed now you can't update the weeklist"
            })
        }

        const updateWeekList = await WeekList.findByIdAndUpdate(id, { $set: req.body, updatedAt: Date.now() })
        res.status(200).json(updateWeekList)
    }
    catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

const deleteWeekList = async (req, res) => {
    try {
        const { id } = req.params
        const weekList = await WeekList.findById(id)

        const currentTime = Date.now()

        const updateIn = currentTime - weekList.createdAt

        if (updateIn > 24 * 60 * 60 * 1000) {
            res.status(400).json({
                error: "you can delete weeklist within 24 hours so 24hrs passed now you can't delete the weeklist"
            })
        }

        const updateWeekList = await WeekList.findByIdAndDelete(id)
        res.status(200).json(updateWeekList)
    }
    catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

const getWeekLists = async (req, res) => {
    try {
        const { id } = req.params
        const weekList = await WeekList.find(id)
        res.json({ weekList })
    }
    catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

module.exports = { healthApi, signUp, login, isLoggedIn, createWeeklist, updateWeekList, deleteWeekList, getWeekLists }