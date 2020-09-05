const mongoose = require('mongoose')

const SubscriptionSchema = mongoose.Schema({
    id: Number, // most important, the subscription plan id
    name: String, // "the akhlm postman plan 2",
    amount: Number,
    interval: String, // should be "monthly",
    duration: Number, // 12, // 1 year
    status: String, // should be "active",
    currency: String, // "NGN",
    plan_token: String, // "rpp_12d2ef3d5ac1c13b9d30",
    created_at: String, // "2020-01-16T18:08:19.000Z"
    supporter_email: String,
    creator_id: String, // foreign key, another most important too
})

module.exports = mongoose.model('Subscription', SubscriptionSchema)