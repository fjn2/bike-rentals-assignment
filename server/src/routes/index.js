const bodyParser = require('body-parser')
const cors = require('cors');
const bikes = require('./bikes')
const reservations = require('./reservations')
const users = require('./users')
const monitoring = require('./monitoring')
const uncaughtError = require('./uncaughtError')

const routes = (app) => {
  app.use(bodyParser.json())
  app.use(cors());

  app.use('/bikes', bikes)
  app.use('/reservations', reservations)
  app.use('/users', users)
  app.use('/monitoring', monitoring)

  app.use(uncaughtError)
}

module.exports = routes