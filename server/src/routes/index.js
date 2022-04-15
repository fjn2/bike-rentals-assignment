const bodyParser = require('body-parser')
const bikes = require('./bikes')
const reservations = require('./reservations')
const users = require('./users')
const uncaughtError = require('./uncaughtError')

const routes = (app) => {
  app.use(bodyParser.json())

  app.use('/bikes', bikes)
  app.use('/reservations', reservations)
  app.use('/users', users)
  app.use(uncaughtError)
}

module.exports = routes