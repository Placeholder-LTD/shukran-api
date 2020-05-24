// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
})
//const cors = require('cors')
require('dotenv').config()


var db = process.env.MONGODB_URL
var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: 'https:shukran.netlify.app'}));

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