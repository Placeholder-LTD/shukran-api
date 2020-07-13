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
    picture_id: {
        type: String,
        default: '1aMDqEuCDesg0cTpHJj0IHehEDUEk3l_F', // '1l6Yn2_89KDaDZhH67Ge4Z6T8x7C0Q91J' // red shapes pattern
    },
    create_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema, 'users')