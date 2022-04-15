
const { apiResponseError } = require('./utils')

function router(app) {
  app.use(function(err, req, res, next) {
    console.error(err)
    res.status(500).json(apiResponseError({
      errors: ['Unexpected error'],
      status: 500
    }))
  });
}

module.exports = router