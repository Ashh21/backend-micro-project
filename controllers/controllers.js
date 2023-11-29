const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

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
        const jwttoken = jwt.sign({email}, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
        await user.save()
        res.status(200).json({
            user,
            jwttoken,
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
            const jwttoken = jwt.sign(token, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
            return res.status(200).json({
                message: "You've successfully logged in",
                jwttoken
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


module.exports = { healthApi, signUp, login }