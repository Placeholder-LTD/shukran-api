const mongoose = require('mongoose')

const FeedbackSchema = mongoose.Schema({
    username: String,
    comment: String,
    feedback_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Feedback', FeedbackSchema)