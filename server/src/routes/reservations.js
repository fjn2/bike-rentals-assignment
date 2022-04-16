const express = require('express')
const router = express.Router()
const { apiResponseSucess } = require('./utils')
const reservationSvc = require('../services/reservationSvc')
const { securityMiddleware } = require('./security')

const reservationSvcInstance = new reservationSvc()

// router.use(securityMiddleware('user'))

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

router.post('/', async (req, res, next) => {
  // create reservation
  const resp = await reservationSvcInstance.createReservation(req.body)

  if (resp.data.id) {
    res.status(201).send({
      data: resp.data,
      status: 201
    })
  } else {
    next('ENTITY_NOT_CREATED')
  }
})

router.delete('/', async (req, res) => {
  // cancel reservation
})


module.exports = router
