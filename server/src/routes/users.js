const express = require('express')
const router = express.Router()
const { apiResponseSucess } = require('./utils')
const userSvc = require('../services/userSvc')
const utils = require('../services/utils')
const securitySvc = require('../services/securitySvc')
const { securityMiddleware } = require('./security')

const userSvcInstance = new userSvc()
const securitySvcInstance = new securitySvc()

const DEFAULT_PASSWORD = 'password'

router.get('/', securityMiddleware('manager'))
router.get('/', async (req, res) => {
  const pagination = utils.formatPagination(req.query)
  const {
    data,
    meta
  } = await userSvcInstance.getList({}, pagination)
  
  res.send(apiResponseSucess({
    data,
    meta,
    status: 200
  }))
})

router.post('/', async (req, res) => {
  const userListResp = await userSvcInstance.getList({
    username: { operation: 'like', value: req.body.username }
  }, {})

  if (userListResp.meta.total > 0) {
    res.status(400).send({
      errors: ['User already exists'],
      status: 400
    })
    return
  }

  const resp = await userSvcInstance.create({
    ...req.body
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

router.post('/register', async (req, res) => {
  const userListResp = await userSvcInstance.getList({
    username: { operation: 'like', value: req.body.username }
  }, {})

  if (userListResp.meta.total > 0) {
    res.status(400).send({
      errors: ['User already exists'],
      status: 400
    })
    return
  }

  const resp = await userSvcInstance.create({
    username: req.body.username,
    password: DEFAULT_PASSWORD,
    rol: 'user'
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

router.put('/', async (req, res) => {
  const user = await userSvcInstance.getById(req.body.id)

  if (!user) {
    res.status(404).send({
      errors: ['The user does not exists'],
      status: 404
    })
    return
  }

  const formattedBody = {
    ...user, // to preserve the password
    username: req.body.username,
    rol: req.body.rol
  }

  const newUser = await userSvcInstance.updateById(req.body.id, formattedBody)
  if (newUser) {
    res.status(200).send({
      data: newUser,
      status: 200
    })
    return
  }
  next('UNEXPECTED_NOT_UPDATED')
})

router.put('/password', async (req, res) => {
  // create user
})


router.delete('/:userId', async (req, res, next) => {
  if (!req.params.userId) {
    res.status(400).send({
      errors: ['The "userId" is missing'],
      status: 400
    })
    return  
  }

  const user = await userSvcInstance.getById(req.params.userId)
  if (!user) {
    res.status(404).send({
      errors: ['The user does not exists'],
      status: 404
    })
    return
  }

  const isDeleted = await userSvcInstance.deleteById(req.params.userId)
  if (isDeleted) {
    res.status(200).send({
      data: isDeleted,
      status: 200
    })
    return
  }

  next('UNEXPECTED_NOT_DELETED')
})


router.post('/login', async (req, res, next) => {
  const resp = await userSvcInstance.getList({
    username: req.body.username,
    password: req.body.password // TODO: encrypt password
  }, {})
  
  if (resp.data.length === 1) {
    const token = await securitySvcInstance.grant(resp.data[0].id)
    res.send({
      data: {
        token,
        user: resp.data[0]
      },
      status: 200
    })
    return
  } else {
    if (resp.data.length === 0) {
      res.status(401).send({
        errors: ['Invalid Credentials'],
        status: 401
      })
    } else {
      next(new Error('MULTIPLE_USERS')) // more than one user has the same credentials
    }
  }
  
})

router.post('/logout', async (req, res) => {
  const tokenExists = await securitySvcInstance.revoke(req.body.token)
  res.send({
    data: tokenExists,
    status: 200
  })
})

module.exports = router
