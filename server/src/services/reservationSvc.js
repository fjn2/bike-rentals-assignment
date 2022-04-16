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
  this.createReservation = async (data) => {
    const resp = await getInstance().create(RESOURCE_NAME, data)
    return {
      data: resp
    }
  }
  return this
}


module.exports = reservationSvc