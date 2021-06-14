


const fx = require('../helpers/fx').fx
    const sendemail = require('../helpers/sendemail')
    const Trans =  require('../models/Transactions')
const Money = require('../models/Money')

const mongoose = require('mongoose')
require('dotenv').config()

const db = process.env.ATLAS_CONNECTION_STRING
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(function afterConn(db) {
    console.info('MongoDB connected...')

 
    

let req = {};
req.body = {
    event: 'charge.completed',
    data: {
    id: 442345947,
    tx_ref: 'nkasichukwu@gmail.com-shukran-606305a7a209540018238e00 @ 1623665949679 | https://useshukran.com/cr/gidi%20stories',
   flw_ref: 'FLTC2967660104820',
    device_fingerprint: 'ebe66b35518bec72dccd23d121279254',
    amount: 5,
    currency: 'USD',
    charged_amount: 5.19,
    app_fee: 0.19,
    merchant_fee: 0,
    processor_response: 'Approved',
    auth_model: 'VBVSECURECODE',
    ip: '197.210.8.145',
    narration: 'CARD Transaction ',
    status: 'successful',
    payment_type: 'card',
    created_at: '2021-06-14T10:19:57.000Z',
    account_id: 144883,
    customer: {
    id: 266601573,
    name: 'Anonymous customer',
    phone_number: null,
    email: 'nkasichukwu@gmail.com',
    created_at: '2021-06-14T10:19:57.000Z'
    },
    card: {
    first_6digits: '533853',
    last_4digits: '5630',
    issuer: 'MASTERCARD BANK Mastercard Dollar Debit Card',
    country: 'NG',
    type: 'MASTERCARD',
    expiry: '03/22'
    }
    },
    meta_data: {
    __CheckoutInitAddress: 'https://useshukran.com/cr/gidi%20stories',
    supporter_message: 'You%E2%80%99re%20doing%20well',
    supporter_nickname: 'Eclipse ',
    message: 'You%E2%80%99re%20doing%20well',
    customer_id: '34',
   randome_number: '4898249834',
   consumer_mac: '92a3-912ba-1192a-lol'
   },
   'event.type': 'CARD_TRANSACTION'
   };


   /**
 * won't work if tx_ref is Links-035333822212 ...for when they send money via links
 * sample input 
 * 1. ryanmwas@gmail.com-shukran-5f2c28d2516d290018eddd03 @ 1618564158976 | https://useshukran.com/cr/wanji
 * 2. randoma@mail.com-word-5a2i96d1517d290018eghd44 @ 1618564102876 | https://sitesth.com/cr/waewe32w
 * @param {*} tx_ref 
 * @returns creator id
 */
function extractCreatorIdFromTxRef(tx_ref) {
    return tx_ref.substring( // extract creator ID
        tx_ref.lastIndexOf("-") + 1, 
        tx_ref.indexOf(" ")
    )
}

/**
 * won't work if tx_ref is Links-035333822212 ...for when they send money via links
 * @param {*} tx_ref 
 * @returns 
 */
function extractCreatorUsernameFromTxRef(tx_ref) {
    let url = tx_ref.match(/(https?:\/\/[^ ]*)/)[1] // extract url
    return url.substring( // extract username from url
                url.lastIndexOf('/') + 1,
                url.length
            )
}

console.log('\n\nstarting\n\n');
let t = new Money(req.body)
t.save().then(s => {
    console.log('Money saved', s);
    sendemail.followTheMoney(req.body).then(() => {
        console.log('good good');
        // reply.code(200).send('we good!') // uhmm, this is a webhook, not sure we should respond.

        let amount = req.body.data.amount
                if (req.body.data.currency !== "NGN") {
                    // we can do more
                    amount = fx(amount) // convert to NGN
                    .from(req.body.data.currency)
                    .to("NGN");
                }
                
    
                const transaction = new Trans({
                    username: extractCreatorUsernameFromTxRef(req.body.data.tx_ref), // req.body.meta_data.username, // creator_username
                    creator_id: extractCreatorIdFromTxRef(req.body.data.tx_ref),
                    supporter_nickname: req.body.meta_data.supporter_nickname,
                    amount: amount,
                    message: req.body.meta_data.message,
                    status: (req.body.event == "charge.completed" ? 'received' : "paid"), // "transfer.completed"
                    currency: 'NGN',
                }).save().then(_testMoney => {
                    console.log('==> saved money', _testMoney)
                }, er => {
                    console.error('err saving trans', er);
                })
    })
}, e => {
    console.error('Money saving err', e);
})
    
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