const mongoose = require('mongoose')

const TestTransSchema = mongoose.Schema({
    username: String, // creator_username
    creator_id: String,
    supporter_nickname: String,
    amount: String,
    message: String,
    status: String,
    currency: String,
    transaction_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('TestTransaction', TestTransSchema)