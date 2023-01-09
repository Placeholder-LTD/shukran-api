const fastify = require('./web/app'); // Fastify

// Run the server!
fastify.listen(process.env.PORT || 3000, function (err, address) {
  if (err) {
    fastify.log.error('ERR starting server', err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`) // or ${fastify.server.address().port}
})


// fastify.listen(process.env.PORT || 3000).then((e) => {
//   fastify.log.info(`server listening on ${fastify.server.address().port}`)
// }, (err) => {
//   fastify.log.error('ERR starting server', err)
// }).catch((err) => {
//   fastify.log.error(err)
//   process.exit(1) // really ??
// })
