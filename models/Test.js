const mongoose = require('mongoose')

const TestSchema = mongoose.Schema({
    username: String,
    supporter_nickname: String,
    transaction_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Test', TestSchema)