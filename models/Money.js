const mongoose = require('mongoose')

const MoneySchema = mongoose.Schema({
    // event: String, // "charge.completed", // can't have this and "event.type"
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
        id: Number, // transaction_id,
        orderRef: String, // "URF_1587826781271_4887235",
        paymentPage: Number, // 40, // ?
        amount: Number, // 54600,
        charged_amount: Number, // 54600,
        currency: String, // "NGN",
        // "merchantbearsfee": 1,



        account_number: String,
        bank_name: String,
        bank_code: String,
        fullname: String,
        created_at: String,
        currency: String,
        debit_currency: String,
        amount: Number,
        fee: Number,
        status: String,
        reference: String,
        meta: String,// null,
        narration: String,
        approver: String, // null,
        complete_message: String,
        requires_approval: Number,
        is_approved: Number,



        // KYC
        customer: {
            name: String, // "Anonymous customer",
            phone_number: String, // null, // could it be any?
            created_at: String,
            id: Number, // 367450,
            email: String, // "user@gmail.com",
        },
        // card: String,
        card: {
            first_6digits: String, // "539983",
            last_4digits: String, // "1473",
            issuer: String, // "MASTERCARD GUARANTY TRUST BANK Mastercard Naira Debit Card",
            country: String, // "NG",
            type: String, // "MASTERCARD", "VERVE"
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
    // event_type: String,
})
MoneySchema.pre('validate', function(next) {
    // this. refers to the object being saved. 
    // JSON.parse(JSON.stringify(this))
    console.log('pre validate', this);
    let k = this.event.type
    delete this.event.type

    this.event_type = k
    next();
});
MoneySchema.pre('save', function(next) { // convert event.type to event_type
    // this. refers to the object being saved. 
    

    // JSON.parse(JSON.stringify(this))
    let k = this.event.type
    delete this.event.type

    this.event_type = k
    console.log('pre save', this);

    next();
});

module.exports = mongoose.model('Money', MoneySchema)