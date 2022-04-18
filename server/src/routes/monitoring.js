const express = require('express')
const router = express.Router()
const { getInstance } = require('../db')

router.get('/', async (req, res) => {
  res.send(getInstance().getAllData())
})

module.exports = router
