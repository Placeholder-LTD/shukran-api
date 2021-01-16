require('dotenv').config()
// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true,
  ignoreTrailingSlash: true
})
const cors = require('cors')
// use it before all route definitions
fastify.use(cors({
  // Configures the Access-Control-Allow-Origin CORS header.
  origin: ["http://localhost:8080", "https://useshukran.com", "https://shukranstaging.netlify.app"],
  credentials: true, // Configures the Access-Control-Allow-Credentials CORS header
  exposedHeaders: ['Set-Cookie'],
  allowedHeaders: ['Content-Type']
}));
fastify.register(require('fastify-cookie'), {
  secret: process.env.SECRET_KEY, // for cookies signature
  parseOptions: {} // options for parsing cookies
})

const db = process.env.ATLAS_CONNECTION_STRING
const ggle = require('./helpers/uploadgdrive');
fastify.register(require('fastify-multipart'))

const hoss = require('hoss');
  
// At the beginning of your code, run the following for instrumentation
hoss("development-5hDQ8UQHeP29JrBTtZT16T2ef45sQwuL7UFR1FnpfoPt");
let fs = require('fs');
const mongoose = require('mongoose')
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
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
                  // should we exit or halt or sth after here... ?
                  // return // ?
              }
          });
        }
      })
    })
  }, 3600 * 1000 * 12) // run back up every 12 hrs, cause AWS sth sth policy


})
.catch(err => console.log(err))

const routes = require('./routes')
routes.forEach((route, index) => {
  fastify.route(route)
})

// Declare index route
fastify.get('/', (request, reply) => {

    let cookieDomain = 'shukran-api.herokuapp.com', cookieSecure = true;

    if (request.hostname.match(/localhost:[0-9]{4,}/g)) { // if localhost
      cookieSecure = false
      cookieDomain = 'localhost:8080'
    } else if (request.hostname.match(/shukran-staging-api.herokuapp.com/g)) {
      cookieDomain = 'shukran-staging-api.herokuapp.app' // .app because that's what netify defaults redirect to from .com
    }

    reply
    .setCookie('--shukran', '#BeCreative.#Create.', {
      // path: '/',
      httpOnly: true,
      domain: cookieDomain,
      maxAge: 15 * 1000 * 1000, // not expires
      sameSite: 'strict',
      secure: cookieSecure,
      signed: true
    })
    .code(200)
    .send('Hey there. A creator? Checkout https://useshukran.com')
})

// Run the server!
const start = async () => {
    try {
      await fastify.listen(process.env.PORT || 3000,  '0.0.0.0')
      fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1) // really ??
    }
}
start()
