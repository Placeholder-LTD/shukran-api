const boom = require('boom')
const https = require('https');
const Subscription = require('../models/Subscription')

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
                "name": `shukraning-NGN${this.amount}`
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
                "interval": "daily", // monthly
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
                    const subscription = new Subscription(endData.data)
    
                    // return subscription.save()

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