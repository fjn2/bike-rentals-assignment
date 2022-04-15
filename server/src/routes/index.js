const bikes = require('./bikes')
const uncaughtError = require('./uncaughtError')

const routes = (app) => {
  app.use('/bikes', bikes)
  app.use(uncaughtError)
}

module.exports = routes