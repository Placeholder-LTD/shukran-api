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
 * doing tests for now just to check
 * we are actually using webhook
 * @param {*} req 
 * @param {*} reply 
 */
exports.createInternationalTransaction = (req, reply) => {
    try {
        // save a cookie with the supporter_email
        const testIntlTransaction = new TestIntlTrans({
            sender_currency: req.body.sender_currency,
            destination_country: req.body.destination_country,
            destination_bank: req.body.destination_bank,
            amount: req.body.amount,
            destination_bank_account_number: req.body.destination_bank_account_number,
            status: req.body.status,
            sender_fullname: req.body.sender_fullname,
            sender_email: req.body.sender_email
        }).save().then(_testMoney => {
            console.log('test saved intl money', _testMoney)
        })
        
    } catch (err) {
      throw boom.boomify(err)
    }
}

exports.AllIntlTransactions = async (req, reply) => {
    try {
        let money = Money.find({"data.tx_ref": /-intl-transfer-to-/}) // 
        return money
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.updateTransaction = async (req, reply) => {
    try {
      const id = req.body.id
      const transaction = req.body
      const { ...updateData } = transaction
      const update = await Trans.findByIdAndUpdate(id, updateData, { new: true })
      return update
    } catch (err) {
      throw boom.boomify(err)
    }
}