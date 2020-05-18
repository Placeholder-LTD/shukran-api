const mongoose = require('mongoose')

// This collects the creator's username so that it is loaded on their dashboard as list of transactions.
let transactionSchema = mongoose.Schema({
    username: String,
    supporter: String,
    amount: Number,
    message: String,
    create_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('transactions', transactionSchema);