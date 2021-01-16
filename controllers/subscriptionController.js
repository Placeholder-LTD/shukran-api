const boom = require('boom')
const https = require('https');
const Subscription = require('../models/Subscription')
const Money = require('../models/Money')
const getAllSubscribers = require('../flutterwave-api-calls/get-all-subscribers')
const getAllPaymentPlans = require('../flutterwave-api-calls/get-all-payment-plans')

/**
 * when creating a subscription, who is this person deciding to subscribe to?
 * 
 * TODO: we should only send the email message after the first subscription payment
 */
exports.createSubscription = async (req, reply) => { // https://attacomsian.com/blog/node-make-http-requests
    try { // https://stackoverflow.com/a/40539133/9259701

        // before we create a new subscription, let's check if we have a subscritpion with that amount before

        return new Promise((resolve, reject) => { // https://stackoverflow.com/a/59274104/9259701

            /**
             * expect requestData to look like:
             * {
             * "amount": parseInt(this.amount),
                supporter_email: this.email,
                creator: this.username,
                creator_id: this.userinfos[0]._id,
                "name": `shukraning-NGN${this.userinfos[0]._id}`
                },
             */
            let requestData = req.body

            let options = {
                hostname: 'api.flutterwave.com', // don't add protocol
                port: 443, // optional
                path: '/v3/payment-plans',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.FLUTTERWAVE_SEC_KEY}`
                }
            };
    
            const data = JSON.stringify({
                "amount": parseInt(requestData.amount),
                "name": requestData.name,
                "interval": "monthly", // daily
                // "duration": 12 // removing because we don't it to stop so we don't keep creating them, instead we ask supporters how long do they want to keep supporting...
            });

            // make use of the subscirption creation date to know when the person started paying, and most importantly who they're paying to!
    
            const request = https.request(options, (resp) => {
                let respData = '';
    
                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    respData += chunk;
                });
    
                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    let endData = JSON.parse(respData)
                    // console.log(endData);
                    // add creator_username, supporter_email
                    // endData.data.creator_username = respData.creator_username // we aren't saving this for now, it isn't in our Subscrition model. no need for now.
                    // endData.data.supporter_email = respData.supporter_email
                    // they aren't even saving for some reason... make endData.data is readonly or sth, we can do without them for now, we probably even should
                        
                    const subscription = new Subscription(endData.data)
                    subscription.save()

                    resolve(endData.data.id); // we only need to return the id of the payment/subscription plan
                });
    
            }).on("error", (err) => {
                console.log("Error: ", err.message);
                // return err
                reject(err.message);
            });
            request.write(data);
            request.end();
        })

    } catch (err) {
      throw boom.boomify(err)
    }
}

/**
 * 
 * @param {object} req request object
 * @param {object} reply response object
 * @deprecated use ./flutterwave-api-calls/get-all-payment-plans
 * 
 */
exports.getAllSubscriptions = (req, reply) => {
    try {
        getAllPaymentPlans.getAllPaymentPlans.then((plans) => {
            reply.send(plans) // return creatorShuklans
        }, (err) => {

        }).catch((why) => {

        });

        
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.getCreatorSubscrptions = (req, reply) => {
    // req.params.creator
    try {
        Subscription.find({ 
            name: new RegExp(req.params.creator_id) // search with creator is
        }, {plan_token: 0, _id: 0, __v:0, status:0}, function (err, subs) {
            // console.log(subs);

            // console.log(req.body)
            // console.log(req.query)
            console.log(req.params)
            console.log(req.headers)
            // console.log(req.raw)
            console.log(req.id)
            console.log(req.ip)
            // console.log(req.ips)
            console.log(req.hostname)
            // console.log(req.protocol)
            req.log.info('some info')
            console.log('\ndo we have cookies?\n\n', req.cookies);

            let cookieDomain = 'useshukran.com', cookieSecure = true;

            if (req.hostname.match(/localhost:[0-9]{4,}/g)) { // if localhost
                cookieSecure = false
                cookieDomain = 'localhost:8080'
            } else if (req.hostname.match(/shukranstaging.netlify.(com|app)/g)) {
                cookieDomain = 'shukranstaging.netlify.app' // .app because that's what netify defaults redirect to from .com
            }

            reply.setCookie('3rdfoo', '89#foo', {
                domain: cookieDomain,
                maxAge: 15 * 1000 * 1000, // not expires
                path: '/cr/chuks', // /cr/chuks /api/getsubscriptions/5fd84b75d3cb6e0bd63a1335/
                signed: true,
                httpOnly: true,
                secure: cookieSecure,
                sameSite: 'lax',
            })
            if (err) {
                reply.send([]) // send empty array
            } else {
                reply.send(subs)
            }
        })
    } catch (error) {
        throw boom.boomify(error)
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} reply 
 * get details of all the subscribers of a creator
 */
exports.getSubscribers = (req, reply) => {
    try {

        // https://stackoverflow.com/a/13437802/9259701

        getAllPaymentPlans.getAllPaymentPlans.then((plans) => {
            let creatorPlans = plans.filter(plan => plan.name.includes(req.query.id))
            getAllSubscribers.getAllSubscribers.then((shuklans) => {
                let creatorShuklans = shuklans.filter(shuklan => creatorPlans.some(plan => plan.id === shuklan.plan))
                reply.send(creatorShuklans) // return creatorShuklans
            }, (err) => {

            })
        }, (err) => {

        });
        
        
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.getTotalRevenue = async (req, reply) => {
    let money = Money.find({
        'data.tx_ref': new RegExp(`-shukraning-${req.query.id}`, 'gi'),
        'data.status': 'successful'
    }, { _id: 0, __v: 0,
        'event.type': 0,
        'data.account_id': 0,
        'data.device_fingerprint': 0,
        'data.flw_ref': 0,
        'data.id': 0,
        'data.ip': 0,
        'data.merchant_fee': 0,
        'data.narration': 0,
        'data.payment_type': 0,
        'data.processor_response': 0,
        'data.status': 0,
        'data.app_fee': 0,
        'data.auth_model': 0,
        'data.charged_amount': 0,
        'data.created_at': 0,
        'data.customer.id': 0, // ask customer if they want their data seen
        'data.customer.phone_number': 0}) // exclude these fields
    
    return money
}

exports.createCreatorFolder = async (req, reply) => {
    // check if they already have a folder id
    // fetch ID of creator, get folder_id

        var fileMetadata = {
            'name': `${req.body.creator_id}-stuff`,
            'mimeType': 'application/vnd.google-apps.folder',
            'parents' : ['1J6ALbTDRqytQKRE7G1MD0JgS9MW3ib31'] // folder 'shukran-contents'
            };
            drive.files.create({
            resource: fileMetadata,
            fields: 'id'
            }, function (err, file) {
            if (err) {
                // Handle error
                console.error(err);
            } else {
                console.log('Folder Id: ', file.id);
            }
        });
    
}

exports.uploadInCreatorFolder = async (req, reply) => {
    // check if the creator already has a folder
    this.createCreatorFolder(req);
    let fileMetadata = {
        'name': filename, // Date.now() + '.jpg',
        parents: ['1J6ALbTDRqytQKRE7G1MD0JgS9MW3ib31'] // upload to folder shukran-contents
    };
    let media = {
        mimeType: mimetype,
        body: filestream
    };

    let g = await ggle.drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id',
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