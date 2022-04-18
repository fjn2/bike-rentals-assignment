const express = require('express')
const router = express.Router()
const { apiResponseSucess } = require('./utils')
const bikeSvc = require('../services/bikeSvc')
const bikeReservationSvc = require('../services/bikeReservationSvc')
const utils = require('../services/utils')
const { securityMiddleware } = require('./security')

const bikeSvcInstance = new bikeSvc()
const bikeReservationSvcInstance = new bikeReservationSvc()

router.get('/', securityMiddleware('user'))

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

router.get('/with-reservations', securityMiddleware('user'))
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

router.post('/', async (req, res, next) => {
  const resp = await bikeSvcInstance.create({
    ratingVotes: 0,
    ratingAcum: 0,
    location: {}
  })

  if (resp.id) {
    res.status(201).send({
      data: resp,
      status: 201
    })
  } else {
    next('ENTITY_NOT_CREATED')
  }
})


router.put('/', async (req, res, next) => {
  // update reservation
  const bike = await bikeSvcInstance.getById(req.body.id)

  if (!bike) {
    res.status(404).send({
      errors: ['The bike does not exists'],
      status: 404
    })
    return
  }

  const formattedBody = {
    id: req.body.id,
    model: req.body.model,
    color: req.body.color,
    location: req.body.location,
    // ratingAcoum and ratingVotes are not updated
    ratingAcum: bike.ratingAcum,
    ratingVotes: bike.ratingVotes,
    available: req.body.available
  }

  const newBike = await bikeSvcInstance.updateById(req.body.id, formattedBody)
  if (newBike) {
    res.status(200).send({
      data: newBike,
      status: 200
    })
    return
  }
  next('UNEXPECTED_NOT_UPDATED')
})

router.delete('/:bikeId', async (req, res, next) => {
  if (!req.params.bikeId) {
    res.status(400).send({
      errors: ['The "bikeId" is missing'],
      status: 400
    })
    return  
  }

  const bike = await bikeSvcInstance.getById(req.params.bikeId)
  if (!bike) {
    res.status(404).send({
      errors: ['The bike does not exists'],
      status: 404
    })
    return
  }

  const isDeleted = await bikeSvcInstance.deleteById(req.params.bikeId)
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
