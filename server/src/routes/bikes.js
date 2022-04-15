const express = require('express')
const router = express.Router()
const { apiResponseSucess } = require('./utils')
const bikeSvc = require('../services/bikeSvc')
const bikeReservationSvc = require('../services/bikeReservationSvc')
const utils = require('../services/utils')

const bikeSvcInstance = new bikeSvc()
const bikeReservationSvcInstance = new bikeReservationSvc()

router.get('/', async (req, res) => {
  const filters = bikeSvcInstance.formatFilters(req.query)
  const pagination = utils.formatPagination(req.query)

  const {
    data,
    meta
  } = await bikeSvcInstance.getList(filters, pagination)
  
  res.send(apiResponseSucess({
    data,
    meta,
    status: 200
  }))
})

router.get('/with-reservations', async (req, res) => {
  const filters = bikeReservationSvcInstance.formatFilters(req.query)
  const pagination = utils.formatPagination(req.query)

  const {
    data,
    meta
  } = await bikeReservationSvcInstance.getList(filters, pagination)
  
  res.send(apiResponseSucess({
    data,
    meta,
    status: 200
  }))
})

module.exports = router
