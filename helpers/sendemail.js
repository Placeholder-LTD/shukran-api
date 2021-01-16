const nodemailer = require("nodemailer");
const fs = require('fs');

// Capitalize function
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const contactMailOption = {
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
        user: 'contact@useshukran.com',
        pass: 'Password2020'
    }
  }

/**
 * 
 * @param {string} username - the creator's username
 * @param {string} email - the creator's email
 * @param {string} fullname - fullname of the creator
 * @param {string} currency - the currency symbol of transactions
 * @param {Number} totalTips - total tips they've made so far
 * @param {Number} totalSupporters - how many unique supporters they have
 * @param {Number} totalRecurringTips - how much all their shuclans are paying
 * @param {Number} totalWithdrawn - how much they've withdrawn so far (in year 2020)
 */
module.exports.send2020Highlights = async (username, email, fullname, currency, totalTips, totalSupporters, totalRecurringTips, totalWithdrawn) => {
    const smtpTransport = nodemailer.createTransport(contactMailOption);

    const mailOptions = {
        from: `Shukran Team <contact@useshukran.com>`,
        to: `${fullname.trim()} <${email.trim()}>`,
        subject: 'Your 2020 Highlight',
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
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/css?family=Droid+Serif" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/css?family=Merriweather" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/css?family=Oxygen" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/css?family=Abril+Fatface" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" type="text/css"/>
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
                @media (max-width: 700px) {
        
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
        
                    .col_cont {
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
        
                    .no-stack .col.num2 {
                        width: 16.6% !important;
                    }
        
                    .no-stack .col.num3 {
                        width: 25% !important;
                    }
        
                    .no-stack .col.num4 {
                        width: 33% !important;
                    }
        
                    .no-stack .col.num5 {
                        width: 41.6% !important;
                    }
        
                    .no-stack .col.num6 {
                        width: 50% !important;
                    }
        
                    .no-stack .col.num7 {
                        width: 58.3% !important;
                    }
        
                    .no-stack .col.num8 {
                        width: 66.6% !important;
                    }
        
                    .no-stack .col.num9 {
                        width: 75% !important;
                    }
        
                    .no-stack .col.num10 {
                        width: 83.3% !important;
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
        <style id="menu-media-query" type="text/css">
                @media (max-width: 700px) {
                    .menu-checkbox[type="checkbox"]~.menu-links {
                        display: none !important;
                        padding: 5px 0;
                    }
        
                    .menu-checkbox[type="checkbox"]~.menu-links span.sep {
                        display: none;
                    }
        
                    .menu-checkbox[type="checkbox"]:checked~.menu-links,
                    .menu-checkbox[type="checkbox"]~.menu-trigger {
                        display: block !important;
                        max-width: none !important;
                        max-height: none !important;
                        font-size: inherit !important;
                    }
        
                    .menu-checkbox[type="checkbox"]~.menu-links>a,
                    .menu-checkbox[type="checkbox"]~.menu-links>span.label {
                        display: block !important;
                        text-align: center;
                    }
        
                    .menu-checkbox[type="checkbox"]:checked~.menu-trigger .menu-close {
                        display: block !important;
                    }
        
                    .menu-checkbox[type="checkbox"]:checked~.menu-trigger .menu-open {
                        display: none !important;
                    }
        
                    #menu7keezb~div label {
                        border-radius: 0% !important;
                    }
        
                    #menu7keezb:checked~.menu-links {
                        background-color: #ffffff !important;
                    }
        
                    #menu7keezb:checked~.menu-links a {
                        color: #5c4c99 !important;
                    }
        
                    #menu7keezb:checked~.menu-links span {
                        color: #5c4c99 !important;
                    }
                }
            </style>
        </head>
        <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #5c4c99;">
        <!--[if IE]><div class="ie-browser"><![endif]-->
        <table bgcolor="#5c4c99" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #5c4c99; width: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; vertical-align: top;" valign="top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#5c4c99"><![endif]-->
        <div style="background-color:#5c4c99;">
        <div class="block-grid" style="min-width: 320px; max-width: 680px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#5c4c99;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="680" style="background-color:transparent;width:680px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:30px; padding-bottom:25px;"><![endif]-->
        <div class="col num12" style="min-width: 320px; max-width: 680px; display: table-cell; vertical-align: top; width: 680px;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:30px; padding-bottom:25px; padding-right: 0px; padding-left: 0px;">
        <!--<![endif]-->
        <div align="center" class="img-container center fixedwidth" style="padding-right: 0px;padding-left: 0px;">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img align="center" alt="Shukran" border="0" class="center fixedwidth" src="https://drive.google.com/uc?export=view&amp;id=1GfeklRxs6fyzI7Kz1qYGKaskU_oHfrLq" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 136px; display: block;" title="Your Logo" width="136"/>
        <!--[if mso]></td></tr></table><![endif]-->
        </div>
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="5" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 5px; width: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td height="5" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top" width="100%">
        <tr style="vertical-align: top;" valign="top">
        <td align="center" style="word-break: break-word; vertical-align: top; padding-top: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; text-align: center; font-size: 0px;" valign="top">
        <!--[if !mso><!--> <input class="menu-checkbox" id="menu7keezb" style="display:none !important;max-height:0;visibility:hidden;" type="checkbox"/>
        <!--<![endif]-->
        <div class="menu-trigger" style="display:none;max-height:0px;max-width:0px;font-size:0px;overflow:hidden;"> <label class="menu-label" for="menu7keezb" style="height:36px;width:36px;display:inline-block;cursor:pointer;mso-hide:all;user-select:none;align:center;text-align:center;color:#5c4c99;text-decoration:none;background-color:#ffffff;"><span class="menu-open" style="mso-hide:all;font-size:26px;line-height:36px;">☰</span><span class="menu-close" style="display:none;mso-hide:all;font-size:26px;line-height:36px;">✕</span></label></div>
        <div class="menu-links">
        <!--[if mso]>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
        <tr>
        <td style="padding-top:0px;padding-right:15px;padding-bottom:0px;padding-left:15px">
        <![endif]--><a href="https://useshukran.com" style="padding-top:0px;padding-bottom:0px;padding-left:15px;padding-right:15px;display:inline;color:#ffffff;font-family:Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;text-decoration:none;">HOME</a>
        <!--[if mso]></td><td><![endif]--><span class="sep" style="font-size:16px;font-family:Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;color:#ffffff;">|</span>
        <!--[if mso]></td><![endif]-->
        <!--[if mso]></td><td style="padding-top:0px;padding-right:15px;padding-bottom:0px;padding-left:15px"><![endif]--><a href="https://useshukran.com/accounts" style="padding-top:0px;padding-bottom:0px;padding-left:15px;padding-right:15px;display:inline;color:#ffffff;font-family:Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;text-decoration:none;">LOGIN</a>
        <!--[if mso]></td><td><![endif]--><span class="sep" style="font-size:16px;font-family:Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;color:#ffffff;">|</span>
        <!--[if mso]></td><![endif]-->
        <!--[if mso]></td><td style="padding-top:0px;padding-right:15px;padding-bottom:0px;padding-left:15px"><![endif]--><a href="https://useshukran.com/#creators" style="padding-top:0px;padding-bottom:0px;padding-left:15px;padding-right:15px;display:inline;color:#ffffff;font-family:Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;text-decoration:none;">OTHER CREATORS</a>
        <!--[if mso]></td></tr></table><![endif]-->
        </div>
        </td>
        </tr>
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
        <div style="background-color:#5c4c99;">
        <div class="block-grid" style="min-width: 320px; max-width: 680px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#5c4c99;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="680" style="background-color:transparent;width:680px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:30px; padding-bottom:50px;"><![endif]-->
        <div class="col num12" style="min-width: 320px; max-width: 680px; display: table-cell; vertical-align: top; width: 680px;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:30px; padding-bottom:50px; padding-right: 0px; padding-left: 0px;">
        <!--<![endif]-->
        <div align="center" class="img-container center autowidth" style="padding-right: 0px;padding-left: 0px;">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img align="center" alt="Abstract Shapes" border="0" class="center autowidth" src="https://drive.google.com/uc?export=view&amp;id=1GNKBga0eF5PZwPapjWrAIq149BDycb8g" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 680px; display: block;" title="Abstract Shapes" width="680"/>
        <!--[if mso]></td></tr></table><![endif]-->
        </div>
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="5" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 5px; width: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td height="5" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
        <div style="color:#f7ce3e;font-family:'Oswald', Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div style="line-height: 1.2; font-family: 'Oswald', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 12px; color: #f7ce3e; mso-line-height-alt: 14px;">
        <p style="font-size: 64px; line-height: 1.2; word-break: break-word; text-align: center; font-family: Oswald, Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 77px; margin: 0;"><span style="color: #ffffff; font-size: 40px;">2020 HIGHLIGHTS</span></p>
        </div>
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="5" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 5px; width: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td height="5" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
        <div style="color:#f7ce3e;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;line-height:1.5;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div style="line-height: 1.5; font-size: 12px; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #f7ce3e; mso-line-height-alt: 18px;">
        <p style="font-size: 16px; line-height: 1.5; word-break: break-word; text-align: center; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 20px; margin: 0;">
        Thank you so much ${username} for being a part of our 2020.
        We've really come to love the community that is you.
        We look forward to doing this again in 2021.
        
        We hope you have plans as much as we do.
        
        Let's create together, and better.
        </p>
        </div>
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
        <div align="center" class="button-container" style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://useshukran.com" style="height:39pt; width:166.5pt; v-text-anchor:middle;" arcsize="49%" strokeweight="2.25pt" strokecolor="#F7CE3E" fillcolor="#f73e3e"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#000000; font-family:Arial, sans-serif; font-size:18px"><![endif]--><a href="https://useshukran.com/2020" style="-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #000000; background-color: #f73e3e; border-radius: 25px; -webkit-border-radius: 25px; -moz-border-radius: 25px; width: auto; width: auto; border-top: 3px solid #F7CE3E; border-right: 3px solid #F7CE3E; border-bottom: 3px solid #F7CE3E; border-left: 3px solid #F7CE3E; padding-top: 5px; padding-bottom: 5px; font-family: Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;" target="_blank"><span style="padding-left:20px;padding-right:20px;font-size:18px;display:inline-block;"><span style="font-size: 16px; margin: 0; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"><span data-mce-style="font-size: 18px; line-height: 36px;" style="font-size: 18px; line-height: 36px;">READ THE BLOG</span></span></span></a>
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
        <div style="background-color:#72d2dc;">
        <div class="block-grid" style="min-width: 320px; max-width: 680px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#72d2dc;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="680" style="background-color:transparent;width:680px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;"><![endif]-->
        <div class="col num12" style="min-width: 320px; max-width: 680px; display: table-cell; vertical-align: top; width: 680px;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 10px; padding-left: 10px;">
        <!--<![endif]-->
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
        <div style="color:#f7ce3e;font-family:'Oswald', Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div style="line-height: 1.2; font-family: 'Oswald', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 12px; color: #f7ce3e; mso-line-height-alt: 14px;">
        <p style="font-size: 42px; line-height: 1.2; word-break: break-word; text-align: center; font-family: Oswald, Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 50px; margin: 0;"><span style="color: #5c4c99; font-size: 42px;">YOUR 2020 IN REVIEW</span></p>
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
        <div style="background-color:#5c4c99;">
        <div class="block-grid" style="min-width: 320px; max-width: 680px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;;direction:rtl">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#5c4c99;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="680" style="background-color:transparent;width:680px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;"><![endif]-->
        <div class="col num12" style="min-width: 320px; max-width: 680px; display: table-cell; vertical-align: top; width: 680px; direction: ltr;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 10px; padding-left: 10px;">
        <!--<![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 0px; width: 100%;" valign="top" width="100%">
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
        <div style="background-color:#5c4c99;">
        <div class="block-grid mixed-two-up" style="min-width: 320px; max-width: 680px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#5c4c99;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="226" style="background-color:transparent;width:226px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;background-color:#5c4c99;"><![endif]-->
        <div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 224px; background-color: #5c4c99; width: 226px;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 10px; padding-left: 10px;">
        <!--<![endif]-->
        <div align="left" class="img-container left autowidth" style="padding-right: 0px;padding-left: 0px;">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="left"><![endif]--><img alt="Tips Illustration" border="0" class="left autowidth" src="https://drive.google.com/uc?export=view&amp;id=1H5puAyjWeTYbYtSLw49TjMzTlY15Iqxs" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 206px; display: block;" title="Person Illustration" width="206"/>
        <!--[if mso]></td></tr></table><![endif]-->
        </div>
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        <!--[if (mso)|(IE)]></td><td align="center" width="453" style="background-color:transparent;width:453px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;"><![endif]-->
        <div class="col num8" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 448px; width: 453px;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 10px; padding-left: 10px;">
        <!--<![endif]-->
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
        <div style="color:#f7ce3e;font-family:'Oswald', Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div style="line-height: 1.2; font-family: 'Oswald', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 12px; color: #f7ce3e; mso-line-height-alt: 14px;">
        <p style="font-size: 96px; line-height: 1.2; word-break: break-word; text-align: left; font-family: Oswald, Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 115px; margin: 0;"><span style="color: #ffffff; font-size: 78px;">${currency}${totalTips}</span></p>
        </div>
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
        <div style="color:#f7ce3e;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;line-height:1.5;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div style="line-height: 1.5; font-size: 12px; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #f7ce3e; mso-line-height-alt: 18px;">
        <p style="font-size: 30px; line-height: 1.5; word-break: break-word; text-align: left; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 45px; margin: 0;"><span style="color: #f7ce3e; font-size: 20px;">IN TIPS ${totalTips == 0 ? ', ☹️' : ''}</span></p>
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
        <div style="background-color:#5c4c99;">
        <div class="block-grid" style="min-width: 320px; max-width: 680px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;;direction:rtl">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#5c4c99;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="680" style="background-color:transparent;width:680px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;"><![endif]-->
        <div class="col num12" style="min-width: 320px; max-width: 680px; display: table-cell; vertical-align: top; width: 680px; direction: ltr;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 10px; padding-left: 10px;">
        <!--<![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 0px; width: 100%;" valign="top" width="100%">
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
        <div style="background-color:#72d2dc;">
        <div class="block-grid" style="min-width: 320px; max-width: 680px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;;direction:rtl">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#72d2dc;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="680" style="background-color:transparent;width:680px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;"><![endif]-->
        <div class="col num12" style="min-width: 320px; max-width: 680px; display: table-cell; vertical-align: top; width: 680px; direction: ltr;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 10px; padding-left: 10px;">
        <!--<![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 0px; width: 100%;" valign="top" width="100%">
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
        <div style="background-color:#72d2dc;">
        <div class="block-grid mixed-two-up" style="min-width: 320px; max-width: 680px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;;direction:rtl">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#72d2dc;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="226" style="background-color:transparent;width:226px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;background-color:#72d2dc;"><![endif]-->
        <div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 224px; background-color: #72d2dc; width: 226px; direction: ltr;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 10px; padding-left: 10px;">
        <!--<![endif]-->
        <div align="right" class="img-container right autowidth" style="padding-right: 0px;padding-left: 0px;">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="right"><![endif]--><img align="right" alt="Supporters Illustration" border="0" class="right autowidth" src="https://drive.google.com/uc?export=view&amp;id=1zqeuItcvrpnv5rsuOqJw93haGwkfgDcU" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 206px; float: none; display: block;" title="Post Illustration" width="206"/>
        <!--[if mso]></td></tr></table><![endif]-->
        </div>
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        <!--[if (mso)|(IE)]></td><td align="center" width="453" style="background-color:transparent;width:453px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;"><![endif]-->
        <div class="col num8" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 448px; width: 453px; direction: ltr;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 10px; padding-left: 10px;">
        <!--<![endif]-->
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
        <div style="color:#f7ce3e;font-family:'Oswald', Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div style="line-height: 1.2; font-family: 'Oswald', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 12px; color: #f7ce3e; mso-line-height-alt: 14px;">
        <p style="font-size: 96px; line-height: 1.2; word-break: break-word; text-align: right; font-family: Oswald, Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 115px; margin: 0;"><span style="color: #5c4c99; font-size: 78px;">${totalSupporters}</span></p>
        </div>
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top: 5px; padding-bottom: 5px; font-family: Arial, sans-serif"><![endif]-->
        <div style="color:#f7ce3e;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;line-height:1.5;padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px;">
        <div style="line-height: 1.5; font-size: 12px; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #f7ce3e; mso-line-height-alt: 18px;">
        <p style="font-size: 30px; line-height: 1.5; word-break: break-word; text-align: right; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 45px; margin: 0;"><span style="color: #ffffff; font-size: 20px;">SUPPORTERS ${totalSupporters == 0 ? ', ☹️' : ''}</span></p>
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
        <div style="background-color:#72d2dc;">
        <div class="block-grid" style="min-width: 320px; max-width: 680px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;;direction:rtl">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#72d2dc;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="680" style="background-color:transparent;width:680px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;"><![endif]-->
        <div class="col num12" style="min-width: 320px; max-width: 680px; display: table-cell; vertical-align: top; width: 680px; direction: ltr;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 10px; padding-left: 10px;">
        <!--<![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 0px; width: 100%;" valign="top" width="100%">
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
        <div style="background-color:#5c4c99;">
        <div class="block-grid" style="min-width: 320px; max-width: 680px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;;direction:rtl">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#5c4c99;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="680" style="background-color:transparent;width:680px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;"><![endif]-->
        <div class="col num12" style="min-width: 320px; max-width: 680px; display: table-cell; vertical-align: top; width: 680px; direction: ltr;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 10px; padding-left: 10px;">
        <!--<![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 0px; width: 100%;" valign="top" width="100%">
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
        <div style="background-color:#5c4c99;">
        <div class="block-grid mixed-two-up" style="min-width: 320px; max-width: 680px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#5c4c99;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="226" style="background-color:transparent;width:226px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;background-color:#5c4c99;"><![endif]-->
        <div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 224px; background-color: #5c4c99; width: 226px;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 10px; padding-left: 10px;">
        <!--<![endif]-->
        <div align="left" class="img-container left autowidth" style="padding-right: 0px;padding-left: 0px;">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="left"><![endif]--><img alt="Recurring Tips Illustration" border="0" class="left autowidth" src="https://drive.google.com/uc?export=view&amp;id=1KzRMM1pBSpByvYdp2YiIc8mRnCMyEf-r" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 206px; display: block;" title="Message Illustration" width="206"/>
        <!--[if mso]></td></tr></table><![endif]-->
        </div>
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        <!--[if (mso)|(IE)]></td><td align="center" width="453" style="background-color:transparent;width:453px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;"><![endif]-->
        <div class="col num8" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 448px; width: 453px;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 10px; padding-left: 10px;">
        <!--<![endif]-->
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
        <div style="color:#f7ce3e;font-family:'Oswald', Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div style="line-height: 1.2; font-family: 'Oswald', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 12px; color: #f7ce3e; mso-line-height-alt: 14px;">
        <p style="font-size: 96px; line-height: 1.2; word-break: break-word; text-align: left; font-family: Oswald, Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 115px; margin: 0;"><span style="color: #ffffff; font-size: 78px;">${currency}${totalRecurringTips}</span></p>
        </div>
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
        <div style="color:#f7ce3e;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;line-height:1.5;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div style="line-height: 1.5; font-size: 12px; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #f7ce3e; mso-line-height-alt: 18px;">
        <p style="font-size: 30px; line-height: 1.5; word-break: break-word; text-align: left; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 45px; margin: 0;"><span style="color: #f7ce3e; font-size: 20px;">RECURRING TIPS ${totalRecurringTips == 0 ? ', ☹️' : ''}</span></p>
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
        <div style="background-color:#5c4c99;">
        <div class="block-grid" style="min-width: 320px; max-width: 680px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;;direction:rtl">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#5c4c99;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="680" style="background-color:transparent;width:680px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;"><![endif]-->
        <div class="col num12" style="min-width: 320px; max-width: 680px; display: table-cell; vertical-align: top; width: 680px; direction: ltr;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 10px; padding-left: 10px;">
        <!--<![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 0px; width: 100%;" valign="top" width="100%">
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
        <div style="background-color:#72d2dc;">
        <div class="block-grid" style="min-width: 320px; max-width: 680px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;;direction:rtl">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#72d2dc;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="680" style="background-color:transparent;width:680px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;"><![endif]-->
        <div class="col num12" style="min-width: 320px; max-width: 680px; display: table-cell; vertical-align: top; width: 680px; direction: ltr;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 10px; padding-left: 10px;">
        <!--<![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 0px; width: 100%;" valign="top" width="100%">
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
        <div style="background-color:#72d2dc;">
        <div class="block-grid mixed-two-up" style="min-width: 320px; max-width: 680px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;;direction:rtl">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#72d2dc;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="226" style="background-color:transparent;width:226px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;background-color:#72d2dc;"><![endif]-->
        <div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 224px; background-color: #72d2dc; width: 226px; direction: ltr;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 10px; padding-left: 10px;">
        <!--<![endif]-->
        <div align="right" class="img-container right autowidth" style="padding-right: 0px;padding-left: 0px;">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="right"><![endif]--><img align="right" alt="Withdrawn Illustration" border="0" class="right autowidth" src="https://drive.google.com/uc?export=view&amp;id=1egtbdcqBTrKHKIhWfzF94ZJC7WBOxpOj" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 206px; float: none; display: block;" title="Share Illustration" width="206"/>
        <!--[if mso]></td></tr></table><![endif]-->
        </div>
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        <!--[if (mso)|(IE)]></td><td align="center" width="453" style="background-color:transparent;width:453px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;"><![endif]-->
        <div class="col num8" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 448px; width: 453px; direction: ltr;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 10px; padding-left: 10px;">
        <!--<![endif]-->
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
        <div style="color:#f7ce3e;font-family:'Oswald', Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div style="line-height: 1.2; font-family: 'Oswald', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 12px; color: #f7ce3e; mso-line-height-alt: 14px;">
        <p style="font-size: 96px; line-height: 1.2; word-break: break-word; text-align: right; font-family: Oswald, Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 115px; margin: 0;"><span style="color: #5c4c99; font-size: 78px;">${currency}${totalWithdrawn}</span></p>
        </div>
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
        <div style="color:#f7ce3e;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;line-height:1.5;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div style="line-height: 1.5; font-size: 12px; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #f7ce3e; mso-line-height-alt: 18px;">
        <p style="font-size: 30px; line-height: 1.5; word-break: break-word; text-align: right; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 45px; margin: 0;"><span style="color: #ffffff; font-size: 20px;">WITHDRAWN ${totalWithdrawn == 0 ? ', ☹️' : ''}</span></p>
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
        <div style="background-color:#72d2dc;">
        <div class="block-grid" style="min-width: 320px; max-width: 680px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;;direction:rtl">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#72d2dc;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="680" style="background-color:transparent;width:680px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;"><![endif]-->
        <div class="col num12" style="min-width: 320px; max-width: 680px; display: table-cell; vertical-align: top; width: 680px; direction: ltr;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 10px; padding-left: 10px;">
        <!--<![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 0px; width: 100%;" valign="top" width="100%">
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
        <div style="background-color:#5c4c99;">
        <div class="block-grid" style="min-width: 320px; max-width: 680px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;;direction:rtl">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#5c4c99;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="680" style="background-color:transparent;width:680px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;"><![endif]-->
        <div class="col num12" style="min-width: 320px; max-width: 680px; display: table-cell; vertical-align: top; width: 680px; direction: ltr;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 10px; padding-left: 10px;">
        <!--<![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 0px; width: 100%;" valign="top" width="100%">
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
        <div style="background-color:#5c4c99;">
        <div class="block-grid" style="min-width: 320px; max-width: 680px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#5c4c99;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="680" style="background-color:transparent;width:680px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;"><![endif]-->
        <div class="col num12" style="min-width: 320px; max-width: 680px; display: table-cell; vertical-align: top; width: 680px;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 10px; padding-left: 10px;">
        <!--<![endif]-->
        <div align="center" class="img-container center fixedwidth" style="padding-right: 0px;padding-left: 0px;">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img align="center" alt="Cheers Illustration" border="0" class="center fixedwidth" src="https://drive.google.com/uc?export=view&amp;id=16jKE9jHX4ji2JRzvA3-Uq8g-588-8v0L" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 429px; display: block;" title="Cheers Illustration" width="429"/>
        <!--[if mso]></td></tr></table><![endif]-->
        </div>
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
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
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
        <div style="color:#f7ce3e;font-family:'Oswald', Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div style="line-height: 1.2; font-family: 'Oswald', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 12px; color: #f7ce3e; mso-line-height-alt: 14px;">
        <p style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; font-family: Oswald, Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 17px; margin: 0;"><span style="color: #ffffff;"><span style="font-size: 42px;">#CREATE</span></span></p>
        </div>
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
        <div style="color:#f7ce3e;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;line-height:1.5;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div style="line-height: 1.5; font-size: 12px; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #f7ce3e; mso-line-height-alt: 18px;">
        <p style="font-size: 16px; line-height: 1.5; word-break: break-word; text-align: center; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 24px; margin: 0;"><span style="color: #f7ce3e; font-size: 16px;">With 2020 being a heck of a year, staying alive was the biggest flex. Reply 'Hi' so we you still ride with us!</span></p>
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
        <div style="background-color:#5c4c99;">
        <div class="block-grid" style="min-width: 320px; max-width: 680px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#5c4c99;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="680" style="background-color:transparent;width:680px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:30px; padding-bottom:0px;"><![endif]-->
        <div class="col num12" style="min-width: 320px; max-width: 680px; display: table-cell; vertical-align: top; width: 680px;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:30px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
        <!--<![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="10" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 10px; width: 100%;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td height="10" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <div align="center" class="img-container center autowidth" style="padding-right: 0px;padding-left: 0px;">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img align="center" alt="Abstract Shapes" border="0" class="center autowidth" src="https://drive.google.com/uc?export=view&amp;id=1sPNy6-g2GcPWtqBaI2fX50v2FGY-INgd" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 680px; display: block;" title="Abstract Shapes" width="680"/>
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
        <div style="background-color:#5c4c99;">
        <div class="block-grid three-up" style="min-width: 320px; max-width: 680px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#5c4c99;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:680px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="226" style="background-color:transparent;width:226px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:30px; padding-bottom:30px;"><![endif]-->
        <div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 224px; width: 226px;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:30px; padding-bottom:30px; padding-right: 0px; padding-left: 0px;">
        <!--<![endif]-->
        <div align="center" class="img-container center fixedwidth" style="padding-right: 10px;padding-left: 10px;">
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 10px;padding-left: 10px;" align="center"><![endif]-->
        <div style="font-size:1px;line-height:10px"> </div><img align="center" alt="Shukran" border="0" class="center fixedwidth" src="https://drive.google.com/uc?export=view&amp;id=1GfeklRxs6fyzI7Kz1qYGKaskU_oHfrLq" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 102px; display: block;" title="Your Logo" width="102"/>
        <div style="font-size:1px;line-height:10px"> </div>
        <!--[if mso]></td></tr></table><![endif]-->
        </div>
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        <!--[if (mso)|(IE)]></td><td align="center" width="226" style="background-color:transparent;width:226px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:30px; padding-bottom:30px;"><![endif]-->
        <div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 224px; width: 226px;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:30px; padding-bottom:30px; padding-right: 0px; padding-left: 0px;">
        <!--<![endif]-->
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
        <div style="color:#ffffff;font-family:Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div style="line-height: 1.2; font-size: 12px; font-family: Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif; color: #ffffff; mso-line-height-alt: 14px;">
        <p style="font-size: 18px; line-height: 1.2; text-align: left; word-break: break-word; font-family: Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 22px; margin: 0;"><span style="color: #ffffff;"><strong><span style="">Social media</span></strong></span></p>
        </div>
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
        <div style="color:#C0C0C0;font-family:Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div style="line-height: 1.2; font-size: 12px; font-family: Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif; color: #C0C0C0; mso-line-height-alt: 14px;">
        <p style="font-size: 12px; line-height: 1.2; text-align: left; word-break: break-word; font-family: Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 14px; margin: 0;"><span style="color: #ffffff; font-size: 12px;">We're big on Instagram &amp; Twitter. Engage us.</span></p>
        </div>
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
        <table cellpadding="0" cellspacing="0" class="social_icons" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top" width="100%">
        <tbody>
        <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; vertical-align: top; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
        <table align="left" cellpadding="0" cellspacing="0" class="social_table" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-tspace: 0; mso-table-rspace: 0; mso-table-bspace: 0; mso-table-lspace: 0;" valign="top">
        <tbody>
        <tr align="left" style="vertical-align: top; display: inline-block; text-align: left;" valign="top">
        
        <td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 4px; padding-left: 0px;" valign="top"><a href="https://www.twitter.com/" target="_blank"><img alt="Twitter" height="32" src="https://drive.google.com/uc?export=view&amp;id=1UiFCD6YtuRgne3oo6t9ULsLbBN1HqAlq" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;" title="twitter" width="32"/></a></td>
        
        <td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 4px; padding-left: 0px;" valign="top"><a href="https://www.instagram.com/" target="_blank"><img alt="Instagram" height="32" src="https://drive.google.com/uc?export=view&amp;id=16qXdjHs-Jjx13VeS_PuPregKnmDISIb3" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;" title="instagram" width="32"/></a></td>
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
        <!--[if (mso)|(IE)]></td><td align="center" width="226" style="background-color:transparent;width:226px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:30px; padding-bottom:30px;"><![endif]-->
        <div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 224px; width: 226px;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:30px; padding-bottom:30px; padding-right: 0px; padding-left: 0px;">
        <!--<![endif]-->
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
        <div style="color:#ffffff;font-family:Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div style="line-height: 1.2; font-size: 12px; font-family: Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif; color: #ffffff; mso-line-height-alt: 14px;">
        <p style="font-size: 18px; line-height: 1.2; text-align: left; word-break: break-word; font-family: Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 22px; margin: 0;"><span style="color: #ffffff;"><strong><span style="">Reach out to us</span></strong></span></p>
        </div>
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
        <div style="color:#ffffff;font-family:Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
        <div style="line-height: 1.2; font-size: 12px; font-family: Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif; color: #ffffff; mso-line-height-alt: 14px;">
        <p style="font-size: 14px; line-height: 1.2; text-align: left; word-break: break-word; font-family: Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 17px; margin: 0;"><span style="color: #ffffff;">contact@useshukran.com</span></p>
        <p style="font-size: 14px; line-height: 1.2; text-align: left; word-break: break-word; font-family: Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 17px; margin: 0;"> </p>
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
        <div class="block-grid two-up no-stack" style="min-width: 320px; max-width: 680px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
        <div class="col " style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 336px; width: 340px;">
        <div class="col_cont" style="width:100% !important;">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 0px; padding-left: 0px;">
        <!--<![endif]-->
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 4px; padding-left: 4px; padding-top: 4px; padding-bottom: 4px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
        <div style="color:#9d9d9d;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:4px;padding-right:4px;padding-bottom:4px;padding-left:4px;">
        <div style="line-height: 1.2; font-size: 12px; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; color: #9d9d9d; mso-line-height-alt: 14px;">
        <p style="font-size: 14px; line-height: 1.2; word-break: break-word; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 17px; margin: 0; text-align: center;"><a href="https://useshukran.com/" rel="noopener" style="text-decoration: none; color: #9d9d9d;" target="_blank" title="Shukran is a product of Placeholder"><span style="font-size: 12px;">&copy; 2020 <strong>Shukran by Placeholder</strong></span></a></p>
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

    let sent = await smtpTransport.sendMail(mailOptions)
                .catch((err) => {
                    console.error('send mail error', err);
                    // reporting
                    let writeStream = fs.createWriteStream('./test-error-2020-email-report.json', { flags: 'a' });
                    writeStream.write(JSON.stringify(email, null, 4) + ',\n', (err) => {
                        if (err) console.error('reporting bad email send err', err)
                    })
                    writeStream.end();
                });
    smtpTransport.close();
    

    // reporting
    let writeStream = fs.createWriteStream('./test-2020-email-report.json', { flags: 'a' });
    writeStream.write(JSON.stringify(sent, null, 4) + ',\n', (err) => {
        if (err) console.error('reporting good email send err', err)
    })
    writeStream.end();

    // console.log('send msg info', sent)

}

/**
 * 
 * @param {object} reqbody 
 * 
 * if we send an email and it didn't deliver, we should tell the creator to verify their email.
 */
module.exports.sendTipEmail = async (reqbody) => {
    const smtpTransport = nodemailer.createTransport(contactMailOption);
    const mailOptions = {
        from: "Ola from Shukran <contact@useshukran.com>",
        to: reqbody.creator_email,
        subject: "You just got tipped " + reqbody.username.capitalize(), // do we want to capitalize?, well unless it contains underscore
        generateTextFromHTML: true,
        html: "<h3>Hi, <b>" + reqbody.username.capitalize() + "</h3></b> "
        + reqbody.supporter_nickname + " just tipped you!" + "<br>"
        + "<a href='https://useshukran.com/accounts'>Login to find out how much.</a>"
        };

        smtpTransport.sendMail(mailOptions, (error, response) => {
            error ? console.error(error) : console.log(response);
            smtpTransport.close();
        });
}

module.exports.sendShuclanThankYou = async (reqbody) => {
    const smtpTransport = nodemailer.createTransport(contactMailOption);

    const mailOptions = {
        from: 'Ola from Shukran <contact@useshukran.com>',
        to: reqbody.supporter_email.trim(),
        subject: "Hey, thank you for joining " +  reqbody.username.trim()+"'s" + " Shuclan!",
        generateTextFromHTML: true,
        html: `<h3>Thank you for choosing to support ${reqbody.username} monthly.</h3>
        <p>Your support means alot to them. Please feel free to talk about this by tweeting using this link: </p>
        <a href="https://twitter.com/intent/tweet?url=http%3A%2F%2Fuseshukran.com%2F&text=I+just+joined+a+creator's+Shuclan+on
        +@useshukran.+You+can+support+your+favorite+creator+too+here:&hashtags=saythanks,shukran"
        target="blank">Tell others</a>
        `
    }

    smtpTransport.sendMail(mailOptions, (error, response) => {
        error ? console.error(error) : console.log(response);
        smtpTransport.close();
    });
}


module.exports.sendCreatorAddedShuclan = async (reqbody) => {
    const smtpTransport = nodemailer.createTransport(contactMailOption);

    const mailOptionsCreator = {
        from: 'Ola from Shukran <contact@useshukran.com>',
        to: reqbody.creator_email.trim(),
        subject: "Hey, " + reqbody.username + " someone just joined your Shuclan!",
        generateTextFromHTML: true,
        // tell them to log in to find out how much, & that means we'll be showing newest shuclan members in vue end
        html: `<h3>Hey! We are excited to announce that someone has joined your Shuclan.</h3>
        <p>That means they have pledged an automated amount to your media co per month! Tell others: </p>
        <a href="https://twitter.com/intent/tweet?url=http%3A%2F%2Fuseshukran.com%2F&text=I+just+added+a+new+Shuclan+member
        +@useshukran.+You+too+can+get+supported,+start+here:&hashtags=saythanks,shukran"
        target="blank">Tell others</a>
        `
    }
        
    smtpTransport.sendMail(mailOptionsCreator, (error, response) => {
        error ? console.error(error) : console.log(response);
        smtpTransport.close();
    });
}


module.exports.followTheMoney = async (reqbody) => {
    const smtpTransport = nodemailer.createTransport(contactMailOption);
    
    const mailOptions = {
        from: "Ola from Shukran <contact@useshukran.com>",
        to: 'nwachukwuossai@gmail.com; theolaakomolafe@gmail.com',
        subject: "A transact just happened",
        generateTextFromHTML: true,
        html: "<h2>Hi <b>We got webhook data like:</b></h2>"
        + "Look for payment plan id & stuff!" + "<br>"
        + JSON.stringify(reqbody)
        };

    smtpTransport.sendMail(mailOptions, (error, response) => {
        error ? console.error(error) : console.log(response);
        smtpTransport.close();
    });
}