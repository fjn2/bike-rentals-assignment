const routes = require('./routes')
const { db, SUPPORTED_DBS} = require('./db')
const express = require('express')
const app = express()

const PORT = process.env.PORT || 5000

db({
  dbType: 'IN_MEMORY',
  withMockedData: true
})

routes(app)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
