const boom = require('boom')
const https = require('https');
const Subscription = require('../models/Subscription')

exports.createSubscription = async (req, reply) => { // https://attacomsian.com/blog/node-make-http-requests
    try { // https://stackoverflow.com/a/40539133/9259701

        return new Promise((resolve, reject) => { // https://stackoverflow.com/a/59274104/9259701

            let requestData = req.body

            let options = {
                hostname: 'api.flutterwave.com', // don't add protocol
                port: 443, // optional
                path: '/v3/payment-plans',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer FLWSECK-b93f3a40802ee2c2fa85f83ba38e7bd6-X`
                }
            };
    
            const data = JSON.stringify({
                "amount": parseInt(requestData.amount),
                "name": requestData.name,
                "interval": "monthly",
                "duration": 12
            });
    
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
