const userController = require('../controllers/userController')
const transactionController = require('../controllers/transactionController')

const routes = [
    {
        method: 'POST',
        url: '/api/createaccount',
        handler: userController.signup
    },
    {
        method: 'GET',
        url: '/api/allusers',
        handler: userController.getAll
    },
    {
        method: 'POST',
        url: '/api/login',
        handler: userController.login
    },
    {
        method: 'POST',
        url: '/api/myprofile',
        handler: userController.findMyProfile
    },
    {
        method: 'POST',
        url: '/api/update',
        handler: userController.updateUser
    },
    {
        method: 'POST',
        url: '/api/createtransaction',
        handler: transactionController.createTransaction
    },
    {
        method: 'GET',
        url: '/api/findone',
        handler: transactionController.findOneTransaction
    },
    {
        method: 'GET',
        url: '/api/findall',
        handler: transactionController.findAllMyTransaction
    },
    {
        method: 'POST',
        url: '/api/deletedoc',
        handler: transactionController.deleteTransaction
    }
]

module.exports = routes