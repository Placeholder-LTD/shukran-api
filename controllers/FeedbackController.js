const boom = require('boom')

const Feedback = require('../models/Feedback')

exports.newFeedback = async(req, reply) => {
    try {
        const feed = new Feedback(req.body)
        return feed.save()
    } catch (error) {
        throw boom.boomify(error)
    }
}
exports.getAll = async(req, reply) => {
    try {
        var feed = Feedback.find()
        return feed
    } catch (error) {
        throw boom.boomify(error)
    }
}