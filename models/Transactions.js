const mongoose = require('mongoose')

const DocSchema = mongoose.Schema({
    username: String,
    supporter: String,
    amount: Number,
    message: String,
    transaction_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Document', DocSchema)