const mongoose = require('mongoose')

const MoneySchema = mongoose.Schema({
    /* username: String,
    supporter_nickname: String,
    amount: String,
    message: String,
    status: String,
    currency: String,
    transaction_date: {
        type: Date,
        default: Date.now
    }, */


    id: Number, // the transaction_id
    txRef: String, // "hooli-tx-1920bbtyt",
    flwRef: String, // "FLW-MOCK-c293538cdcd65ec79744f241246ee2df",
    orderRef: String, // "URF_1587826781271_4887235",
    paymentPlan: String, // null, // should be a number, be string should work
    paymentPage: Number, // 40, // ?
    createdAt: String, // "2020-04-25T14:59:41.000Z",
    amount: Number, // 54600,
    charged_amount: Number, // 54600,
    status: String, // "successful", // well, of course it should be successful
    IP: String, // "102.89.2.173", // yessss
    currency: String, // "NGN",
    appfee: Number, // 2764.4,
    merchantfee: Number, // 0,
    // "merchantbearsfee": 1,

    // KYC
    customer: {
        id: Number, // 367450,
        phone: String, // "08102909304",
        fullName: String, // "Yemi Desola",
        customertoken: String, // null,
        email: String, // "user@gmail.com",
        createdAt: String, // "2020-04-25T13:51:38.000Z",
        updatedAt: String, //"2020-04-25T13:51:38.000Z",
        deletedAt: String, // null,
        AccountId: Number, // 27468
    },
    payment_entity: String, // "1555852ca0687e2e4b6e5d8dccbbb869",
    entity: { // we should know this, right? and do what with it?
        card6: String, // "553188",
        card_last4: String, // "2950"
    },
    // should be this, "event.type"
    "event.type": String, // "CARD_TRANSACTION" // important! how do our shuk-clans tip ? the most
})

module.exports = mongoose.model('Money', MoneySchema)