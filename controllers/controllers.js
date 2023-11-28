
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




module.exports = { healthApi }