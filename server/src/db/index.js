const SUPPORTED_DBS = {
  IN_MEMORY: 'memory'
}

let dbInstance

const db = async (config) => {
  if (!SUPPORTED_DBS[config.dbType]) {
    throw new Error(`The type "${config.dbType}" is not supported`)
  }
  dbInstance = require(`./${SUPPORTED_DBS[config.dbType]}/db`)({
    withMockedData: config.withMockedData
  })
  
}

const getInstance = () => {
  return dbInstance
}

module.exports = {
  db,
  SUPPORTED_DBS,
  getInstance
}