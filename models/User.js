const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    fullname: String,
    craft_type: String,
    account_name: String,
    account_number: String,
    summary: String,
    audience_size: String,
    create_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)