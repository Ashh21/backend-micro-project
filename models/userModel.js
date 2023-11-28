const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    fullname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    mobile: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('User', UserSchema)