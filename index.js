// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
})
// const cors = require('cors')
require('dotenv').config()


var db = process.env.MONGODB_URL

//fastify.use(cors())
fastify.use('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "https://shukran.netlify.app"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

const mongoose = require('mongoose') 

mongoose.connect(db)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err))
const routes = require('./routes')
routes.forEach((route, index) => {
  fastify.route(route)
}) 
  // Declare a route
fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
})

  // Run the server!
const start = async () => {
    try {
      await fastify.listen(process.env.PORT || 3000,  '0.0.0.0')
      fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
}
start()