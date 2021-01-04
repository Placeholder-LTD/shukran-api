const boom = require('boom')
// const fx = require('money');
const Trans =  require('../models/Transactions')
const Money = require('../models/Money')
const nodemailer = require("nodemailer"); // would soon not need to import

const sendemail = require('../helpers/sendemail')

// Capitalize function
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

exports.createTransaction = async (req, reply) => {
    try {
        const transaction = new Trans(req.body)
        console.log('new transaction data\n\n\t', req.body)
        if (req.body.tx_ref.includes('-shukraning-')) {
            sendemail.sendCreatorAddedShuclan(req.body).catch(err => console.error(err))
            sendemail.sendShuclanThankYou(req.body).catch(err => console.error(err))
        } else { // just send that they were tipped
            /* await */ sendemail.sendTipEmail(req.body)
        }
        
        // save a cookie with the supporter_email
        if (req.cookies['_shukran']) {
            // maybe do nothing here, or check if the email here is the same email that paid before, if not, add it... hmm

        } else { // save cookie, so we always have this with every request.
            let _ck = {
                supporter_email: req.body.supporter_email,
                'shukran-subs': []
            }
            reply.setCookie('_shukran', JSON.stringify(_ck), {
                // path: '/cr',
                httpOnly: true, // front end js can't access
                // secure: true, // if running live
                signed: true
            })
        }
        /**
         * cookie should be an object names _shukran
         * we should have an array in the _shukran object named shukran-subs
         * add the id of the creator they subscribed to in the array.
         * if they don't, create an array with the id of the creator in it.
         */
        if (req.body.tx_ref.includes('-shukraning-')) { // important bit
            let crID = req.body.tx_ref.substring( // extract creator ID
                req.body.tx_ref.lastIndexOf("-") + 1, 
                req.body.tx_ref.indexOf(" ")
            );
            if (req.cookies['_shukran']) { // add to pre-existing array
                let ck = JSON.parse(req.cookies['_shukran']) // get our cookie, which is an object
                ck['shukran-subs'].push(crID)
                reply.setCookie('_shukran', JSON.stringify(ck), {
                    // path: '/cr',
                    httpOnly: true, //
                    // secure: true, // if running live
                    signed: true
                })
            } else { // create new array
                let newCk = {
                    supporter_email: req.body.supporter_email,
                    "shukran-subs": [crID]
                }
                reply.setCookie('_shukran', JSON.stringify(newCk), {
                    // path: '/cr',
                    httpOnly: true, //
                    // secure: true, // if running live
                    signed: true
                })
            }
        }
        reply.send(transaction.save())// return transaction.save() // TODO https://developer.flutterwave.com/docs/transaction-verification

    } catch (err) {
      throw boom.boomify(err)
    }
}
exports.requestPayout = async (req, reply) => {
    try {
        const transaction = new Trans(req.body)
                    let email = req.body.email
                    const smtpTransport = nodemailer.createTransport({
                        host: 'smtp.zoho.com',
                        port: 465,
                        secure: true,
                        auth: {
                            user: 'contact@useshukran.com',
                            pass: 'Password2020'
                        }
                      });
                   const mailOptions = {
                       from: "Ola from Shukran <contact@useshukran.com>",
                       to: 'olamide@useshukran.com',
                       subject: "Payout request by " + req.body.username.capitalize(),
                       generateTextFromHTML: true,
                       html: "<h2>Hey, <b>"+ req.body.username.capitalize() + "<"+email+"> just requested a payout of ₦"+req.body.amount+"</b></h2>"
                       + "So just pay ₦"+req.body.amount+". Please attend to it! Thanks."
                       };

                    smtpTransport.sendMail(mailOptions, (error, response) => {
                        error ? console.log(error) : console.log(response);
                        smtpTransport.close();
                    });
                   return transaction.save() 
         
    } catch (err) {
      throw boom.boomify(err)
    }
}
exports.AllTransactions = async (req, reply) => {
    try {
        var trans = Trans.find()
        return trans
    } catch (error) { 
        throw boom.boomify(error)
    }
}
exports.findRequested = async (req, reply) => {
    try {
        var status = req.body.status
        var trans = Trans.find({'status': status})
        return trans  
    } catch (err) {
      throw boom.boomify(err)
    }
}
exports.findAllMyTransaction = async (req, reply) => {
    try {
        var username = req.body.username
        var status = req.body.status
        var trans = Trans.find({
            $and: [
                {'username': username, 'status': status}
            ]
        })
        return trans  
    } catch (err) {
      throw boom.boomify(err)
    }
},
exports.findOneTransaction = async (req, reply) => {
    try {
        var id = req.body.id
        var mydocu = Trans.findById(id)
        return mydocu
    } catch(err) {
        throw  boom.boomify(err)
    }
}
exports.deleteTransaction = async (req, reply) => {
    try {
        var id = req.body.id
        var transaction = await Trans.findByIdAndRemove(id)
        return transaction
    } catch(err) {
        throw  boom.boomify(err)
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
exports.followTheMoney = async (req, reply) => { // TODO: https://developer.flutterwave.com/docs/transaction-verification
    try {
        const money = new Money(req.body)

        money.save()
        const smtpTransport = nodemailer.createTransport({
            host: 'smtp.zoho.com',
            port: 465,
            secure: true,
            auth: {
                user: 'contact@useshukran.com',
                pass: 'Password2020'
            }
          });
        const mailOptions = {
            from: "Ola from Shukran <contact@useshukran.com>",
            to: 'nwachukwuossai@gmail.com; theolaakomolafe@gmail.com',
            subject: "A transact just happened",
            generateTextFromHTML: true,
            html: "<h2>Hi <b>We got webhook data like:</b></h2>"
            + "Look for payment plan id & stuff!" + "<br>"
            + JSON.stringify(req.body)
            };

        smtpTransport.sendMail(mailOptions, (error, response) => {
            error ? console.log(error) : console.log(response);
            smtpTransport.close();
        });
        
    } catch (err) {
      throw boom.boomify(err)
    }
}
exports.getYourSupporters = async (req, reply) => { // we shouldn't use username/email, but sth more uhmmm IDish, ...
    try { // for now, we use username
        let yourSupporters = Trans.distinct('supporter_nickname', {username: req.query.username})
        
        return yourSupporters
         
    } catch (err) {
      throw boom.boomify(err)
    }
}