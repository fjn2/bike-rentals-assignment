const securitySvc = require('../services/securitySvc')
const userSvc = require('../services/userSvc')

const securitySvcInstance = new securitySvc()
const userSvcInstance = new userSvc()

/**
 * 
 * @param {string} securityLevel "manager" or "user"
 */
const securityMiddleware = (securityLevel) => (req, res, next) => {
  securitySvcInstance.isValid(req.header.authentication).then((userId) => {
    if (!userId) {
      next('NOT_LOGGED_IN')
      return
    }
    if (securityLevel === 'manager') {
      userSvc.getById(userId).then((user) => {
        if (user.rol !== 'manager') {
          next('NOT_ACCESS')
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