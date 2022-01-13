require('dotenv').config()
// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true,
  ignoreTrailingSlash: true
})

// use it before all route definitions
const ourAllowedOrigins = ['http://localhost:8080', 'https://useshukran.com', 'https://shukranstaging.netlify.app', 'https://shukran.africa']; // how to allow any place ?
const ourAllowedHeaders = ['Content-Type', 'Set-Cookie', 'Authorization', 'Via', 'Status', 'Last-Modified']; // https://stackoverflow.com/a/39012388/9259701

// const cors = require('cors')

// fastify.use(cors({
//   // Configures the Access-Control-Allow-Origin CORS header.
//   origin: ourAllowedOrigins,
//   credentials: true, // Configures the Access-Control-Allow-Credentials CORS header
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//   exposedHeaders: ['Set-Cookie'], // 
//   allowedHeaders: ourAllowedHeaders
// }));

fastify.register(require('fastify-cookie'), {
  secret: process.env.SECRET_KEY, // for cookies signature
  parseOptions: {} // options for parsing cookies
})

fastify.register(require('fastify-cors'), { 
  // put your options here
   // Configures the Access-Control-Allow-Origin CORS header.
   origin: ourAllowedOrigins,
   credentials: true, // Configures the Access-Control-Allow-Credentials CORS header
   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
   exposedHeaders: ['Set-Cookie'], // 
   allowedHeaders: ourAllowedHeaders
})

const db = process.env.ATLAS_CONNECTION_STRING
const ggle = require('../helpers/uploadgdrive');
fastify.register(require('fastify-multipart'))

const hoss = require('hoss');
  
// At the beginning of your code, run the following for instrumentation
hoss("development-5hDQ8UQHeP29JrBTtZT16T2ef45sQwuL7UFR1FnpfoPt");
let fs = require('fs');
const mongoose = require('mongoose')
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(function afterConn(db) {
  console.log('MongoDB connected...')
})
.catch(err => console.log(err))

const routes = require('../routes')
routes.forEach((route, index) => {
  fastify.route(route)
})

// Declare index route
fastify.get('/', (request, reply) => {

  console.log('\nhave cookies?\n\n', request.cookies);

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
      maxAge: 15 * 1000, // not expires
      sameSite: 'strict',
      secure: cookieSecure,
      signed: true
    })
    .code(200)
    .send('Hey there. A creator? Checkout https://useshukran.com')
})

module.exports = fastify