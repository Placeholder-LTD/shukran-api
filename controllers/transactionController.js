const boom = require('boom')
const fx = require('money');
const Trans =  require('../models/Transactions')
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
    "355490130720-q9f2krivetnprnl59p10uu100578cffs.apps.googleusercontent.com", // ClientID
    "s3HyZjhGv8ZojjMapouHGgH1", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: "1//04op4GMHXQPVRCgYIARAAGAQSNwF-L9Irmq_36btkeFfuRVSYPqQz6c3TWbl5JGHy1uAN39eSEMGzUnp79t8Q46ZMlB0uO1vwzks"
});
const accessToken = oauth2Client.getAccessToken()
// Capitalize function
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
exports.createTransaction = async (req, reply) => {
    try {
        const ex = () => {
            req.body.amount = fx(req.body.amount).from(req.body.currency).to("NGN")
          };
        // convert to naira if money isn't in naira.
        if (req.body.currency !== "NGN") {
            // hide app_id
            await fetch(`https://openexchangerates.org/api/latest.json?app_id=91527baa61514e6e81db3a2604a4822f`)
                .then(resp => resp.json())
                .then(data => {
                    fx.base = "USD"; // must be USD, [free plan]
                    fx.rates = data.rates;
                })
                .then(ex)
                .catch(err => console.error("fetch ex rates err", err));
        }
         const transaction = new Trans(req.body)
         var email = req.body.email

         const smtpTransport = nodemailer.createTransport({
                service: "gmail",
                auth: {
                     type: "OAuth2",
                     user: "theolaakomolafe@gmail.com", 
                     clientId: "355490130720-q9f2krivetnprnl59p10uu100578cffs.apps.googleusercontent.com",
                     clientSecret: "s3HyZjhGv8ZojjMapouHGgH1",
                     refreshToken: "1//04op4GMHXQPVRCgYIARAAGAQSNwF-L9Irmq_36btkeFfuRVSYPqQz6c3TWbl5JGHy1uAN39eSEMGzUnp79t8Q46ZMlB0uO1vwzks",
                     accessToken: accessToken
                }
           });
        const mailOptions = {
            from: "Ola from Shukran <theolaakomolafe@gmail.com>",
            to: email,
            subject: "You just got tipped " + req.body.username.capitalize(),
            generateTextFromHTML: true,
            html: "<h2>Hi <b>"+ req.body.username.capitalize() + ",</b></h2>"
            + req.body.supporter_nickname + " just tipped you!" + "<br>"
            + "<a href='https://useshukran.com/accounts'>Login to find out how much.</a>"
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