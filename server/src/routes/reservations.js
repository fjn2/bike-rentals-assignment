const express = require('express')
const router = express.Router()
const { apiResponseSucess } = require('./utils')
const reservationSvc = require('../services/reservationSvc')
const { securityMiddleware } = require('./security')

const reservationSvcInstance = new reservationSvc()

router.use(securityMiddleware('user'))

router.get('/', async (req, res) => {
  const {
    data,
    meta
  } = await reservationSvcInstance.getList({}, {})
  
  res.send(apiResponseSucess({
    data,
    meta,
    status: 200
  }))
})

router.post('/', async (req, res) => {
  // create reservation
})

router.delete('/', async (req, res) => {
  // cancel reservation
})


module.exports = router
