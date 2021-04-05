

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