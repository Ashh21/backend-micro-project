const bcrypt = require('bcrypt')
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
        await user.save()
        res.status(200).json({
            user,
            message: 'user created successfully'
        })
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}



module.exports = { healthApi, signUp }