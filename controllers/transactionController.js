const boom = require('boom')
// const fx = require('money');
const TestTrans =  require('../models/TestTransactions')
const TestIntlTrans =  require('../models/TestIntlTransactions')
const Trans =  require('../models/Transactions')
const IntlTrans =  require('../models/InternationalTransactions')
const Money = require('../models/Money')
const nodemailer = require("nodemailer"); // would soon not need to import
const User = require('../models/User')
const sendemail = require('../helpers/sendemail')
const fx = require('../helpers/fx').fx

// Capitalize function
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

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

exports.createTransaction = (req, reply) => {
    try {

        let cookieDomain = 'useshukran.com', cookieSecure = true;

        if (req.hostname.match(/localhost:[0-9]{4,}/g)) { // if localhost
            cookieSecure = false
            cookieDomain = 'localhost'
        } else if (req.hostname.match(/shukranstaging.netlify.(com|app)/g)) {
            cookieDomain = 'shukranstaging.netlify.app' // .app because that's what netify defaults redirect to from .com
        } else if (req.hostname.match(/shukran.africa/g)) {
            cookieDomain = 'shukran.africa'
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
                path: '/api/creatorprofile/',
                httpOnly: true, // front end js can't access
                secure: cookieSecure, // if running live
                signed: true,
                sameSite: 'none',
                // domain: cookieDomain
            })

            if (!req.hostname.match(/localhost:[0-9]{4,}/g)) {
                reply.setCookie('_shukran', JSON.stringify(_ck), { // set again for alternate domains
                    path: '/api/creatorprofile/',
                    httpOnly: true, // front end js can't access
                    secure: cookieSecure, // if running live
                    signed: true,
                    sameSite: 'none',
                    domain: (cookieDomain === 'useshukran.com' ? 'shukran.africa' : '' )
                })
            }
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
                    path: '/api/creatorprofile/', // use this path // we should be importing this from /routes/index so it's more dynamic so when we change routes, it doesn't affect us
                    httpOnly: true, // front end js can't access
                    secure: cookieSecure, // if running live
                    signed: true,
                    sameSite: 'none',
                    maxAge: 11556952000, // 31556952000 => 1 year
                    // domain: cookieDomain
                })
                if (!req.hostname.match(/localhost:[0-9]{4,}/g)) {
                    reply.setCookie('_shukran', JSON.stringify(ck), { // set again for alternate domains
                        path: '/api/creatorprofile/',
                        httpOnly: true, // front end js can't access
                        secure: cookieSecure, // if running live
                        signed: true,
                        sameSite: 'none',
                        domain: (cookieDomain === 'useshukran.com' ? 'shukran.africa' : '' )
                    })
                }
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
                    path: '/api/creatorprofile/',
                    httpOnly: true, // front end js can't access
                    secure: cookieSecure, // if running live
                    signed: true,
                    sameSite: 'none',
                    maxAge: 11556952000, // 31556952000 => 1 year
                    // domain: cookieDomain
                })
                if (!req.hostname.match(/localhost:[0-9]{4,}/g)) {
                    reply.setCookie('_shukran', JSON.stringify(newCk), { // set again for alternate domains
                        path: '/api/creatorprofile/',
                        httpOnly: true, // front end js can't access
                        secure: cookieSecure, // if running live
                        signed: true,
                        sameSite: 'none',
                        domain: (cookieDomain === 'useshukran.com' ? 'shukran.africa' : '' )
                    })
                }
            }
        }
        /* transaction.save().then(trans => {
            console.log('transaction saved?', trans);
            if (req.body.tx_ref.includes('-shukraning-')) { // send back user profile with appropriate content
                User.find({'username': req.body.username}, (err, user) => { // remove password!!
                    if (err) { // shouldn't be! like, there shouldn't be an error
                        
                    } else {
                        console.log('using req body ...', req.body);
                        // we filter out the contents based on the supporter's money
                        // so what if a clever dev just copies the download link, and shares the link... we need to block access to content unless it's us accessing it. And unless the refeerer of the download request is coming from useshukran.com[/cr/creatorname]
                        user[0].content = user[0].content.filter((cntnt) => {
                            return cntnt.threshold.amount <= fx(req.body.amount).from(req.body.currency).to(cntnt.threshold.currency)
                        }) // <= ?? or >= ??

                        console.log('\n\n get this...', user);
                        reply.send(user)
                    }
                })
            } else {
                reply.send(trans) // return transaction.save() // TODO https://developer.flutterwave.com/docs/transaction-verification   
            }
        }, err => {
            // reply.status(500).send('Not good')
        }) */

        // quick fix here
        reply.send(200)
        

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
        
        
        if (req.body.data.tx_ref && req.body.data.tx_ref.includes('-intl-transfer-to-')) { // check for and save international transfers
            // const testIntlTransaction = new TestIntlTrans({
            //     sender_currency: req.body.data.tx_ref,
            //     destination_country: req.body.data.tx_ref,
            //     destination_bank: req.body.data.supporter_nickname,
            //     amount: amount,
            //     destination_bank_account_number: req.body.data.message,
            //     status: (req.body.event ? "charge.completed" : 'received' ? "transfer.completed" : "paid"),
            //     sender_fullname: 'NGN',
            //     sender_email: ''
            // }).save().then(_testMoney => {
            //     console.log('test saved money', _testMoney)
            // })
        } else if (req.body.event.includes("charge")) { // save other transactions (creators' tips and subscriptions)
            
            let amount = req.body.data.amount
            if (req.body.data.currency !== "NGN") {
                // we can do more
                amount = fx(amount) // convert to NGN
                .from(response.currency)
                .to("NGN");
            }
            // const testTransaction = new TestTrans({
            //     username: extractCreatorUsernameFromTxRef(req.body.data.tx_ref), // creator_username
            //     creator_id: extractCreatorIdFromTxRef(req.body.data.tx_ref),
            //     supporter_nickname: req.body.data.supporter_nickname,
            //     amount: amount,
            //     message: req.body.data.message,
            //     status: (req.body.event == "charge.completed" ? 'received' : "paid"),
            //     currency: 'NGN',
            // }).save().then(_testMoney => {
            //     console.log('test saved money', _testMoney)
            // })

            const transaction = new Trans({
                username: req.body.meta_data.username, // creator_username
                creator_id: extractCreatorIdFromTxRef(req.body.data.tx_ref),
                supporter_nickname: req.body.meta_data.supporter_nickname,
                amount: amount,
                message: req.body.meta_data.message,
                status: (req.body.event == "charge.completed" ? 'received' : "paid"), // "transfer.completed"
                currency: 'NGN',
            }).save().then(_testMoney => {
                console.log('==> saved money', _testMoney)
            })
            
        }

        
    } catch (err) {
      throw boom.boomify(err)
    } finally {
        console.log('the money', req.body);
        // save all money regardless
        const money = new Money(JSON.parse(JSON.stringify(req.body))) // why the stringify ? and parse ?
                
        money.save().then(_money => {
            sendemail.followTheMoney(req.body).then(() => {
                reply.code(200).send('we good!') // uhmm, this is a webhook, not sure we should respond.
            })
        }).catch(err => {
            console.error('err following the money', err)
        })
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
        reply.code(200).send('creators')
    } else if (req.body.username === 'oga-here' && req.body.password === 'na-really-us') {
        reply.code(200).send('transfers')
    } else {
        reply.code(403).send('hell no!')
    }
}