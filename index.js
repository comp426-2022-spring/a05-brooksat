// require Express.js
const express = require('express')
const app = express()
// require morgan
const morgan = require('morgan')
// require fs
const fs = require('fs')
// require database script file
const logdb = require('./src/services/database.js')

const helper = require('./src/utils/utilities.js')
// Make express use its own built-in body parser
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const cors = require('cors')
// take an arbitrary port number as a command line argument 
// Default: 5000
const args = require('minimist')(process.argv.slice(2))

const port = args.port || process.env.PORT || 5000

const help = (`
server.js [options]

--port	Set the port number for the server to listen on. Must be an integer
            between 1 and 65535.

--debug	If set to true, creates endlpoints /app/log/access/ which returns
            a JSON access log from the database and /app/error which throws 
            an error with the message "Error test successful." Defaults to 
            false.

--log		If set to false, no log files are written. Defaults to true.
            Logs are always written to database.

--help	Return this message and exit.
`)

if(args.help || args.h) {
  console.log(help)
  process.exit(0)
}

if(args.log == 'false') {
  console.log("dont create log")
} else {
    const accesslog = fs.createWriteStream('access.log', { flags: 'a'})
    app.use(morgan('combined', {stream: accesslog}))
}

app.use(cors())
// server static HTML files
app.use(express.static('./public'))
// Allow JSON body messages on all endpoints
app.use(express.json())
// Allow URL encoded body messages on all endpoints
app.use(express.urlencoded({extended: true }))


// start app server
const server = app.listen(port, () => {
  console.log('App listening on port %PORT%'.replace('%PORT%', port))
})
//Define base endpoint
app.get('/app/', (req, res) => {
    var messages = 'Your API works! (200)'
    res.statusCode=200 //respond with status 200
    res.statusMessage={'message': messages} //respond with status message "OK"
    res.writeHead(res.statusCode, {'Content-Type' : 'text/plain'})
    res.end(res.statusCode + ' ' + res.statusMessage)
})

// unless specified :varaible will be anyinput
app.get('/app/echo/:number',  (req, res) => {
    res.status(200).json({ 'message': req.params.number})
})

// /app/flip/ will be used to tesst single flip without import coin.mjs
app.get('/app/flip/', (req, res) => {
  const flip = helper.coinFlip()
  res.status(200).json({ 'flip': flip})
})
// /app/flips/:number is many flips 
app.get('/app/flips/:number', (req, res) => {
  const flips = helper.coinFlips(req.params.number)
  const tails = helper.countTails(flips)
  const heads = helper.countHeads(flips)
  res.status(200).json({'raw': flips, 'summary': {'heads': heads, 'tails': tails}})
})
// Flip a bunch of coins with one body variable (number)
app.post('/app/flip/coins/', (req, res, next) => {
  const flips = helper.coinFlips(req.body.number)
  const count = helper.countFlips(flips)
  res.status(200).json({"raw":flips,"summary":count})
})

//flip guess

app.get('/app/flip/call/:guess', (req, res) => {
  var guess = req.params.guess
  const game = helper.flipACoin(guess)
  res.status(200).json(game)

})

app.post('/app/flip/call/', (req, res, next) => {
    const game = helper.flipACoin(req.body.text)
    res.status(200).json(game)
})

//Define default endpoint
//default response for any other request
app.use(function(req, res) {
  res.status(404).send('404 NOT FOUND')
})