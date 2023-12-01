const mongoose = require('mongoose')
const User = require('../models/userModel')
const Schema = mongoose.Schema

const weekListSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    weekListId: Number,
    description: {
        type: String,
        required: true,
    },
    tasks: {
        type: [{
            description: String, completedAt: Date
        }],
        required: true
    },
    createdAt: Date,
    updatedAt: Date,
    completed: Boolean,
    timeLeft: Date,

})

module.exports = mongoose.model('WeekList', weekListSchema)