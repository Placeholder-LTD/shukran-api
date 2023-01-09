const https = require('https');
let fs = require('fs');
const formatDistanceToNowStrict = require('date-fns/formatDistanceToNowStrict')
let endData = [];


const FLV_OUTPUT_PATH = './flutterwave-api-calls/output.json'
let FLV_JSON = { // this is more like a what we should expect from output.json, like a TS definition, not to be used
    "payment_plans": [],
    "last_payment_plan_call": "",
    "subscribers": [],
    "last_subscribers_call": ""
}

exports.getAllPaymentPlans = () => {
    return new Promise((resolve, reject) => { // https://stackoverflow.com/a/59274104/9259701
        
        //  reading through https://developer.flutterwave.com/reference#get-payment-plans
        //  we'd need to get all the pages before sending to the front end
        //  so we'll have to make the calls recurringly until current_page === total_pages
        //  but for now, we don't have more/up to 10 subscribers
        let call = (page_number = 1) => https.request({ // https://nodejs.org/api/http.html#http_http_request_url_options_callback
            hostname: 'api.flutterwave.com', // don't add protocol
            port: 443, // optional
            path: `/v3/payment-plans?page=${page_number}&status=active`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.FLUTTERWAVE_SEC_KEY}`
            }
        }, (resp) => {
            let getData = ''; // very important to initialize
            
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                getData += chunk;
            });

            // The whole response has been received.
            resp.on('end', () => {
                try {
                    let response = JSON.parse(getData)
                    console.log('\ndone with \n\n') // , response
                    // {meta: { page_info: { total: 11, current_page: 1, total_pages: 2 }
                    // we need to imporve this!!! -- seems it can fetch the same data again, we'll investigate, by outputing the results., cause page number gets incremented up to 11 times, and total pages is just 3
                    if (response.status === "success" && response.meta.page_info.current_page < response.meta.page_info.total_pages) {
                        // console.log('payment-plans\n', response)
                        endData = endData.concat(response.data)
                        page_number++
                        console.info('\nwe\'re going again', page_number)
                        // this.getAllPaymentPlans();
                        call(page_number); // call again!
                        
                    } else if (response.status === "success" && response.meta.page_info.current_page === response.meta.page_info.total_pages) {

                        // add last bit
                        endData = endData.concat(response.data)
                        // let's test
                        // endData = endData.filter(sub => sub.name.includes(req.query.id))
                        console.log('\nwe\'re done\npayment-plans')

                        // save for next time
                        // seems we can't replace only part of the text (for now), so we need the whole thing first, update, and replace whole file (this is easier)
                        fs.readFile(FLV_OUTPUT_PATH, 'utf8', (err, jsonData1) => { // should we read the buffer when the server is started and just keep it in a variable then send it whenever we're here, instead of reading from fs with every request
                            if (err) {
                                console.error('Err 1', err); // what do we do here? proceed to fetch from the api
                            } else {
                                // check if we got data from the api call
                                if (endData.length > 0) {
                                    let jsonData2 = JSON.parse(jsonData1)
                                    
                                    jsonData2.payment_plans = endData
                                    jsonData2.last_payment_plan_call = new Date()
    
                                    fs.writeFile(FLV_OUTPUT_PATH, JSON.stringify(jsonData2, null, 4), (err) => {
                                        if (err) {
                                            console.error('other error', err)
                                        } else {
                                            console.log('Saved get app payments api call.');
                                        }
                                    });
                                }

                   
                            }
                        
                        })

                        
                        resolve(endData);
                    } else {
                        console.error('Failed to get all payment plans')
                        reject('Failed to get all payment plans') // throw new Error('failed')
                    }
                } catch (error) {
                    console.error('caught error getting all payment plans', error)
                    // ususal error:
                    /* getData is <html>
                    <head><title>502 Bad Gateway</title></head>
                    <body>
                    <center><h1>502 Bad Gateway</h1></center>
                    <hr><center>nginx</center>
                    </body>
                    </html> */
                    reject(error)
                }
            });

        }).on("error", (err) => {
            console.log("Error: ", err, err.message);
            // return err
            reject(err);
        }).end();


        fs.readFile(FLV_OUTPUT_PATH, 'utf8', (err, jsonData) => { // should we read the buffer when the server is started and just keep it in a variable then send it whenever we're here, instead of reading from fs with every request
            if (err) {
                console.error('Err 1', err); // what do we do here? proceed to fetch from the api
                call(1)
            } else {
                try { // try-catch because when starting jsonData.last_payment_plan_call will be an empty string, don't want an if check
                    jsonData = JSON.parse(jsonData)
                    const hourDifference = formatDistanceToNowStrict(new Date(jsonData.last_payment_plan_call), {
                        unit: 'hour',
                    })
                    let _diff = parseInt(hourDifference.replace( /\D/g, ''))

                    if (Number.isNaN(_diff) || _diff > 24) { // https://stackoverflow.com/a/51405252/9259701
                        call(1); // first call, get first page_number
                    } else {
                        
                        resolve(jsonData.payment_plans);
                    }
                } catch (error) {
                    console.error('oh wow payment plans', error)
                    call(1)
                }
           
            }

        })
        
        
        
    }).catch((err) => {
        console.error('err calling get all payment plans', err)
    })
}