const boom = require('boom')
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
    "555666574645-fljat93at4kcf6fampm8in4tufrimkng.apps.googleusercontent.com", // ClientID
    "RS3EYIwzMnW5vzmOmiKA4yNk", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: "1//04fDoK5BWRldYCgYIARAAGAQSNwF-L9IrT8IJtGYY2NV-nAshhtqaSCsz66m8C5zG3nY6_3S6JPhB8HF40CuDSWlolOOe96ciulA"
});
const accessToken = oauth2Client.getAccessToken()

const User = require('../models/User')

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
                     user: "olamideakomolafe1234@gmail.com", 
                     clientId: "555666574645-fljat93at4kcf6fampm8in4tufrimkng.apps.googleusercontent.com",
                     clientSecret: "RS3EYIwzMnW5vzmOmiKA4yNk",
                     refreshToken: "1//04fDoK5BWRldYCgYIARAAGAQSNwF-L9IrT8IJtGYY2NV-nAshhtqaSCsz66m8C5zG3nY6_3S6JPhB8HF40CuDSWlolOOe96ciulA",
                     accessToken: accessToken
                }
           });
           const mailOptions = {
            from: "olamideakomolafe1234@gmail.com",
            to: req.body.email,
            subject: "Welcome to Shukran " + req.body.username,
            generateTextFromHTML: true,
            html: "<h2>Shukran for being a part of our journey <b>"+ req.body.username + "</b></h2> <br>"
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