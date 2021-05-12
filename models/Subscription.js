const mongoose = require('mongoose')

const SubscriptionSchema = mongoose.Schema({
    id: { type: Number }, // most important, the subscription plan id
    name: { type: String }, // "the akhlm postman plan 2",
    amount: { type: Number },
    interval: { type: String }, // should be "monthly",
    duration: { type: Number }, // 12, // 1 year
    status: { type: String }, // should be "active",
    currency: { type: String }, // "NGN",
    plan_token: { type: String }, // "rpp_12d2ef3d5ac1c13b9d30",
    created_at: { type: String }, // "2020-01-16T18:08:19.000Z"
    supporter_email: { type: String },
    creator_id: { type: String }, // foreign key, another most important too
})

module.exports = mongoose.model('Subscription', SubscriptionSchema)