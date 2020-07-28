// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
})
const cors = require('cors')
require('dotenv').config()

let db = process.env.MONGODB_URL
const ggle = require('./helpers/uploadgdrive');
fastify.register(require('fastify-multipart'))
// use it before all route definitions
fastify.use(cors({origin: ['https://shukranstaging.netlify.app', 'https://useshukran.com', 'http://localhost:8080']}));

let fs = require('fs');
const mongoose = require('mongoose')
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(function afterConn(db) {
  console.log('MongoDB connected...')

  setInterval(() => {
    let writeStream = fs.createWriteStream('./db-backup.json');
  let all = {}, count = 0;

    db.modelNames().forEach((modelVal, i, arr) => {
      db.model(modelVal).find({}).then(valu => {
        all[modelVal] = valu;
        count++
      }).catch(err => console.log(err)).finally(() => {
        // write the 3rd/last time, after the whole compilation
        if (count === arr.length) {
          writeStream.write(JSON.stringify(all, null, 4))
          // do the upload
          let fileMetadata = {
            'name': `Shukran DB Backup [${new Date().toLocaleString()}].json`,
            parents: ['1LTS9SuWHgiEVSgFapU0rskdOyWY9B9WD'] // upload to folder shukran-db-backup
          };
          let media = {
              mimeType: 'application/json',
              body: fs.createReadStream('./db-backup.json')
          };

          ggle.drive.files.create({
              resource: fileMetadata,
              media: media,
          }, function (err, file) {
              if (err) {
                  // Handle error
                  console.error(err); // make this whole place silent
              } else {
                  console.log('it uploaded');
                  // we should exit or halt or sth after here...
                  // return // ?
                  // process.exit(0) // ?
              }
          });
        }
      })
      
    })
  }, 3600 * 1000 * 24) // run back up every 24 hrs


})
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
