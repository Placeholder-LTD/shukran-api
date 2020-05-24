// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
})

const cors = require('cors')

fastify.use(cors())
fastify.options('*', cors())
const mongoose = require('mongoose')
const routes = require('./routes')
routes.forEach((route, index) => {
  fastify.route(route)
})  



mongoose.connect('mongodb://theAkomolafe:Holyjesus2016@ds363038.mlab.com:63038/shukrani')
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err))
  // Declare a route
fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
})

  // Run the server!
const start = async () => {
    try {
      await fastify.listen(process.env.PORT || 3000)
      fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
}
start()