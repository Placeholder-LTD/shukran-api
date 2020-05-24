// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
})

require('dotenv').config()
var cors = require('cors')
fastify.use(cors())
fastify.options('*', (request, reply) => { reply.send() })
const mongoose = require('mongoose')


const routes = require('./routes')
routes.forEach((route, index) => {
  fastify.route(route)
})  


var db = process.env.MONGODB_URL


mongoose.connect(db)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err))
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