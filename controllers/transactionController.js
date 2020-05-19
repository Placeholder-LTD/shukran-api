const boom = require('boom')

const Trans =  require('../models/Transactions')

exports.createTransaction = async (req, reply) => {
    try {
         const transaction = new Trans(req.body)
         return transaction.save() 
    } catch (err) {
      throw boom.boomify(err)
    }
}

 exports.findAllMyTransaction = async (req, reply) => {
    try {
        var trans = Trans.find({'username': req.body.username})
        return trans  
    } catch (err) {
      throw boom.boomify(err)
    }
},
exports.findOneTransaction = async (req, reply) => {
    try {
        var id = req.body.id
        var mydocu = Trans.findById(id)
        return mydocu
    } catch(err) {
        throw  boom.boomify(err)
    }
}
exports.deleteTransaction = async (req, reply) => {
    try {
        var id = req.body.id
        var transaction = await Trans.findByIdAndRemove(id)
        return transaction
    } catch(err) {
        throw  boom.boomify(err)
    }
}