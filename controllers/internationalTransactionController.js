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
            destination_bank_account_name: req.body.destination_bank_account_name,
            destination_bank_account_number: req.body.destination_bank_account_number,
            status: req.body.status,
            shukran_fee: req.body.shukran_fee,
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
        // let money = Money.find({"data.tx_ref": /-intl-transfer-to-/}) // 
        // return money

        var trans = IntlTrans.find()
        return trans
    } catch (error) {
        throw boom.boomify(error)
    }
}

// needs work
exports.updateTransaction = async (req, reply) => {
    try {
      const id = req.body.id
      const transaction = req.body
      // const { ...updateData } = transaction
      const update = await Trans.findByIdAndUpdate(id, {status: 'paid'}, { new: true })
      return update
    } catch (err) {
      throw boom.boomify(err)
    }
}

exports.getTransferRequests = async (req, reply) => {
    try {
        // let money = Money.find({"data.tx_ref": /-intl-transfer-to-/}) // 
        // return money

        var trans = IntlTrans.find({status: "received"})
        return trans
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.updateInternationalTransaction = async (req, reply) => {
    try {
        const id = req.body.id
        const transaction = req.body
        // const { ...updateData } = transaction
        const update = await Trans.findByIdAndUpdate(id, {status: 'paid'}, { new: true })
        return update
      } catch (err) {
        throw boom.boomify(err)
      }
}

exports.getAllUniqueUsers = async (req, reply) => {
    try {
        // let uniqueCustomers = Money.distinct("data.customer.email", {"data.tx_ref": /-intl-transfer-to-/}) // 
        // return uniqueCustomers

        let customers = IntlTrans.distinct("sender_email")
        return customers
    } catch (error) {
        throw boom.boomify(error)
    }
}