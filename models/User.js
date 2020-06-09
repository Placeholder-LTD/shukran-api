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
    bank: String,
    phone: String,
    redirect: String,
    audience_size: String,
    primary_link: String,
    create_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema,'users')