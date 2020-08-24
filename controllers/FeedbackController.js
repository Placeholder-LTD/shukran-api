const boom = require('boom')
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
    "355490130720-q9f2krivetnprnl59p10uu100578cffs.apps.googleusercontent.com", // ClientID
    "s3HyZjhGv8ZojjMapouHGgH1", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: "1//041_Cx4ABTQcICgYIARAAGAQSNwF-L9IroHOhG5cFC2KIY773amqov-r20e8dYXApDHDjsI9hbyLGH3iOODnAayXR2ckerBekQlo"
});
const accessToken = oauth2Client.getAccessToken()
const Feedback = require('../models/Feedback')

exports.newFeedback = async(req, reply) => {
    try {
        const feed = new Feedback(req.body)
        return feed.save()
    } catch (error) {
        throw boom.boomify(error)
    }
}
exports.getAll = async(req, reply) => {
    try {
        var feed = Feedback.find()
        return feed
    } catch (error) {
        throw boom.boomify(error)
    }
}
exports.sendMessage = async(req, reply) => {
try {
    let email = req.body.email
                    const smtpTransport = nodemailer.createTransport({
                           service: "gmail",
                           auth: {
                                type: "OAuth2",
                                user: "theolaakomolafe@gmail.com", 
                                clientId: "355490130720-q9f2krivetnprnl59p10uu100578cffs.apps.googleusercontent.com",
                                clientSecret: "s3HyZjhGv8ZojjMapouHGgH1",
                                refreshToken: "1//041_Cx4ABTQcICgYIARAAGAQSNwF-L9IroHOhG5cFC2KIY773amqov-r20e8dYXApDHDjsI9hbyLGH3iOODnAayXR2ckerBekQlo",
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
} catch (err) {
    throw boom.boomify(err)
}
}