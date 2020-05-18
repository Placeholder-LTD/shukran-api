// Import express
let express = require('express')
let cors = require('cors')
// Initialize the app
let app = express();
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());
app.use(cors())

// Connect to Mongoose and set connection variable
// Deprecated: mongoose.connect('mongodb://localhost/shukran');
mongoose.connect('mongodb://localhost/shukran', { useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Import routes
let apiRoutes = require("./routes/route")
// Use Api routes in the App
app.use('/api', apiRoutes)
// Setup server port
var port = process.env.PORT || 8000;
// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));
// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running Shukran on port " + port);
});