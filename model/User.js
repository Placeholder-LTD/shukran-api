var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    fullname: String,
    craft_type: String,
    account_name: String,
    account_number: String,
    summary: String,create_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('users', userSchema);