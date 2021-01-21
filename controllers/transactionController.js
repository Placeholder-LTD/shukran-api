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

        let cookieDomain = 'useshukran.com', cookieSecure = true;

        if (req.hostname.match(/localhost:[0-9]{4,}/g)) { // if localhost
            cookieSecure = false
            cookieDomain = 'localhost'
        } else if (req.hostname.match(/shukranstaging.netlify.(com|app)/g)) {
            cookieDomain = 'shukranstaging.netlify.app' // .app because that's what netify defaults redirect to from .com
        }

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
            reply.setCookie('_shukran', JSON.stringify(_ck), { // don't waste your time https://stackoverflow.com/a/60953789/9259701
                path: '/api/myprofile/',
                httpOnly: true, // front end js can't access
                secure: cookieSecure, // if running live
                signed: true,
                sameSite: 'none',
                // domain: cookieDomain
            })
        }
        /**
         * cookie should be an object names _shukran
         * we should have an array in the _shukran object named shukran-subs
         * add the id of the creator they subscribed to in the array. and how much they subscirbed with and in what currency
         * if they don't, create an array with the id of the creator in it.
         */
        if (req.body.tx_ref.includes('-shukraning-')) { // important bit
            let crID = req.body.tx_ref.substring( // extract creator ID
                req.body.tx_ref.lastIndexOf("-") + 1, 
                req.body.tx_ref.indexOf(" ")
            );
            if (req.cookies['_shukran'] && req.unsignCookie(req.cookies['_shukran']).valid) { // add to pre-existing array
                let ck___ = req.unsignCookie(req.cookies['_shukran']);
                let ck__ = JSON.parse(JSON.stringify(ck___))
                let ck = JSON.parse(ck__.value)  // get our cookie, which is an object
                if (typeof ck === 'string') {
                    ck = JSON.parse(ck)
                }
                
                ck['shukran-subs'].push({
                    creator_id: crID,
                    amount: req.body.amount,
                    currency: req.body.currency
                })
                reply.setCookie('_shukran', JSON.stringify(ck), {
                    path: '/api/myprofile/', // use this path
                    httpOnly: true, // front end js can't access
                    secure: cookieSecure, // if running live
                    signed: true,
                    sameSite: 'none',
                    maxAge: 3 * 1000, // 31556952000 => 1 year
                    // domain: cookieDomain
                })
            } else { // create new array
                let newCk = {
                    supporter_email: req.body.supporter_email,
                    "shukran-subs": [{
                        creator_id: crID,
                        amount: req.body.amount,
                        currency: req.body.currency
                    }]
                }
                reply.setCookie('_shukran', JSON.stringify(newCk), {
                    path: '/api/myprofile/',
                    httpOnly: true, // front end js can't access
                    secure: cookieSecure, // if running live
                    signed: true,
                    sameSite: 'none',
                    maxAge: 3 * 1000, // 31556952000 => 1 year
                    // domain: cookieDomain
                })
            }
        }
        transaction.save().then(trans => {
            console.log('transaction saved?', trans);
            reply.send(trans) // return transaction.save() // TODO https://developer.flutterwave.com/docs/transaction-verification
        }, err => {

        })
        

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
exports.followTheMoney = (req, reply) => { // TODO: https://developer.flutterwave.com/docs/transaction-verification
    try {
        const money = new Money(req.body)

        money.save().then(_money => {
            sendemail.followTheMoney(req.body).then(() => {
                reply.code(200).send('we good!')
            })
        })
        
        
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

exports.BossLogin = (req, reply) => {
    if (req.body.username === 'boss-here' && req.body.password === 'na-really-us') {
        reply.code(200).send('welcome')
    } else {
        reply.code(403).send('hell no!')
    }
}