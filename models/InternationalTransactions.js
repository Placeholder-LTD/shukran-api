const mongoose = require('mongoose')

const InternationalTransactionsSchema = mongoose.Schema({
    sender_currency: { type: String },
    destination_country: { type: String },
    destination_bank: { type: String },
    amount: { type: String },
    destination_bank_account_number: { type: String },
    status: { type: String },
    sender_fullname: { type: String },
    sender_email: { type: String },

    destination_bank_account_name: { type: String },
    transaction_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('InternationalTransactions', InternationalTransactionsSchema)