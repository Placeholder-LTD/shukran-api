const fastify = require('./web/app'); // Fastify

// Run the server!
fastify.listen(process.env.PORT || 3000,  '0.0.0.0').then((e) => {
  fastify.log.info(`server listening on ${fastify.server.address().port}`)
}, (err) => {
  fastify.log.error('ERR starting server', err)
}).catch((err) => {
  fastify.log.error(err)
  process.exit(1) // really ??
})
