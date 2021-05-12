const mongoose = require('mongoose')

const TestTransSchema = mongoose.Schema({
    username: { type: String }, // creator_username
    creator_id: { type: String },
    supporter_nickname: { type: String },
    amount: { type: String },
    message: { type: String },
    status: { type: String },
    currency: { type: String },
    transaction_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('TestTransaction', TestTransSchema)