const mongoose = require('mongoose')

const MoneySchema = mongoose.Schema({
    event: String, // "charge.completed",
    data: {
        tx_ref: String, // "Obakam -shukran-love and light podcast @ 1597322203407",
        flw_ref: String, // "FLW296686322",
        device_fingerprint: String, // "4799c6b9c0431ac8360f392b86c87e2d",
        charged_amount: Number, // 304.2,
        app_fee: Number, // 4.2,
        merchant_fee: Number, // 0,
        processor_response: String, // "Approved",
        auth_model: String, // "VBVSECURECODE",
        ip: String, // "197.210.44.86",
        narration: String, // "CARD Transaction ",
        status: String, // "successful",
        payment_type: String, // "card",
        created_at: String, // "2020-08-13T12:37:49.000Z",
        account_id: Number, // 144883,

        id: Number, // the transaction_id
        orderRef: String, // "URF_1587826781271_4887235",
        payment_plan: String,
        paymentPlan: String, // null, // should be a number, be string should work
        paymentPage: Number, // 40, // ?
        amount: Number, // 54600,
        charged_amount: Number, // 54600,
        currency: String, // "NGN",
        // "merchantbearsfee": 1,

        // KYC
        customer: {
            name: String, // "Anonymous customer",
            phone_number: String, // null, // could it be any?

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
        card: { 
            first_6digits: String, // "539983",
            last_4digits: String, // "1473",
            issuer: String, // "MASTERCARD GUARANTY TRUST BANK Mastercard Naira Debit Card",
            country: String, // "NG",
            type: String, // "MASTERCARD",
            expiry: String, // "08/21" 
        },
        payment_entity: String, // "1555852ca0687e2e4b6e5d8dccbbb869",
        entity: { // we should know this, right? and do what with it?
            card6: String, // "553188",
            card_last4: String, // "2950"
        }
    },
    // should be this, "event.type"
    "event.type": String, // "CARD_TRANSACTION" // important! how do our shuk-clans tip ? the most
})

module.exports = mongoose.model('Money', MoneySchema)