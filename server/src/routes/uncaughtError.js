const express = require('express')
const router = express.Router()
const { apiResponseError } = require('./utils')

router.use(function(err, req, res, next) {
  console.error(err)
  res.status(500).json(apiResponseError({
    errors: ['Unexpected error'],
    status: 500
  }))
});

module.exports = router
