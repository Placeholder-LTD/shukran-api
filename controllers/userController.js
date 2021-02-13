const boom = require('boom')
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const ggle = require('../helpers/uploadgdrive');

// maybe do a script/cronjob that'll regularly update our db
const getAllSubscribers = require('../flutterwave-api-calls/get-all-subscribers')
const getAllPaymentPlans = require('../flutterwave-api-calls/get-all-payment-plans');

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

exports.testCookies = (req, reply) => {
    console.log('\nplease cookies?\n\n', req.cookies);
    let cookieDomain = 'shukran-api.herokuapp.com', cookieSecure = true;

    if (req.hostname.match(/localhost:[0-9]{4,}/g)) { // if localhost
      cookieSecure = false
      cookieDomain = 'localhost:8080'
    } else if (req.hostname.match(/shukran-staging-api.herokuapp.com/g)) {
      cookieDomain = 'shukran-staging-api.herokuapp.app' // .app because that's what netify defaults redirect to from .com
    } else if (req.hostname.match(/shukran.africa/g)) {
        cookieDomain = 'shukran.africa'
    }

    reply
    .setCookie('leadership-shukran', '#Create', {
      path: '/', // '/api/randomcreators/',
      httpOnly: true,
      // domain: cookieDomain,
      maxAge: 15 * 1000, // not expires
      // sameSite: 'none',
      secure: cookieSecure,
      signed: true
    })
    .setCookie('followers-shukran', '#Create', {
        path: '/api/randomcreators',
        httpOnly: false,
        // domain: cookieDomain,
        maxAge: 15 * 1000, // not expires
        sameSite: 'none',
        secure: cookieSecure,
        signed: false
      })
    .code(200)
    .send('Hey there.')
}

exports.randomCreators = (req, reply) => {
    try {
        User.aggregate([
            {
                $match: {
                    username: { $exists: true }, // can't be too sure, right? lool... well, just because we can!
                    craft_type: { $exists: true },
                    summary: { $exists: true, $not: { $in: ['', ' '] } },
                    picture_id: { $exists: true, $not: { $in : ['1aMDqEuCDesg0cTpHJj0IHehEDUEk3l_F', '1l6Yn2_89KDaDZhH67Ge4Z6T8x7C0Q91J'] } }
                }
            },
            {
                $sample: { size: parseInt(req.params.number, 10) } // must be +integer
            },
            {
                $unset: [ '_id', 'fullname', 'email', 'password', 'create_date', 'phone', 'content', 'subscribers', '__v', 'account_name', 'account_number', 'bank', 'audience_size', 'primary_link', 'redirect', 'folder_id' ]
            }
        ], (err, creators) => {
            console.log('\ndo we, again, have cookies?\n\n', req.cookies);
            if (Object.keys(req.cookies).length !== 0 && req.cookies['4thfoo']) {
                let uc = req.unsignCookie(req.cookies['4thfoo']);
                let uc_ = JSON.parse(JSON.stringify(uc))
                let uc__ = JSON.parse(uc_.value)
                if (typeof uc__ === 'string') {
                    uc__ = JSON.parse(uc__)
                }
                console.log('unsigned cookie we have', typeof uc__, uc__); // { valid: true, renew: false, value: '89#foo' }
                
                console.log('>>>>', uc__[0]);
            }
            if (err) { // hopefully never, or we just perform a searh with User model
                reply.send([
                    {
                        picture_id: '1f8mYQVHIygKZoSSM7uy1C9oBpeHTVj0t',
                        username: 'markkaranja',
                        craft_type: 'Film / Music video producer/Director,Actor,Youtube content creator ,Multitalented chef.',
                        summary: 'I am grateful and delighted that you loved viewing my content and as you keep on tiping me, may your bank accounts too grow hefty'
                    },
                    {
                        picture_id: '1JwqESzajQElex8NSVpaK6ZnY4fVyjGaX',
                        username: 'bola john',
                        phone: '09063154719',
                        craft_type: 'Podcaster, Blogger, Photographer, Writer and Medical Doctor',
                        summary: '"When we create something, we think, "Will our customers thank us for this?" This medium is a way to thank me if I have blessed you with my content. '
                    },
                    {
                        picture_id: '1NqqlsaNesslrXQFk2quCqwaSrRQSmjeR',
                        username: 'gani.art_k',
                        craft_type: 'Mobile videographer, Blogger, Content creator',
                        summary: "Thank you so much for supporting my content. You're making such a positive impact in my life and helping me create more.",
                        phone: '09033065175'
                    },
                    {
                        picture_id: '18SjIiCk2Tg4QqaAUq221Wt4i2AD7mMPD',
                        username: 'sassie_p',
                        craft_type: 'Makeup artist/content creator',
                        summary: 'There are thousands of people in my field, but your love and support matters a lot to me. Thank you so much ',
                        phone: '+2347067991500'
                    },
                    {
                        picture_id: '1qU20Np264F0Y0QZ095AG6i06jisUklHP',
                        username: 'womenhomestead',
                        phone: '08187448399',
                        craft_type: 'Writer, content creator and podcaster',
                        summary: 'To everyone that support by listening, sharing or any other way you can. I love you!'
                    },
                    {
                        picture_id: '1FNKSFjaiVRn0amQA4r7Wkp1sf-IHWhtb',
                        username: 'gospel',
                        phone: '08118280774',
                        craft_type: 'Digital Marketing and Videography coach',
                        summary: 'Feel free to hit me up if you want to learn New ways to start earning money online in just one week.'
                    },
                    {
                        username: 'chitothelagoshustler',
                        phone: '09069097635',
                        craft_type: 'Creative Director, Video Editor, Food Explorer, Photo Editor, Apps Guru and Social Media Savvy',
                        summary: 'Thank You, i appreciate you. You are the best vibe squad. Your Tip means you enjoy my content.❤️',
                        picture_id: '1AsUj1bfvXosbepKC4Qy87xfDGlWVgqed'
                    }
    
                ])
            } else {
                reply.send(creators)
            }
        })
    } catch (error) {
        throw boom.boomify(error) // ?
    }
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

/**
 * https://github.com/fastify/fastify/blob/master/docs/Routes.md#promise-resolution
 * @param {object} req request object
 * @param {object} reply response object
 */
exports.getAll = (req, reply) => {
    try {
        let cookieDomain = 'useshukran.com', cookieSecure = true;
        console.log('\nfrom:', req.hostname);
        if (req.hostname.match(/localhost:[0-9]{4,}/g)) { // if localhost
            cookieSecure = false
            cookieDomain = 'localhost'
        } else if (req.hostname.match(/shukran-staging-api.herokuapp.com/g)) { // /shukranstaging.netlify.(com|app)/g
            cookieDomain = 'shukranstaging.netlify.app' //
        }

        console.log('setting cookie for', cookieDomain);

        console.log('do we have cookies?\n\n', req.cookies);
        User.find({}, function (err, creators) {
            if (err) {
                reply.send([])
            } else {
                let _ck = {
                    littel: 'lower than angels',
                    'we-see-not': [
                        {
                            'what': 'is the glory',
                            and: 'honor?'
                        }
                    ]
                }
                reply
                .setCookie('xxx', JSON.stringify(_ck), {
                    path: '/api/allusers/',
                    maxAge: 3 * 1000,
                    httpOnly: true, // front end js can't access
                    secure: cookieSecure, // if running live
                    signed: true,
                    sameSite: 'strict',
                    domain: cookieDomain
                })
                .setCookie('foo', 'foo', {
                    path: '/api/allusers/',
                    maxAge: 3 * 1000,
                    httpOnly: true, // front end js can't access
                    secure: cookieSecure, // if running live
                    signed: true,
                    sameSite: 'strict',
                    domain: cookieDomain
                })
                .code(200)
                .send(creators)
            }
        })
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
        // console.log('what is a', a);
        // check if they have a folder_id
        // if not, create for them
        if (a.length >= 1 && !a[0].folder_id) {
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

            // sort content from backend because we don't have energy in frontend
            if (a[0].content.length > 1) {
                a[0].content.sort(function compareDates(d1, d2) {
                    return d2.created_at < d1.created_at ? -1 : 1
                })
            }
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

/**
 * 
 * @param {object} req 
 * @param {object} reply 
 * 
 * used to fetch creator data for support page (/cr/creatorname)
 * here's the logic we use to determine what content we show for the supporter.
 * we check the cookie and also the money threshold
 * 
 * WHAT IF THEY CLEAR THEIR COOKIES... WE SHOULD BE USING DATABASE
 * we don't save in database because when supporters unsubscribe, we can't know in real time... so we might need to be running a cron job to regularly update our db if we go with that route.
 */
exports.getCreatorProfile = (req, reply) => {
    try {
        let username = req.body.username
        User.find({ 'username': username }, (err, user) => { // user is an array // remove password
            if (err) {
                console.log('errr\n', err);
                reply.send(null) // should change... shouldn't be just null
            } else if (user.length === 1) {
                console.log('(((()))', req.cookies);
                // we strip the contents based on what the user should see, how they've subscribed.
                if (
                    req.cookies['_shukran'] 
                    && 
                    req.unsignCookie(req.cookies['_shukran']).valid 
                    /* 
                    && 
                    req.cookies['_shukran']['shukran-subs'] 
                    && 
                    req.cookies['_shukran']['shukran-subs'].length > 0
                    */
                ) { // check this...
                    
                    let getCookie___ = req.unsignCookie(req.cookies['_shukran']);
                    let getCookie__ = JSON.parse(JSON.stringify(getCookie___))
                    let getCookie_ = JSON.parse(getCookie__.value)
                    console.log('seesing sehth?', typeof getCookie_, getCookie_);
                    // if they're subscribed to the creator
                    if (typeof getCookie_ === 'string') {
                        getCookie_ = JSON.parse(getCookie_)
                    }
                    // another thing we could do is save the device_id we get from flutterwave,
                    // if they don't have _shukran cookie, ... we could make use of the device id... but we'd need our own, and not flutterwave or we could just use what ever flutterwave uses for consistency, so we can track the user device even if they use a different browser on that device ...but we'd need to have their device id saved somewhere... to verify : AND THERE'S NO WAY TO DO THAT NOW.
                    let _subs = getCookie_['shukran-subs'];
                    let _supporter_email = getCookie_['supporter_email']
                    if (_subs.includes(user[0]._id)) { // they're subsribed to this user.
                        // filter out all the contents that's above what the supporter is paying.

                        // or should we store as a cookie too? the price they subscribed?
                        Promise.all([ // get subscribers for this user.
                            getAllPaymentPlans.getAllPaymentPlans,
                            getAllSubscribers.getAllSubscribers
                        ])
                        .then(([plans, shuclans]) => {
                            // console.log('got shuclans', shuclans.length);
                            // console.log('got plans', plans.length);
                            let creatorPlans = plans.filter(plan => plan.name.includes(creator_id))
                            console.log('No. of creatorPlans', creatorPlans.length)
                            
                            let creatorShuclans = shuclans.filter(shuklan => creatorPlans.some(plan => plan.id === shuklan.id))
                            console.log('No. of creatorShuclans', creatorShuclans.length)

                            // so how much are they (the supporter) paying?
                            let _schln = creatorShuclans.find(shcln => shcln.customer.customer_email === _supporter_email)
                            
                            // we filter out the contents based on the supporter's money
                            // so what if a clever dev just copies the download link, and shares the link... we need to block access to content unless it's us accessing it. And unless the refeerer of the download request is coming from useshukran.com[/cr/creatorname]
                            user[0].content = user[0].content.filter((cntnt) => {
                                return cntnt.threshold.amount <= fx(_schln.amount).from(_schln.currency).to(cntnt.threshold.currency)
                            }) // <= ?? or >= ??

                            // resolve(creatorShuclans)
                            // resolve(); // should we call this?
                            // console.log('\n\n', user);
                            reply.send(user)
                    }).catch((error) => {
                        reject(error)
                    });

                    } else { // what if it's free ? the amount is just 0.00
                        // delete some of user[0].content
                        user[0].content = user[0].content.filter(cntnt => cntnt.threshold.amount == 0) // 0.00 == 0 => true
                        console.log('sending', user[0].content);
                        reply.send(user)
                    }
                } else { // OR, send user without content
                    user[0].content = [] // delete user[0].content
                    // console.log('user without content \n', user);
                    reply.send(user)
                }
            } else if (user.length === 0) {
                reply.send([]) // user doesn't exist, should this change too...
            }
        })
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
exports.updateContentMetaData = async (req, reply) => {
    try {
        const id = req.body.id
        const users = req.body
        const { updateData } = users
        console.log('\n\n\n', updateData);

        let _d = { // there would always be amount
            "content.$.threshold.amount": updateData.price
        }
        if (updateData.currency) {
            _d["content.$.threshold.currency"] = updateData.currency
        }
        if (updateData.description) {
            _d["content.$.description"] = updateData.description
        }

        const update = await User.findOneAndUpdate( // updateOne() doesn't return the document from the db
            {_id: id, "content._id": users.content_id}, 
            {
                $set: _d
            },
            { new: true }
        )
        return update
    } catch (err) {
        throw boom.boomify(err) // should we be throwing errors?
    }
}

exports.updateContentPrice = async (req, reply) => {
    try {
        const id = req.body.id
        const users = req.body
        const { updateData } = users
        console.log('\n\n\n', updateData);

        const update = await User.findOneAndUpdate( // updateOne() doesn't return the document from the db
            {_id: id, "content._id": users.content_id}, 
            {
                $set: {
                    "content.$.threshold.amount": updateData.price,
                    "content.$.threshold.currency": updateData.currency
                }
            },
            { new: true }
        )
        reply.send(update) // return update
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