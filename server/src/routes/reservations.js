const express = require('express')
const router = express.Router()
const { apiResponseSucess } = require('./utils')
const reservationSvc = require('../services/reservationSvc')
const { securityMiddleware } = require('./security')
const utils = require('../services/utils')

const reservationSvcInstance = new reservationSvc()

router.use(securityMiddleware('user'))

router.get('/', async (req, res) => {
  const filters = reservationSvcInstance.formatFilters(req.query)
  const pagination = utils.formatPagination(req.query)
  // TODO validate that the managers are the only one to check for other users
  const {
    data,
    meta
  } = await reservationSvcInstance.getList(filters, pagination)
  
  res.send(apiResponseSucess({
    data,
    meta,
    status: 200
  }))
})

router.post('/', async (req, res, next) => {
  // create reservation

  // validate fields
  const errors = reservationSvcInstance.validate(req.body)

  if (errors) {
    res.status(400).send({
      errors,
      status: 400
    })
    return
  }

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

router.put('/', async (req, res, next) => {
  // update reservation
  const reservation = await reservationSvcInstance.getById(req.body.id)

  if (!reservation) {
    res.status(404).send({
      errors: ['The reservation does not exists'],
      status: 404
    })
    return
  }

  const formattedBody = {
    id: req.body.id,
    userId: req.body.user.id,
    bikeId: req.body.bike.id,
    from: req.body.from,
    days: req.body.days,
    rating: req.body.rating
  }

  // rating logic
  const operationResultErrors = await reservationSvcInstance.rateReservation(reservation, formattedBody)
  if (operationResultErrors) {
    res.status(500).send({
      errors: operationResultErrors,
      status: 500
    })
    return
  }

  const newReservation = await reservationSvcInstance.updateById(req.body.id, formattedBody)
  if (newReservation) {
    res.status(200).send({
      data: newReservation,
      status: 200
    })
    return
  }
  next('UNEXPECTED_NOT_UPDATED')
})

router.delete('/:reservationId', async (req, res, next) => {
  // TODO check that the reservation belows to the logged user
  // cancel reservation
  if (!req.params.reservationId) {
    res.status(400).send({
      errors: ['The "reservationId" is missing'],
      status: 400
    })
    return  
  }
  const reservation = await reservationSvcInstance.getById(req.params.reservationId)
  if (!reservation) {
    res.status(404).send({
      errors: ['The reservation does not exists'],
      status: 404
    })
    return
  }

  const isDeleted = await reservationSvcInstance.deleteById(req.params.reservationId)
  if (isDeleted) {
    res.status(200).send({
      data: isDeleted,
      status: 200
    })
    return
  }

  next('UNEXPECTED_NOT_DELETED')
})


module.exports = router
