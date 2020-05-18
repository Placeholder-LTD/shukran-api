let router = require('express').Router();
let UserController = require('../controller/UserController');
let transactionController = require('../controller/TransactionController')
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});

// List out all creators so people can tip them & logn have the same endpoint.
// To consume the url is: http://localhost:8000/api/user
// Contains update profile, get all creators and login.
router.route('/user')
    .get(UserController.getAllCreators)
    .post(UserController.Login)
    .put(UserController.updateProfile);

// Find username so that no two people can have the same
// to consume use the url http://localhost:8000/api/user/findusername
router.route('/user/findusername')
    .get(UserController.findUsername)

// Signup
// To consume use the url http://localhost:8000/api/user/signup
router.route('/user/signup')
    .post(UserController.Signup)

// Transactions sections
router.route('/transactions')
    .post(transactionController.createTransactions)
    .get(transactionController.findMyTransactions)


router.route('/alltransactions')
    .get(transactionController.findAllTransactions)

// Export API routes
module.exports = router;