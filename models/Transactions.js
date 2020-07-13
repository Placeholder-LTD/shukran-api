const mongoose = require('mongoose')

const TransSchema = mongoose.Schema({
    username: String,
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

module.exports = mongoose.model('Transaction', TransSchema)