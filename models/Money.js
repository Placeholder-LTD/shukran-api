const mongoose = require('mongoose')

const MoneySchema = mongoose.Schema({
    // event: String, // "charge.completed", // can't have this and "event.type"
    data: {
        tx_ref: { type: String }, // "Obakam -shukran-love and light podcast @ 1597322203407",
        flw_ref: { type: String }, // "FLW296686322",
        device_fingerprint: { type: String }, // "4799c6b9c0431ac8360f392b86c87e2d",
        charged_amount: {type: Number}, // 304.2,
        app_fee: {type: Number}, // 4.2,
        merchant_fee: {type: Number}, // 0,
        processor_response: { type: String }, // "Approved",
        auth_model: { type: String }, // "VBVSECURECODE",
        ip: { type: String }, // "197.210.44.86",
        narration: { type: String }, // "CARD Transaction ",
        status: { type: String }, // "successful",
        payment_type: { type: String }, // "card",
        created_at: { type: String }, // "2020-08-13T12:37:49.000Z",
        account_id: {type: Number}, // 144883,
        id: {type: Number}, // transaction_id,
        orderRef: { type: String }, // "URF_1587826781271_4887235",
        paymentPage: {type: Number}, // 40, // ?
        amount: {type: Number}, // 54600,
        charged_amount: {type: Number}, // 54600,
        currency: { type: String }, // "NGN",
        // "merchantbearsfee": 1,



        account_number: { type: String },
        bank_name: { type: String },
        bank_code: { type: String },
        fullname: { type: String },
        created_at: { type: String },
        currency: { type: String },
        debit_currency: { type: String },
        amount: { type: Number},
        fee: { type: Number},
        status: { type: String },
        reference: { type: String },
        
        narration: { type: String },
        approver: { type: String }, // null,
        complete_message: { type: String },
        requires_approval: {type: Number},
        is_approved: {type: Number},



        // KYC
        customer: {
            name: { type: String }, // "Anonymous customer",
            phone_number: { type: String }, // null, // could it be any?
            created_at: { type: String },
            id: {type: Number}, // 367450,
            email: { type: String }, // "user@gmail.com",
        },
        card: {
            first_6digits: { type: String }, // "539983",
            last_4digits: { type: String }, // "1473",
            issuer: { type: String }, // "MASTERCARD GUARANTY TRUST BANK Mastercard Naira Debit Card",
            country: { type: String }, // "NG",
            type: { type: String }, // "MASTERCARD", "VERVE"
            expiry: { type: String }, // "08/21" 
        },
        payment_entity: { type: String }, // "1555852ca0687e2e4b6e5d8dccbbb869",
        entity: { // we should know this, right? and do what with it?
            card6: { type: String }, // "553188",
            card_last4: { type: String }, // "2950"
        }
    },
    meta_data: { 
        __CheckoutInitAddress: { type: String }, // 'https://shukranstaging.netlify.app/cr/feeddustbinestate',
        username: { type: String }, // 'feeddustbinestate',
        supporter_nickname: { type: String }, // 'Testing',
        supporter_email: { type: String }, // 'obakamtomgeorge@gmail.com',
        creator_id: { type: String }, // '6088608f57b1920004ec2276',
        message: { type: String }, // 'Testing',
        creator_email: { type: String }, // 'helloobakam@gmail.com'
    },
    // should be this, "event.type"
    "event.type": { type: String }, // "CARD_TRANSACTION" // important! how do our shuk-clans tip ? the most
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