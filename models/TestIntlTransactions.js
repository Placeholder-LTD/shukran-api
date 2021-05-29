const mongoose = require('mongoose')

const TestIntlTransSchema = mongoose.Schema({
    sender_currency: { type: String }, // creator_username
    destination_country: { type: String },
    destination_bank: { type: String },
    amount: { type: String },
    destination_bank_account_number: { type: String },
    sender_fullname: { type: String },
    sender_email: { type: String },
    status: { 
        type: String
    },
    // destination_currency: { type: String }, // can be auto infered from destination_country & destination_bank_account_number (& maybe for DOM accts)
    transaction_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('TestIntlTransaction', TestIntlTransSchema)