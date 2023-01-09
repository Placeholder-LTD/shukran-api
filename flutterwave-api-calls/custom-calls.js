// maybe do a script/cronjob that'll regularly update out db

// def read: https://stackoverflow.com/questions/46715484/correct-async-function-export-in-node-js
const getAllSubscribers = require('./get-all-subscribers')
const getAllPaymentPlans = require('./get-all-payment-plans')

async function getCreatorShuclans(creator_id) {

    Promise.all([
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

        }).catch((error) => {
            console.error(error)
        });

    /**
     * let plans = await getAllPaymentPlans.getAllPaymentPlans;
        let creatorPlans = plans.filter(plan => plan.name.includes(creator_id || req.query.id))
        let shuklans = await getAllSubscribers.getAllSubscribers;
        let creatorShuklans = shuklans.filter(shuklan => creatorPlans.some(plan => plan.id === shuklan.plan))

        // reply.send(creatorShuklans) // return creatorShuklans
     */

}

async function checkIfSubscriber(creator_id, supporter_email) {

    this.getCreatorShuclans(creator_id)

}

module.exports.getCreatorShuclans = getCreatorShuclans

module.exports.checkIfSubscriber = checkIfSubscriber