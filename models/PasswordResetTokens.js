const mongoose = require('mongoose')

const PRTSchema = mongoose.Schema({
    token_hash: { type: String },
    used: {
        type: Boolean,
        default: false
    }, // the name of the product
    creator_email: { type: String },
    creator_username: { type: String },
    created: { // create_date: 2020-05-25T17:21:53.109+00:00
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('PasswordResetToken', PRTSchema)