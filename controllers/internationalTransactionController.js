const boom = require('boom')
// const fx = require('money');
const TestIntlTrans =  require('../models/TestIntlTransactions')
const Money = require('../models/Money')
const nodemailer = require("nodemailer"); // would soon not need to import
const User = require('../models/User')
const IntlTrans =  require('../models/InternationalTransactions')
const sendemail = require('../helpers/sendemail')
const fx = require('../helpers/fx').fx

/**
 * we should be using webhook
 * @param {*} req 
 * @param {*} reply 
 */
exports.createInternationalTransaction = (req, reply) => {
    try {
        // save a cookie with the supporter_email
        const testIntlTransaction = new IntlTrans({
            sender_currency: req.body.sender_currency,
            destination_country: req.body.destination_country,
            destination_bank: req.body.destination_bank,
            amount: req.body.amount,
            destination_bank_account_number: req.body.destination_bank_account_number,
            status: req.body.status,
            sender_fullname: req.body.sender_fullname,
            sender_email: req.body.sender_email
        }).save().then(_testMoney => {
            console.log('test saved money', _testMoney)
        })
        

    } catch (err) {
      throw boom.boomify(err)
    }
}