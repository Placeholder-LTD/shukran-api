const boom = require('boom')
const nodemailer = require("nodemailer");

const User = require('../models/User')

const ggle = require('../helpers/uploadgdrive');
const { update } = require('../models/User');

// Capitalize function
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function handleErrors(err) {
    console.error('handleErrors output', err.message, err.code);

    let error = {} // error feedback object
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            // console.log(properties);
            error[properties.path] = properties
        })
    }

    // if a duplicate tried to be inserted
    if (err.code === 11000) { // needs work! what if it's the username that was a duplicate
        error.email = 'That email already exists'
    }

    return error
}

// Add a new user
// add shukran spot light link
exports.signup = async (req, reply) => {
    try {
        let check = User.find({
            $or: [{ 'email': req.body.email, 'username': req.body.username }]
        })
        if ((await check).length === 0) {
            // set up email
            const smtpTransport = nodemailer.createTransport({
                host: 'smtp.zoho.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'contact@useshukran.com',
                    pass: 'Password2020'
                }
            });
            // email content
            const mailOptions = {
                from: "Ola from Shukran <contact@useshukran.com>",
                to: req.body.email,
                subject: "Welcome to Shukran " + req.body.username.capitalize(),
                generateTextFromHTML: true,
                html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

                <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
                <head>
                <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
                <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
                <meta content="width=device-width" name="viewport"/>
                <!--[if !mso]><!-->
                <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
                <!--<![endif]-->
                <title></title>
                <!--[if !mso]><!-->
                <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet" type="text/css"/>
                <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css"/>
                <!--<![endif]-->
                <style type="text/css">
                        body {
                            margin: 0;
                            padding: 0;
                        }
                
                        table,
                        td,
                        tr {
                            vertical-align: top;
                            border-collapse: collapse;
                        }
                
                        * {
                            line-height: inherit;
                        }
                
                        a[x-apple-data-detectors=true] {
                            color: inherit !important;
                            text-decoration: none !important;
                        }
                    </style>
                <style id="media-query" type="text/css">
                        @media (max-width: 920px) {
                
                            .block-grid,
                            .col {
                                min-width: 320px !important;
                                max-width: 100% !important;
                                display: block !important;
                            }
                
                            .block-grid {
                                width: 100% !important;
                            }
                
                            .col {
                                width: 100% !important;
                            }
                
                            .col>div {
                                margin: 0 auto;
                            }
                
                            img.fullwidth,
                            img.fullwidthOnMobile {
                                max-width: 100% !important;
                            }
                
                            .no-stack .col {
                                min-width: 0 !important;
                                display: table-cell !important;
                            }
                
                            .no-stack.two-up .col {
                                width: 50% !important;
                            }
                
                            .no-stack .col.num4 {
                                width: 33% !important;
                            }
                
                            .no-stack .col.num8 {
                                width: 66% !important;
                            }
                
                            .no-stack .col.num4 {
                                width: 33% !important;
                            }
                
                            .no-stack .col.num3 {
                                width: 25% !important;
                            }
                
                            .no-stack .col.num6 {
                                width: 50% !important;
                            }
                
                            .no-stack .col.num9 {
                                width: 75% !important;
                            }
                
                            .video-block {
                                max-width: none !important;
                            }
                
                            .mobile_hide {
                                min-height: 0px;
                                max-height: 0px;
                                max-width: 0px;
                                display: none;
                                overflow: hidden;
                                font-size: 0px;
                            }
                
                            .desktop_hide {
                                display: block !important;
                                max-height: none !important;
                            }
                        }
                    </style>
                </head>
                <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FCFCFC;">
                <!--[if IE]><div class="ie-browser"><![endif]-->
                <table bgcolor="#FCFCFC" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FCFCFC; width: 100%;" valign="top" width="100%">
                <tbody>
                <tr style="vertical-align: top;" valign="top">
                <td style="word-break: break-word; vertical-align: top;" valign="top">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#FCFCFC"><![endif]-->
                <div style="background-color:transparent;">
                <div class="block-grid two-up no-stack" style="Margin: 0 auto; min-width: 320px; max-width: 900px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:900px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                <!--[if (mso)|(IE)]><td align="center" width="450" style="background-color:#ffffff;;width:450px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;background-color:#ffffff;"><![endif]-->
                <div class="col num6" style="min-width: 320px; max-width: 450px; display: table-cell; vertical-align: top; background-color: #ffffff; width: 450px;">
                <div style="width:100% !important;">
                <!--[if (!mso)&(!IE)]><!-->
                <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                <!--<![endif]-->
                <div align="left" class="img-container left fixedwidth" style="padding-right: 0px;padding-left: 0px;">
                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="left"><![endif]-->
                <div style="font-size:1px;line-height:5px"> </div><img alt="Shukran Logo" border="0" class="left fixedwidth" src="https://drive.google.com/uc?export=view&amp;id=1GfeklRxs6fyzI7Kz1qYGKaskU_oHfrLq" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 90px; display: block;" title="Shukran Logo" width="90"/>
                <!--[if mso]></td></tr></table><![endif]-->
                </div>
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td><td align="center" width="450" style=";width:450px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                <div class="col num6" style="min-width: 320px; max-width: 450px; display: table-cell; vertical-align: top; width: 450px;">
                <div style="width:100% !important;">
                <!--[if (!mso)&(!IE)]><!-->
                <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                <!--<![endif]-->
                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 10px; padding-top: 20px; padding-bottom: 15px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                <div style="color:#AEAEAE;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:20px;padding-right:5px;padding-bottom:15px;padding-left:10px;">
                <div style="font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 12px; line-height: 1.2; color: #AEAEAE; mso-line-height-alt: 14px;">
                <p style="font-size: 18px; line-height: 1.2; text-align: right; word-break: break-word; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 22px; margin: 0;"><span style="font-size: 18px; color: #000000;"><strong>#UseShukran</strong></span></p>
                <p style="font-size: 15px; line-height: 1.2; text-align: right; word-break: break-word; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 18px; margin: 0;"><span style="font-size: 15px;"><strong>#AfricanCreator</strong></span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style="background-color:transparent;">
                <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 900px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #f66452;">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color:#f66452;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:900px"><tr class="layout-full-width" style="background-color:#f66452"><![endif]-->
                <!--[if (mso)|(IE)]><td align="center" width="900" style=";width:900px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:15px; padding-bottom:10px;"><![endif]-->
                <div class="col num12" style="min-width: 320px; max-width: 900px; display: table-cell; vertical-align: top; width: 900px;">
                <div style="width:100% !important;">
                <!--[if (!mso)&(!IE)]><!-->
                <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:15px; padding-bottom:10px; padding-right: 0px; padding-left: 0px;">
                <!--<![endif]-->
                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 0px; padding-top: 10px; padding-bottom: 10px; font-family: 'Trebuchet MS', sans-serif"><![endif]-->
                <div style="color:#FFFFFF;font-family:'Varela Round', 'Trebuchet MS', Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:0px;">
                <div style="font-family: 'Varela Round', 'Trebuchet MS', Helvetica, sans-serif; font-size: 12px; line-height: 1.2; color: #FFFFFF; mso-line-height-alt: 14px;">
                <p style="font-size: 38px; line-height: 1.2; text-align: center; word-break: break-word; font-family: Varela Round, Trebuchet MS, Helvetica, sans-serif; mso-line-height-alt: 46px; margin: 0;"><span style="font-size: 38px;">Hello ${req.body.username.capitalize()}</span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style="background-color:transparent;">
                <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 900px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #FFFFFF;">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:900px"><tr class="layout-full-width" style="background-color:#FFFFFF"><![endif]-->
                <!--[if (mso)|(IE)]><td align="center" width="900" style=";width:900px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:10px; padding-bottom:10px;"><![endif]-->
                <div class="col num12" style="min-width: 320px; max-width: 900px; display: table-cell; vertical-align: top; width: 900px;">
                <div style="width:100% !important;">
                <!--[if (!mso)&(!IE)]><!-->
                <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 0px; padding-left: 0px;">
                <!--<![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
                <tbody>
                <tr style="vertical-align: top;" valign="top">
                <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
                <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid transparent; height: 0px; width: 100%;" valign="top" width="100%">
                <tbody>
                <tr style="vertical-align: top;" valign="top">
                <td height="0" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 25px; padding-left: 25px; padding-top: 0px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;line-height:1.5;padding-top:0px;padding-right:25px;padding-bottom:10px;padding-left:25px;">
                <div style="font-size: 12px; line-height: 1.5; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 18px;">
                <p style="font-size: 24px; line-height: 1.5; word-break: break-word; text-align: left; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 36px; margin: 0;"><span style="font-size: 24px;">It’s great to have you onboard Shukran and for being a part of our journey.</span></p>
                <p style="font-size: 14px; line-height: 1.5; text-align: center; word-break: break-word; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 21px; margin: 0;"> </p>
                <p style="font-size: 24px; line-height: 1.5; word-break: break-word; text-align: left; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 36px; margin: 0;"><span style="font-size: 24px;">Shukran {Shoe-k’ran} meaning: Thank you!</span></p>
                <p style="font-size: 14px; line-height: 1.5; text-align: center; word-break: break-word; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 21px; margin: 0;"> </p>
                
                <p style="font-size: 24px; line-height: 1.5; word-break: break-word; text-align: left; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 36px; margin: 0;">
                <span style="font-size: 24px;">
                Shukran is a platform that gets you earnings from people who enjoy your creative work regardless of your audience size or algorithm.
                </span>
                </p>
                
                <p style="font-size: 14px; line-height: 1.5; text-align: center; word-break: break-word; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 21px; margin: 0;"> </p>
                
                <p style="font-size: 24px; line-height: 1.5; word-break: break-word; text-align: left; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 36px; margin: 0;">
                <span style="font-size: 24px;">
                Getting started on Shukran would take you less than 5 minutes. It’s as simple as <b>CUSE</b>  i.e. <b>C</b>reate an account, <b>U</b>pdate your information, <b>S</b>hare your tipping link, <u><b>E</b>arn</u> your money!
                </span>
                </p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style="background-color:transparent;">
                <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 900px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #fcfcfc;">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color:#fcfcfc;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:900px"><tr class="layout-full-width" style="background-color:#fcfcfc"><![endif]-->
                <!--[if (mso)|(IE)]><td align="center" width="900" style=";width:900px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
                <div class="col num12" style="min-width: 320px; max-width: 900px; display: table-cell; vertical-align: top; width: 900px;">
                <div style="width:100% !important;">
                <!--[if (!mso)&(!IE)]><!-->
                <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                <!--<![endif]-->
                <div align="center" class="img-container center fixedwidth" style="padding-right: 0px;padding-left: 0px;">
                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img align="center" alt="Image" border="0" class="center fixedwidth" src="https://drive.google.com/uc?export=view&amp;id=1yeELqSjlGE2cX0BvIwQjGLJrRmOZA2se" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 360px; display: block;" title="Image" width="360"/>
                <!--[if mso]></td></tr></table><![endif]-->
                </div>
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style="background-color:transparent;">
                <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 900px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #FFFFFF;">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:900px"><tr class="layout-full-width" style="background-color:#FFFFFF"><![endif]-->
                <!--[if (mso)|(IE)]><td align="center" width="900" style=";width:900px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
                <div class="col num12" style="min-width: 320px; max-width: 900px; display: table-cell; vertical-align: top; width: 900px;">
                <div style="width:100% !important;">
                <!--[if (!mso)&(!IE)]><!-->
                <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                <!--<![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
                <tbody>
                <tr style="vertical-align: top;" valign="top">
                <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
                <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid transparent; height: 0px; width: 100%;" valign="top" width="100%">
                <tbody>
                <tr style="vertical-align: top;" valign="top">
                <td height="0" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 25px; padding-left: 25px; padding-top: 0px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                <div style="color:#555555;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;line-height:1.5;padding-top:0px;padding-right:25px;padding-bottom:10px;padding-left:25px;">
                <div style="font-size: 12px; line-height: 1.5; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 18px;">
                <p style="font-size: 24px; line-height: 1.5; word-break: break-word; text-align: left; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 36px; margin: 0;">
                <span style="font-size: 24px;">
                Check out these pages for inspiration:
                </span>
                <span >
                <ol style="font-size: 24px;">
                <li>
                <a href="https://useshukran.com/cr/bola%20john">Bola John</a>, NG
                </li>
                <li>
                <a href="https://useshukran.com/cr/wangarimuchui">Wangarimuchui</a>, KE
                </li>
                </ol>
                </span>
                </p>
                <p style="font-size: 14px; line-height: 1.5; word-break: break-word; text-align: left; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 21px; margin: 0;"> </p>
                <p style="font-size: 14px; line-height: 1.5; word-break: break-word; text-align: left; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 21px; margin: 0;"><strong><span style="font-size: 24px;">
                Once your page is completed, you get a unique tipping link. How then do you go about it?
                </span></strong></p>
                <p style="font-size: 14px; line-height: 1.5; word-break: break-word; text-align: left; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 21px; margin: 0;"> </p>
                <p style="font-size: 24px; line-height: 1.5; word-break: break-word; text-align: left; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 36px; margin: 0;"><span style="font-size: 24px;">
                The steps below would be of great help;
                </span>
                <span >
                <ul style="font-size: 24px;">
                <li>
                <b>Call on your audience or people who enjoy your content to support it as soon as it is live.</b> When you get your first supporter, don't forget to thank them with a reply. Look out for their email addresses when they tip you.
                </li>
                <li>
                <b>Create exclusive content for your supporters.</b> Mention to your audience that they would get access to exclusive content when they tip you. This will definitely get you more tips when potential supporters know that they will have access to exclusive content you have created for them when they tip you.
                </li>
                <li>
                <b>Lastly, put your link where your audience can find it.</b>  This could be a link in your bio, your Twitter bio & pinned post, podcast and YouTube description, footer of your newsletter, widget/button on your website etc. Give your audience a chance to say SHUKRAN!
                </li>
                </ul>
                </span>
                </p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style="background-color:transparent;">
                <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 900px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #FFFFFF;">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:900px"><tr class="layout-full-width" style="background-color:#FFFFFF"><![endif]-->
                <!--[if (mso)|(IE)]><td align="center" width="900" style=";width:900px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:15px; padding-bottom:0px;"><![endif]-->
                <div class="col num12" style="min-width: 320px; max-width: 900px; display: table-cell; vertical-align: top; width: 900px;">
                <div style="width:100% !important;">
                <!--[if (!mso)&(!IE)]><!-->
                <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:15px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                <!--<![endif]-->
                <div align="center" class="img-container center fixedwidth" style="padding-right: 0px;padding-left: 0px;">
                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img align="center" alt="Shukran now supports international tips. USD, NGN, KES." border="0" class="center fixedwidth" src="https://drive.google.com/uc?export=view&amp;id=1V2VvHVUwhwRRhsoKPoTPE8FgdkWU6MCu" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 405px; display: block;" title="Shukran now supports international tips. USD, NGN, KES." width="405"/>
                <!--[if mso]></td></tr></table><![endif]-->
                </div>
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style="background-color:transparent;">
                <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 900px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:900px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                <!--[if (mso)|(IE)]><td align="center" width="900" style=";width:900px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
                <div class="col num12" style="min-width: 320px; max-width: 900px; display: table-cell; vertical-align: top; width: 900px;">
                <div style="width:100% !important;">
                <!--[if (!mso)&(!IE)]><!-->
                <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                <!--<![endif]-->
                <div align="center" class="button-container" style="padding-top:10px;padding-right:10px;padding-bottom:30px;padding-left:10px;">
                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 10px; padding-right: 10px; padding-bottom: 30px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://useshukran.com/#creators" style="height:31.5pt; width:272.25pt; v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#f66452"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Tahoma, Verdana, sans-serif; font-size:16px"><![endif]--><a href="https://twitter.com/intent/tweet?url=http%3A%2F%2Fuseshukran.com%2F&text=I+just+signed+up+to+@useshukran.+It's+amazingly+simple+to+use.+Find+creators+to+tip+here:&hashtags=saythanks,shukran" style="-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ffffff; background-color: #f66452; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; width: auto; border-top: 1px solid #f66452; border-right: 1px solid #f66452; border-bottom: 1px solid #f66452; border-left: 1px solid #f66452; padding-top: 5px; padding-bottom: 5px; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;" target="_blank"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;"><span style="font-size: 16px; line-height: 2; word-break: break-word; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 32px;">
                Tweet about joining Shukran <strong><u>!</u></strong>.
                </span></span></a>
                <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                </div>
                <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
                <tbody>
                <tr style="vertical-align: top;" valign="top">
                <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" valign="top">
                <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="15" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 15px; width: 100%;" valign="top" width="100%">
                <tbody>
                <tr style="vertical-align: top;" valign="top">
                <td height="15" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style="background-color:transparent;">
                <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 900px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #f66452;">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color:#f66452;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:900px"><tr class="layout-full-width" style="background-color:#f66452"><![endif]-->
                <!--[if (mso)|(IE)]><td align="center" width="900" style=";width:900px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:10px; padding-bottom:25px;"><![endif]-->
                <div class="col num12" style="min-width: 320px; max-width: 900px; display: table-cell; vertical-align: top; width: 900px;">
                <div style="width:100% !important;">
                <!--[if (!mso)&(!IE)]><!-->
                <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:25px; padding-right: 0px; padding-left: 0px;">
                <!--<![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
                <tbody>
                <tr style="vertical-align: top;" valign="top">
                <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
                <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid transparent; height: 0px; width: 100%;" valign="top" width="100%">
                <tbody>
                <tr style="vertical-align: top;" valign="top">
                <td height="0" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                </tr>
                </tbody>
                </table>
                </td>
                </tr>
                </tbody>
                </table>
                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 25px; padding-left: 25px; padding-top: 0px; padding-bottom: 15px; font-family: 'Trebuchet MS', sans-serif"><![endif]-->
                <div style="color:#FFFFFF;font-family:'Varela Round', 'Trebuchet MS', Helvetica, sans-serif;line-height:1.2;padding-top:0px;padding-right:25px;padding-bottom:15px;padding-left:25px;">
                <div style="line-height: 1.2; font-family: 'Varela Round', 'Trebuchet MS', Helvetica, sans-serif; font-size: 12px; color: #FFFFFF; mso-line-height-alt: 14px;">
                <p style="line-height: 1.2; font-size: 18px; text-align: center; word-break: break-word; font-family: Varela Round, Trebuchet MS, Helvetica, sans-serif; mso-line-height-alt: 22px; margin: 0;"><span style="font-size: 18px;">If you have any questions or feedback. We love to hear from you too.</span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 0px; padding-top: 0px; padding-bottom: 15px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                <div style="color:#FFFFFF;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:0px;padding-right:10px;padding-bottom:15px;padding-left:0px;">
                <div style="font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 12px; line-height: 1.2; color: #FFFFFF; mso-line-height-alt: 14px;">
                <p style="font-size: 28px; line-height: 1.2; text-align: center; word-break: break-word; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 34px; margin: 0;"><span style="font-size: 28px;">Please contact us.</span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <div align="center" class="button-container" style="padding-top:10px;padding-right:10px;padding-bottom:25px;padding-left:10px;">
                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 10px; padding-right: 10px; padding-bottom: 25px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="mailto:support@useshukran.com?subject=Hello Shukran&body=Hi, I ..." style="height:34.5pt; width:213pt; v-text-anchor:middle;" arcsize="9%" stroke="false" fillcolor="#000000"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Tahoma, Verdana, sans-serif; font-size:18px"><![endif]--><a href="mailto:support@useshukran.com?subject=Hello Shukran&amp;body=Hi, I ..." style="-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ffffff; background-color: #000000; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; width: auto; border-top: 1px solid #000000; border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; padding-top: 5px; padding-bottom: 5px; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;" target="_blank"><span style="padding-left:20px;padding-right:20px;font-size:18px;display:inline-block;"><span style="font-size: 16px; line-height: 2; word-break: break-word; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 32px;"><span data-mce-style="font-size: 18px; line-height: 36px;" style="font-size: 18px; line-height: 36px;">support@useshukran.com</span></span></span></a>
                <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                </div>
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <div style="background-color:#ffffff;">
                <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 900px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:900px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                <!--[if (mso)|(IE)]><td align="center" width="900" style=";width:900px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:30px; padding-bottom:30px;"><![endif]-->
                <div class="col num12" style="min-width: 320px; max-width: 900px; display: table-cell; vertical-align: top; width: 900px;">
                <div style="width:100% !important;">
                <!--[if (!mso)&(!IE)]><!-->
                <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:30px; padding-bottom:30px; padding-right: 0px; padding-left: 0px;">
                <!--<![endif]-->
                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                <div style="color:#000000;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;line-height:1.5;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                <div style="font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 12px; line-height: 1.5; color: #000000; mso-line-height-alt: 18px;">
                <p style="font-size: 14px; line-height: 1.5; text-align: center; word-break: break-word; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 21px; margin: 0;"><span style="font-size: 14px;"><strong>Shukran</strong> is a product of Placeholder LTD</span></p>
                <p style="font-size: 12px; line-height: 1.5; text-align: center; word-break: break-word; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 18px; margin: 0;"><span style="font-size: 12px;"> © ${new Date().getFullYear()} Shukran. | Magodo, Phase 1, Lagos Nigeria</span></p>
                </div>
                </div>
                <!--[if mso]></td></tr></table><![endif]-->
                <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                </div>
                </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
                </tr>
                </tbody>
                </table>
                <!--[if (IE)]></div><![endif]-->
                </body>
                </html>`
            };
            // send email
            smtpTransport.sendMail(mailOptions, (error, response) => {
                error ? console.log(error) : console.log(response);
                smtpTransport.close();
            });
            // create a folder for them in ..."our space"
            let g = await ggle.drive.files.create({
                resource: {
                    'name': req.body.username,
                    'mimeType': 'application/vnd.google-apps.folder',
                    parents: ['1J6ALbTDRqytQKRE7G1MD0JgS9MW3ib31'] // create in folder shukran-contents
                },
                fields: 'id, parents'
            });
            // un-neccessary todo... confirm that we have the right parent folders
            req.body.folder_id = g.data.id
            // then...
            const user = new User(req.body)
            return user.save()
        } else {
            return { "message": "User's email exist" }
        }
    } catch (err) {
        handleErrors(err)
        throw boom.boomify(err)
    }
}

exports.getAll = async (req, reply) => {
    try {
        let users = User.find()
        return users
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.login = async (req, reply) => {
    try {
        let username = req.body.username
        let password = req.body.password
        const user = User.find({
            $and: [
                { 'username': username, 'password': password }
            ]
        })
        let a = await user.exec();
        console.log('what is a', a);
        // check if they have a folder_id
        // if not, create for them
        if (a[0] && !a[0].folder_id) {
            console.log('\ncreating folder\n');
            // create a folder for them in ..."our space"
            let file = await ggle.drive.files.create({
                resource: {
                    'name': a[0].username, // folder_is field always comes last, so username would have been set
                    'mimeType': 'application/vnd.google-apps.folder',
                    parents: ['1J6ALbTDRqytQKRE7G1MD0JgS9MW3ib31'] // create in folder shukran-contents
                },
                fields: 'id, parents'
            });

            if (file.data.id) {
                console.log('\ncreated Folder Id: ', file.data.id, file.data.parents);
                // un-neccessary todo... confirm that we have the right parent folders
                // updateData.folder_id = file.data.id

                // we also need to update the User object in the DB
                let updateUser = await User.findByIdAndUpdate(a[0]._id, { folder_id: file.data.id }, { new: true })
                console.log('user update', updateUser) // is single obj
                a = [updateUser] // replace a, updated version
            }
        }
        // sort content from backend because we don't have energy in frontend
        if (a[0].content.length > 1) {
            a[0].content.sort(function compareDates(d1, d2) {
                return d2.created_at < d1.created_at ? -1 : 1
            })
        }
        reply.send(a) // return a
        
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.resetPassword = async (req, reply) => {
    try {
        let username = req.body.username
        let email = req.body.email
        const users = User.find({
            $and: [
                { 'username': username, 'email': email }
            ]
        })
        return users
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.findMyProfile = async (req, reply) => {
    try {
        let username = req.body.username
        let user = User.find({ 'username': username })
        return user
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.deleteUser = async (req, reply) => {
    try {
        let id = req.body.id
        let user = User.findByIdAndDelete(id)
        return user
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.createContent = async (req, reply) => {
    try {
        if (req.isMultipart()) {
            const mp = req.multipart(handler, onEnd) // mp = multipart
            let updateData = {};

            mp.on('field', async function (key, value) {
                console.log('form-data', key, value)
                updateData[key] = value;
            })

            async function onEnd(err, o, what) { // comes here after filestream.on('end', ...) synchoronously
                // should we update the shukclans of new content??
                console.log(o, what);
            }

            async function handler(fieldname, filestream, filename, transferEncoding, mimetype) {

                filestream.on('data', function (data) {
                    console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
                });

                filestream.on('limit', () => console.log('File size limit reached'));

                filestream.on('end', function () {
                    console.log('File [' + fieldname + '] Finished. Got ' + 'bytes');
                });
                
                try {
                    // const acceptedfiles = ['image/gif', 'image/jpeg', 'image/png', 'image/tiff', 'image/vnd.wap.wbmp', 'image/x-icon', 'image/x-jng', 'image/x-ms-bmp', 'image/svg+xml', 'image/webp'];

                    // if we listend for 'file', even if there's no file, we still come here
                    // so we're checking if it's empty before doing anything.

                    // this is not a good method
                    /**One thing you might be able to try is to read 0 bytes from the stream first and see if you get the appropriate 'end' event or not (perhaps on the next tick) */
                    if (filename != '' /* && acceptedfiles.includes(mimetype) */) { // filename: 1848-1844-1-PB.pdf, encoding: 7bit, mimetype: application/pdf
                        
                        let fileMetadata = {
                            'name': filename, // Date.now() + '.jpg',
                            parents: [updateData.folder_id] // upload to creator's folder
                        };
                        console.log(fileMetadata.parents)
                        let media = {
                            mimeType: mimetype,
                            body: filestream
                        };

                        let g = await ggle.drive.files.create({
                            resource: fileMetadata,
                            media: media,
                            fields: 'id, webViewLink, thumbnailLink, webContentLink', // https://stackoverflow.com/q/37860901
                        });

                        if (g.data.id) {
                            // the saved content
                            let up = {
                                filename: filename,
                                file_type: mimetype,
                                file_id: g.data.id,
                                web_view_link: g.data.webViewLink,
                                web_content_link: g.data.webContentLink
                            }
                            let update = await User.findByIdAndUpdate(updateData['creator_id'], { $push: { content: up } }, { new: true })
                            console.info('g.data.webViewLink', g.data.webViewLink)
                            console.info('update is:', update)
                            console.info('g.data.thumbnailLink', g.data.thumbnailLink)

                            if (update.content.length > 1) {
                                update.content.sort(function compareDates(d1, d2) {
                                    return d2.created_at < d1.created_at ? -1 : 1
                                })
                            }
                            reply.code(200).send(update) // TODO: we should generate a shukran link for them to share
                        }
                    }

                } catch (error) {
                    console.error('upload error !!', error);
                    reply.code(500).send(error)
                }

            }
        }
    } catch (error) {
        throw boom.boomify(error)
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} reply 
 * 
 * TODO: Creators can update file content
 */
exports.updateContentDescription = async (req, reply) => {
    try {
        const id = req.body.id
        const users = req.body
        const { updateData } = users
        console.log('\n\n\n', updateData);

        const update = await User.updateOne(
            {_id: id, "content._id": users.content_id}, 
            {
                $set: {
                    "content.$.description": updateData.description
                }
            },
            { new: true }
        )
        return update
    } catch (err) {
        throw boom.boomify(err) // should we be throwing errors?
    }
}

exports.deleteContent = async (req, reply) => {
    try {
        console.log('\n\n\n', req.body);

        const update = await User.updateOne(
            {_id: req.body.id},
            {
                $pull: {
                    "content": {"_id": req.body.content_id}
                }
            },
            { new: true }
        )
        return update
        // delete from Google Drive too?
    } catch (err) {
        throw boom.boomify(err) // should we be throwing errors?
    }
}

exports.updateUser = async (req, reply) => {
    try {

        if (req.isMultipart()) {
            const mp = req.multipart(handler, onEnd) // mp = multipart
            let updateData = {};

            mp.on('field', function (key, value) {
                console.log('form-data', key, value)
                updateData[key] = value;
            })

            async function onEnd(err, what) { // comes here after filestream.on('end', ...) synchoronously
            }

            async function handler(fieldname, filestream, filename, transferEncoding, mimetype) {

                filestream.on('data', function (data) {
                    console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
                });

                filestream.on('end', function () {
                    console.log('File [' + fieldname + '] Finished. Got ' + 'bytes');
                });
                try {
                    const acceptedfiles = ['image/gif', 'image/jpeg', 'image/png', 'image/tiff', 'image/vnd.wap.wbmp', 'image/x-icon', 'image/x-jng', 'image/x-ms-bmp', 'image/svg+xml', 'image/webp'];

                    // if we listend for 'file', even if there's no file, we still come here
                    // so we're checking if it's empty before doing anything.

                    // this is not a good method

                    /**One thing you might be able to try is to read 0 bytes from the stream first and see if you get the appropriate 'end' event or not (perhaps on the next tick) */
                    if (filename != '' && acceptedfiles.includes(mimetype)) { // filename: 1848-1844-1-PB.pdf, encoding: 7bit, mimetype: application/pdf

                        let fileMetadata = {
                            'name': filename, // Date.now() + '.jpg',
                            parents: ['1VuuAuYvstl3hQCBl0mZcj0RROm1S863t'] // upload to folder shukran-creators
                        };
                        let media = {
                            mimeType: mimetype,
                            body: filestream
                        };

                        let g = await ggle.drive.files.create({
                            resource: fileMetadata,
                            media: media,
                            fields: 'id, thumbnailLink',
                        });
                        if (g.data.id) {
                            updateData['picture_id'] = g.data.id
                            update = await User.findByIdAndUpdate(updateData['id'], updateData, { new: true })
                            console.info('political g.data.webViewLink', g.data.webViewLink)
                            reply.code(200).send(g.data.id)
                        } else {
                            throw new Error(`upload error! status: ${g.status}`);
                        }
                    }
                } catch (error) {
                    console.error('upload error !!', error);
                    reply.code(500).send(error)
                }

            }
        } else {
            const id = req.body.id
            const users = req.body
            const { ...updateData } = users

            const update = await User.findByIdAndUpdate(id, updateData, { new: true })
            return update
        }
    } catch (err) {
        throw boom.boomify(err)
    }
}