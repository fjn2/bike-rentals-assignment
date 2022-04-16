const securitySvc = require('../services/securitySvc')
const userSvc = require('../services/userSvc')

const securitySvcInstance = new securitySvc()

/**
 * 
 * @param {string} securityLevel "manager" or "user"
 */
const securityMiddleware = (securityLevel) => (req, res, next) => {
  securitySvcInstance.isValid(req.headers.authentication).then((userId) => {
    if (!userId) {
      res.status(401).send({
        errors: ['Access not allowed'],
        status: 401
      })
      return
    }
    if (securityLevel === 'manager') {
      userSvc.getById(userId).then((user) => {
        if (user.rol !== 'manager') {
          res.status(401).send({
            errors: ['You have to be manager to access this'],
            status: 401
          })
          return
        }
        next()
      })
    } else {
      next()
    }
  })
}

module.exports = {
  securityMiddleware
}