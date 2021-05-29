

const Subs =  require('./models/Subscription')
const getAllSubscribers = require('./flutterwave-api-calls/get-all-subscribers')
const getAllPaymentPlans = require('./flutterwave-api-calls/get-all-payment-plans')

const User = require('./models/User')
const mongoose = require('mongoose')
require('dotenv').config()

const db = process.env.ATLAS_CONNECTION_STRING
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(function afterConn(db) {
    console.info('MongoDB connected...')
    
})
.catch(err => console.error(err))

// https://anchor.fm/Blueribbonpodcast?status=successful&tx_ref=nwachukwuossai%40gmail.com-shukraning-5ecbfeb1b0a18b0018b69544%20%40%201609762635812&transaction_id=347872860


let the_money = {
     event: 'charge.completed',
     data: {
        id: 435154054,
        tx_ref: 'uchennauyanwune@yahoo.com-shukran-6088608f57b1920004ec2276 @ 1622310838173 | https://useshukran.com/cr/feeddustbinestate',
        flw_ref: 'WGSI6315643320821',
        device_fingerprint: 'ddfd434240871b80a55183f2cdcbb889',
        amount: 3000,
        currency: 'NGN',
        charged_amount: 3042,
        app_fee: 42,
        merchant_fee: 0,
        processor_response: 'Approved',
        auth_model: 'VBVSECURECODE',
        ip: '129.205.112.184',
        narration: 'CARD Transaction ',
        status: 'successful',
        payment_type: 'card',
        created_at: '2021-05-29T17:54:54.000Z',
        account_id: 144883,
        customer: {
            id: 263257663,
            name: 'Anonymous customer',
            phone_number: null,
            email: 'uchennauyanwune@yahoo.com',
            created_at: '2021-05-29T17:54:54.000Z'
        },
        card: {
            first_6digits: '539983',
            last_4digits: '6611',
            issuer: 'MASTERCARD GUARANTY TRUST BANK Mastercard Naira Debit Card',
            country: 'NG',
            type: 'MASTERCARD',
            expiry: '01/24'
        }
     },
     meta_data: {
     __CheckoutInitAddress: 'https://useshukran.com/cr/feeddustbinestate',
        supporter_nickname: 'Oge Ferrari',
        customer_id: '34',
        randome_number: '4898249834',
        consumer_mac: '92a3-912ba-1192a-lol'
     },
     'event.type': 'CARD_TRANSACTION'
     }