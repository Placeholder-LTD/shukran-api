const mongoose = require('mongoose')

const FeedbackSchema = mongoose.Schema({
    username: { type: String },
    comment: { type: String },
    feedback_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Feedback', FeedbackSchema)