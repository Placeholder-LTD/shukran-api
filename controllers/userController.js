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
    refresh_token: "1//04op4GMHXQPVRCgYIARAAGAQSNwF-L9Irmq_36btkeFfuRVSYPqQz6c3TWbl5JGHy1uAN39eSEMGzUnp79t8Q46ZMlB0uO1vwzks"
});
const accessToken = oauth2Client.getAccessToken()

const User = require('../models/User')

// Capitalize function
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

// Add a new user
exports.signup = async (req, reply) => {
    try {
        var check = User.find({'email': req.body.email})
        if ((await check).length === 0) {
            const user = new User(req.body)
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
            to: req.body.email,
            subject: "Welcome to Shukran " + req.body.username.capitalize(),
            generateTextFromHTML: true,
            html: "<h2>Shukran for being a part of our journey <b>"+ req.body.username.capitalize() + "</b></h2>"
            + "<p>We are working on helping you earn regardless of your audience size.</p>"
            + "We'll keep you updated as updates are being added.</p><br> <p> Feel free to use the 'Give feedback' button anytime.</p> <br>"
            + "<a href='useshukran.com/accounts'>Go back to Login</a>"
            };
            smtpTransport.sendMail(mailOptions, (error, response) => {
                error ? console.log(error) : console.log(response);
                smtpTransport.close();
           });
            return user.save()
        } else {
            return {"message": "User's email exist"}
        }
    } catch (err) {
      throw boom.boomify(err)
    }
}

exports.getAll = async(req, reply) => {
    try {
        var users = User.find()
        return users
    } catch (error) {
        throw boom.boomify(error)
    }
}
exports.login = async (req, reply) => {
    try {
        var username = req.body.username
        var password = req.body.password
        const users = User.find({
            $and: [
                {'username': username, 'password': password}
            ]
        })
        return users
    } catch(err) {
        throw boom.boomify(err)
    }
}

exports.resetPassword = async (req, reply) => {
    try {
        var username = req.body.username
        var email = req.body.email
        const users = User.find({
            $and: [
                {'username': username, 'email': email}
            ]
        })
       return users
    } catch(err) {
        throw boom.boomify(err)
    }
}

exports.findMyProfile = async (req, reply) => {
    try {
        var username = req.body.username
        var user = User.find({'username': username})
        return user
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.deleteUser = async (req, reply) => {
    try {
        var id = req.body.id
        var user = User.findByIdAndDelete(id)
        return user
    } catch (error) {
        throw boom.boomify(error)
    }
}
exports.updateUser = async (req, reply) => {
    try {
      const id = req.body.id
      const users = req.body
      const { ...updateData } = users
      const update = await User.findByIdAndUpdate(id, updateData, { new: true })
      return update
    } catch (err) {
      throw boom.boomify(err)
    }
}