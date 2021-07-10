const boom = require('boom')
const nodemailer = require("nodemailer");
const Feedback = require('../models/Feedback')

exports.newFeedback = async(req, reply) => {
    try {
        const feed = new Feedback(req.body)
        return feed.save()
    } catch (error) {
        throw boom.boomify(error)
    }
}
exports.getAll = async (req, reply) => {
    try {
        var feed = Feedback.find({
            $or: [{
                type: { $exists: false }
            }, {
                type: 'creators'
            }]
        }) // gets all feedback by creators
        return feed
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.getAllInternational = async (req, reply) => {
    try {
        var feed = Feedback.find({type: 'transfers'})
        return feed
    } catch (error) {
        throw boom.boomify(error)
    }
}
exports.sendMessage = async (req, reply) => {
    try {
        return new Promise((resolve, reject) => {
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
                from: `${req.body.username} via Shukran <contact@useshukran.com>`,
                to: req.body.subscribers,
                subject: req.body.message_subject,
                generateTextFromHTML: true,
                html: `${req.body.message}`
            };
            smtpTransport.sendMail(mailOptions, (error, response) => {
                smtpTransport.close();
                if (error) {
                    console.error('send msg err', error)
                    reject({ status: 'did not send' })
                } else {
                    console.log('send msg info', response)
                    resolve({ status: 'successfully sent' })
                }
            });

            // big Question! So what if the subscribers replies!!!!!
        })
    } catch (err) {
        throw boom.boomify(err)
    }
}