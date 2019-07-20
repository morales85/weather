const express = require('express')
const app = express()
const moment = require('moment')
const path = require('path')
const api = require('./server/routes/api')
const bodyParser = require('body-parser')
const router = express.Router()
const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/weather", { useNewUrlParser: true })

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname,  'node_modules')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', api)

app.get('/sanity', function (req, res) {
    res.send("OK")
})



app.listen(3000, function () {
    console.log("Server running on 3000")
}) 