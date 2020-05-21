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
exports.AllTransactions = async (req, reply) => {
    try {
        var trans = Trans.find()
        return trans
    } catch (error) {
        throw boom.boomify(error)
    }
}
 exports.findAllMyTransaction = async (req, reply) => {
    try {
        var username = req.body.username
        var status = req.body.status
        var trans = Trans.find({
            $and: [
                {'username': username, 'status': status}
            ]
        })
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
exports.updateTransaction = async (req, reply) => {
    try {
      const id = req.body.id
      const transaction = req.body
      const { ...updateData } = transaction
      const update = await Trans.findByIdAndUpdate(id, updateData, { new: true })
      return update
    } catch (err) {
      throw boom.boomify(err)
    }
}