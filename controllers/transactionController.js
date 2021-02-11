const boom = require('boom')
// const fx = require('money');
const Trans =  require('../models/Transactions')
const Money = require('../models/Money')
const nodemailer = require("nodemailer"); // would soon not need to import
const User = require('../models/User')
const sendemail = require('../helpers/sendemail')
const fx = require('money')
fx.base = "USD";
fx.rates = { // Lower is Gooood
  "AED": 3.6732,
  "AFN": 77.571739,
  "ALL": 101.322195,
  "AMD": 522.91,
  "ANG": 1.79468,
  "AOA": 654.16,
  "ARS": 85.115434,
  "AUD": 1.29985,
  "AWG": 1.8,
  "AZN": 1.7025,
  "BAM": 1.601236,
  "BBD": 2,
  "BDT": 84.632456,
  "BGN": 1.601212,
  "BHD": 0.377011,
  "BIF": 1941.945389,
  "BMD": 1,
  "BND": 1.328012,
  "BOB": 6.919072,
  "BRL": 5.1934,
  "BSD": 1,
  "BTC": 0.00003015358,
  "BTN": 73.428791,
  "BWP": 10.802857,
  "BYN": 2.612258,
  "BZD": 2.015329,
  "CAD": 1.273005,
  "CDF": 1971.040379,
  "CHF": 0.890075,
  "CLF": 0.025749,
  "CLP": 710.49939,
  "CNH": 6.50503,
  "CNY": 6.533,
  "COP": 3461.475266,
  "CRC": 610.275904,
  "CUC": 0.999805,
  "CUP": 25.75,
  "CVE": 90.55,
  "CZK": 21.470201,
  "DJF": 178.902125,
  "DKK": 6.0929,
  "DOP": 58.177256,
  "DZD": 132.070391,
  "EGP": 15.842604,
  "ERN": 15.001453,
  "ETB": 39.551923,
  "EUR": 0.824063,
  "FJD": 2.0392,
  "FKP": 0.731368,
  "GBP": 0.731368,
  "GEL": 3.285,
  "GGP": 0.731368,
  "GHS": 5.899054,
  "GIP": 0.731368,
  "GMD": 51.755,
  "GNF": 10001.800634,
  "GTQ": 7.793425,
  "GYD": 209.171282,
  "HKD": 7.75325,
  "HNL": 24.201215,
  "HRK": 6.1794,
  "HTG": 72.62042,
  "HUF": 296.92,
  "IDR": 14213.6925,
  "ILS": 3.21302,
  "IMP": 0.731368,
  "INR": 73.09225,
  "IQD": 1468.227817,
  "IRR": 42105,
  "ISK": 127.81,
  "JEP": 0.731368,
  "JMD": 142.971637,
  "JOD": 0.709,
  "JPY": 103.23998054,
  "KES": 99.5, // 109.74,
  "KGS": 83.169856,
  "KHR": 4057.957295,
  "KMF": 403.000217,
  "KPW": 900,
  "KRW": 1085.73,
  "KWD": 0.304144,
  "KYD": 0.833157,
  "KZT": 421.359547,
  "LAK": 9341.069588,
  "LBP": 1519.51088,
  "LKR": 186.166825,
  "LRD": 164.233303,
  "LSL": 14.681041,
  "LYD": 1.344386,
  "MAD": 8.927095,
  "MDL": 17.269066,
  "MGA": 3931.398747,
  "MKD": 50.444146,
  "MMK": 1334.572418,
  "MNT": 2854.186283,
  "MOP": 7.983466,
  "MRO": 357,
  "MRU": 36.18,
  "MUR": 39.699575,
  "MVR": 15.4,
  "MWK": 774.654957,
  "MXN": 19.8822,
  "MYR": 4.0505,
  "MZN": 74.81,
  "NAD": 14.69,
  "NGN": 380, // 396.700509,
  "NIO": 34.873728,
  "NOK": 8.63301,
  "NPR": 117.485776,
  "NZD": 1.412085,
  "OMR": 0.384976,
  "PAB": 1,
  "PEN": 3.637889,
  "PGK": 3.539268,
  "PHP": 48.338897,
  "PKR": 160.992872,
  "PLN": 3.75377,
  "PYG": 6951.07244,
  "QAR": 3.64125,
  "RON": 3.9831,
  "RSD": 96.25,
  "RUB": 73.945,
  "RWF": 990.813199,
  "SAR": 3.751084,
  "SBD": 8.002049,
  "SCR": 21.204537,
  "SDG": 55.225,
  "SEK": 8.26929,
  "SGD": 1.321615,
  "SHP": 0.731368,
  "SLL": 10099.47633,
  "SOS": 581.358349,
  "SRD": 14.154,
  "SSP": 130.26,
  "STD": 20389.997455,
  "STN": 20.325,
  "SVC": 8.748595,
  "SYP": 513.419605,
  "SZL": 14.677733,
  "THB": 30.170546,
  "TJS": 11.325199,
  "TMT": 3.5,
  "TND": 2.6945,
  "TOP": 2.274086,
  "TRY": 7.4392,
  "TTD": 6.795284,
  "TWD": 28.069001,
  "TZS": 2318.537,
  "UAH": 28.475256,
  "UGX": 3655.26232,
  "USD": 1,
  "UYU": 42.360892,
  "UZS": 10474.795277,
  "VEF": 248487.642241,
  "VES": 1105425.302503,
  "VND": 23344.601074,
  "VUV": 108.952017,
  "WST": 2.536797,
  "XAF": 540.549729,
  "XAG": 0.03790043,
  "XAU": 0.0005268,
  "XCD": 2.70255,
  "XDR": 0.696046,
  "XOF": 540.549729,
  "XPD": 0.00040677,
  "XPF": 98.336844,
  "XPT": 0.00093188,
  "YER": 250.408348,
  "ZAR": 14.662595,
  "ZMW": 21.165801,
  "ZWL": 322
};
// Capitalize function
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

exports.createTransaction = (req, reply) => {
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
                path: '/api/creatorprofile/',
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
                    path: '/api/creatorprofile/', // use this path // we should be importing this from /routes/index so it's more dynamic so when we change routes, it doesn't affect us
                    httpOnly: true, // front end js can't access
                    secure: cookieSecure, // if running live
                    signed: true,
                    sameSite: 'none',
                    maxAge: 11556952000, // 31556952000 => 1 year
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
                    path: '/api/creatorprofile/',
                    httpOnly: true, // front end js can't access
                    secure: cookieSecure, // if running live
                    signed: true,
                    sameSite: 'none',
                    maxAge: 11556952000, // 31556952000 => 1 year
                    // domain: cookieDomain
                })
            }
        }
        transaction.save().then(trans => {
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