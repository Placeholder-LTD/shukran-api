const mongoose = require('mongoose')

const TestSchema = mongoose.Schema({
    username: { type: String },
    supporter_nickname: { type: String },
    transaction_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Test', TestSchema)