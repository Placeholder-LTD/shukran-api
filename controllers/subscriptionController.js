const boom = require('boom')
const nodemailer = require("nodemailer");
const https = require('https');
const Subscription = require('../models/Subscription')
const Money = require('../models/Money')

/**
 * when creating a subscription, who is this person deciding to subscribe to?
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
                "name": `${this.supporter_email}-shukraning-NGN${this.userinfos[0]._id}`
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
                "duration": 12
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
                    // add creator, supporter_email
                    endData.data.creator = respData.creator
                    endData.data.supporter_email = respData.supporter_email
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
                    from: 'Ola from Shukran <contact@useshukran.com>',
                    to: req.body.supporter_email,
                    subject: "Hey, " + "thank you for joining " +  req.body.creator+"'s" + " Shuclan!",
                    generateTextFromHTML: true,
                    html: `<h3>Thank you for choosing to support this creator monthly.</h3>
                    <p>Your support means alot to them. Please feel free to talk about this by sharing using this button: </p>
                    <a href="https://twitter.com/intent/tweet?url=http%3A%2F%2Fuseshukran.com%2F&text=I+just+joined+a+creator's+Shuclan+on
                    +@useshukran.+You+too+can+find+creators+to+support+here:&hashtags=saythanks,shukran"
                    target="blank">Tell others</a>
                    `
                }

                const mailOptionsCreator = {
                    from: 'Ola from Shukran <contact@useshukran.com>',
                    to: req.body.creator_email,
                    subject: "Hey, "+  req.body.creator+" someone just joined your " + "Shuclan!",
                    generateTextFromHTML: true,
                    // tell them to log in to find out how much, & that means we'll be showing newest shuclan members in vue end
                    html: `<h3>Hey! We are excited to announce that someone has joined your Shuclan.</h3>
                    <p>That means they have pledged an automated amount to your media co per month! Tell others: </p>
                    <a href="https://twitter.com/intent/tweet?url=http%3A%2F%2Fuseshukran.com%2F&text=I+just+added+a+new+Shuclan+member
                    +@useshukran.+You+too+can+get+supported,+start+here:&hashtags=saythanks,shukran"
                    target="blank">Tell others</a>
                    `
                }
                smtpTransport.sendMail(mailOptions, (error, response) => {
                    error ? console.log(error) : console.log(response);
                    smtpTransport.close();
                });
                smtpTransport.sendMail(mailOptionsCreator, (error, response) => {
                    error ? console.log(error) : console.log(response);
                    smtpTransport.close();
                });
                const subscription = new Subscription(endData.data)
                subscription.save()

                resolve(endData.data.id); // we only need to return the id
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
exports.getAllSubscriptions = async (req, reply) => {
    try {
        return new Promise((resolve, reject) => { // https://stackoverflow.com/a/59274104/9259701

            let options = {
                hostname: 'api.flutterwave.com', // don't add protocol
                port: 443, // optional
                path: '/v3/payment-plans',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.FLUTTERWAVE_SEC_KEY}`
                }
            };
    
            https.request(options, (resp) => {
                let getData = ''; // very important to initialize
    
                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    getData += chunk;
                });
    
                // The whole response has been received.
                resp.on('end', () => {
                    resolve(JSON.parse(getData));
                });
    
            }).on("error", (err) => {
                console.log("Error: ", err.message);
                // return err
                reject(err.message);
            }).end();
        })
    } catch (err) {
        throw boom.boomify(err)
    }
}
/**
 * 
 * @param {*} req 
 * @param {*} reply 
 * get details of all the subscribers of a creator
 */
exports.getSubscribers = async (req, reply) => {
try { // https://stackoverflow.com/a/40539133/9259701
    // do a script that'll regularly update out db
/*         let page_number = 1;
        let endData = [];
        fetchSubs = () => {
            return new Promise((resolve, reject) => { // https://stackoverflow.com/a/59274104/9259701
                
                let options = { // https://nodejs.org/api/http.html#http_http_request_url_options_callback
                    hostname: 'api.flutterwave.com', // don't add protocol
                    port: 443, // optional
                    path: `/v3/payment-plans?page=${page_number}`,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.FLUTTERWAVE_SEC_KEY}`
                    }
                };
        
                
                //  reading through https://developer.flutterwave.com/reference#get-payment-plans
                //  we'd need to get all the pages before sending to the front end
                //  so we'll have to make the calls recurringly until current_page === total_pages
                //  but for now, we don't have more/up to 10 subscribers
                https.request(options, (resp) => {
                    let getData = ''; // very important to initialize
                    
                    // A chunk of data has been recieved.
                    resp.on('data', (chunk) => {
                        getData += chunk;
                    });
        
                    // The whole response has been received.
                    resp.on('end', () => {
                        let response = JSON.parse(getData)
                        console.log('\ndone with \n',resp.url,'\n', response)
                        //  {meta: { page_info: { total: 11, current_page: 1, total_pages: 2 }
                        if (response.status === "success" && response.meta.page_info.current_page < response.meta.page_info.total_pages) {
                            console.log('subs ss s\n', response)
                            endData.push(response.data)
                            page_number++
                            console.info('\nwe\'re going again', page_number)
                            fetchSubs();
                            
                        } else if (response.status === "success" && response.meta.page_info.current_page === response.meta.page_info.total_pages) {

                            // push last bit
                            endData.push(response.data)
                            // let's test
                            // endData = endData.filter(sub => sub.name.includes(req.query.id))
                            console.log('\nwe\'re done\n', endData)
                            resolve(endData);
                        } else {
                            console.error('\nwe\'re NOT done\n')
                            reject('failed')
                        }
                        // resolve(response)
                    });
        
                }).on("error", (err) => {
                    console.log("Error: ", err, err.message);
                    // return err
                    reject(err.message);
                }).end();
            })
        }

        fetchSubs();
 */

    // before we create a new subscription, let's check if we have a subscritpion with that amount before
    






    
    // not req.query.username use req.query.id in prod

    





    
    
    // https://stackoverflow.com/a/13437802/9259701
    // also check if their subscription is still active
    let subs = Subscription.find({
        'name': new RegExp(`-shukraning-${/* req.query.username */req.query.id}`, 'gi'),
        status: 'active'
    }, { plan_token: 0, id: 0, _id: 0, __v: 0 }) // exclude these fields
    
    return subs

} catch (err) {
  throw boom.boomify(err)
}
}

exports.getTotalRevenue = async(req, reply) => {
    let money = Money.find({
        'data.tx_ref': new RegExp(`-shukraning-${req.query.id}`, 'gi'), // ${/* req.query.id */}
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