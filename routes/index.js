const userController = require('../controllers/userController')
const transactionController = require('../controllers/transactionController')
const feedbackController = require('../controllers/FeedbackController')
const productController = require('../controllers/ProductsController')
const subscriptionController = require('../controllers/subscriptionController')

// we need to track creators tipping link clicks from external sources
const routes = [
    {
        method: 'POST',
        url: '/api/createaccount/',
        handler: userController.signup
    },
    {
        method: 'GET',
        url: '/api/randomcreators/:number/',
        handler: userController.randomCreators
    },
    {
        method: 'GET',
        url: '/api/allusers/',
        handler: userController.getAll
    },
    {
        method: 'POST',
        url: '/api/followthemoney/',
        handler: transactionController.followTheMoney
    },
    {
        method: 'GET',
        url: '/api/getsubscriptions/',
        handler: subscriptionController.getAllSubscriptions
    },
    {
        method: 'GET',
        url: '/api/getsubscriptions/:creator_id/',
        handler: subscriptionController.getCreatorSubscrptions
    },
    {
        method: 'GET',
        url: '/api/getsubscribers/',
        handler: subscriptionController.getSubscribers
    },
    {
        method: 'GET',
        url: '/api/gettotalrevenue/',
        handler: subscriptionController.getTotalRevenue
    },
    {
        method: 'GET',
        url: '/api/yoursupporters/',
        handler: transactionController.getYourSupporters
    },
    {
        method: 'POST',
        url: '/api/sendmessage/',
        handler: feedbackController.sendMessage
    },
    {
        method: 'POST',
        url: '/api/login/',
        handler: userController.login
    },
    {
        method: 'POST',
        url: '/api/createsubscription/',
        handler: subscriptionController.createSubscription
    },
    {
        method: 'POST',
        url: '/api/myprofile/',
        handler: userController.findMyProfile
    },
    {
        method: 'POST',
        url: '/api/update/',
        handler: userController.updateUser
    },
    {
        method: 'POST',
        url: '/api/createcontent/',
        handler: userController.createContent
    },
    {
        method: 'POST',
        url: '/api/updatecontentmetadata/',
        handler: userController.updateContentMetaData
    },
    {
        method: 'POST',
        url: '/api/updatecontentprice/',
        handler: userController.updateContentPrice
    },
    {
        method: 'POST',
        url: '/api/deletecontent/',
        handler: userController.deleteContent
    },
    {
        method: 'POST',
        url: '/api/createtransaction/',
        handler: transactionController.createTransaction
    },
    {
        method: 'POST',
        url: '/api/requestpayout/',
        handler: transactionController.requestPayout
    },
    {
        method: 'POST',
        url: '/api/resetpassword/',
        handler: userController.resetPassword
    },
    {
        method: 'POST',
        url: '/api/deleteuser/',
        handler: userController.deleteUser
    },
    {
        method: 'GET',
        url: '/api/findone/',
        handler: transactionController.findOneTransaction
    },
    {
        method: 'POST',
        url: '/api/findall/',
        handler: transactionController.findAllMyTransaction
    },
    {
        method: 'GET',
        url: '/api/alltransactions/',
        handler: transactionController.AllTransactions
    },
    {
        method: 'POST',
        url: '/api/deletetransaction/',
        handler: transactionController.deleteTransaction
    },
    {
        method:'POST',
        url: '/api/updatetransaction/',
        handler: transactionController.updateTransaction
    },
    {
        method: 'GET',
        url: '/api/allfeedback/',
        handler: feedbackController.getAll
    },
    {
        method: 'POST',
        url: '/api/givefeedback/',
        handler: feedbackController.newFeedback
    },
    {
        method: 'POST',
        url: '/api/requests/',
        handler: transactionController.findRequested
    },
    {
        method: 'POST',
        url: '/api/createproducts/',
        handler: productController.createProduct
    },
    {
        method: 'POST',
        url: '/api/findmyproducts/',
        handler: productController.findMyProducts
    },
    {
        method: 'POST',
        url: '/api/deleteproduct/',
        handler: productController.deleteProduct
    },
    {
        method: 'POST',
        url: '/api/updateproduct/',
        handler: productController.updateProduct
    }
]

module.exports = routes