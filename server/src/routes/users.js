const express = require('express')
const router = express.Router()
const { apiResponseSucess } = require('./utils')
const userSvc = require('../services/userSvc')
const utils = require('../services/utils')
const securitySvc = require('../services/securitySvc')

const userSvcInstance = new userSvc()
const securitySvcInstance = new securitySvc()

router.get('/', async (req, res) => {
  const {
    data,
    meta
  } = await userSvcInstance.getList({}, {})
  
  res.send(apiResponseSucess({
    data,
    meta,
    status: 200
  }))
})

router.post('/', async (req, res) => {
  // create user
})

router.put('/', async (req, res) => {
  // update user (the rol)
})

router.put('/password', async (req, res) => {
  // create user
})
router.post('/login', async (req, res, next) => {
  const resp = await userSvcInstance.getList({
    username: req.body.username,
    password: req.body.password // TODO: encrypt password
  }, {})
  
  if (resp.data.length === 1) {
    const token = await securitySvcInstance.grant(resp.data[0].id)
    res.send({
      data: token,
      status: 200
    })
    return
  } else {
    if (resp.data.length === 0) {
      next(new Error('INVALID_CREDENTIALS'))
    } else {
      next(new Error('MULTIPLE_USERS')) // more than one user has the same credentials
    }
  }
  
})

module.exports = router
