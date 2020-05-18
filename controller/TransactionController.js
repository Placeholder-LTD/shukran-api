let Transaction = require('../model/Transactions')

exports.createTransactions = async(req, res) => {
    try {
        const transact = new Transaction(req.body)
        return transact.save()
    } catch (error) {
        console.log(error)
        return err
    }
}

exports.findMyTransactions = async(req, res) => {
    try {
        let username = req.body.username
        let transactions = Transaction.find({'username': username})
        return transactions
    } catch (error) {
        console.log(error)
        return err
    }
}

exports.findAllTransactions = async(req, res) => {
    try {
        let transactions = Transaction.find()
        return transactions
    } catch(err){
        console.log(err)
        return err
    }
} 