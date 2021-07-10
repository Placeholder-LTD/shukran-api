const mongoose = require('mongoose')

const FeedbackSchema = mongoose.Schema({
    username: { type: String },
    comment: { type: String },
    feedback_date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        default: 'creators'
    }
})

module.exports = mongoose.model('Feedback', FeedbackSchema)