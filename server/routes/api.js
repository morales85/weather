const express = require('express')
const router = express.Router()
const City = require('../model/City')
const request = require('request')


router.get('/city/:cityName', function(req, res){
    let cityName = req.params.cityName
    request(`http://api.apixu.com/v1/current.json?key=6f7b00dbd3454f8fa1332803191807&q=${cityName}`, function(err, respond, body) {
    let cityInfo = JSON.parse(body || "{}")
    let newCity = new City({
        name: cityInfo.location.name, 
        updatedAt: cityInfo.current.last_updated, 
        temperature: cityInfo.current.temp_c,
        condition: cityInfo.current.condition.text,
        conditionPic: cityInfo.current.condition.icon,
    })
    console.log(newCity)
    res.send(newCity)

    })
})

router.get('/cities', function(req, res){
        City.find({}).exec(function(err, data) {
            res.send(data)
        })
})

router.post('/city', function (req, res) {
    let cities = req.body 
    // console.log(req.body)
    let newCity = new City({
        name: city.name, 
        updatedAt: city.updatedAt, 
        temperature: city.temperature,
        condition: city.condition,
        conditionPic: city.conditionPic,
    })
    console.log(cities)
    newCity.save()
        res.end()

})

router.delete('/city/:cityName', function(req, res){
    let cityName = req.params.cityName
    console.log(cityName)
    City.findOne({name: cityName}, function(err, city){
        city.remove(function (err) {
            console.log(err)
        })
    })
    res.end()
})




module.exports = router