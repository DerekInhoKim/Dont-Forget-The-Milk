const express = require('express')
const { port } = require("./config/index")

const app = express()

// app.listen(port, () => {
//   console.log(`Listening on Port ${port}...`)
// })

module.exports = app
