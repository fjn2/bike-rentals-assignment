const { v4: uuidv4 } = require('uuid');

// TODO implement a non in-memory solution
// TODO add expiration time to the tokens
const tokens = {}

const securitySvc = function() {
  this.grant = async (userId) => {
    const token = uuidv4()
    tokens[userId] = token
    return token
  }

  this.isValid = async (token) => {
    return Object.keys(tokens).find(key => tokens[key] === token)
  }

  this.revoke = async (token) => {
    const userToLogout = Object.keys(tokens).find(key => tokens[key] === token)
    const tokenExists = !!tokens[userToLogout]
    delete tokens[userToLogout]
    return tokenExists
  }

  return this
}

module.exports = securitySvc