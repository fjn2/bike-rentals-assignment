const { getInstance } = require('../db')

const RESOURCE_NAME = 'reservations'

const reservationSvc = function() {
  this.getList = async (filters, pagination) => {
    const resp = await getInstance().getList(RESOURCE_NAME, filters, pagination)
    
    return {
      data: resp.data,
      meta: resp.meta
    }
  }

  return this
}


module.exports = reservationSvc