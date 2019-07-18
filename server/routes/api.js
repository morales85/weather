const express = require('express')
const request = require('request')
const City = require('../model/City')
const router = express.Router()


router.get('/city/:cityName', function(req, res){
    let cityName = req.params.cityName
    request(`http://api.apixu.com/v1/current.json?key=6f7b00dbd3454f8fa1332803191807&q=${cityName}`, { json: true }, (err, respond, body) => {
    const cityInfo = body
    let newCity = new City({
        name: cityInfo.location.name, 
        updatedAt: cityInfo.current.last_updated, 
        temperature: cityInfo.current.temp_c,
        condition: cityInfo.current.condition.text,
        conditionPic: cityInfo.current.condition.icon,
    })
    // console.log(newCity)
    res.send(newCity)

    })
})

router.get('/cities', function(req, res){
        City.find({}, function (err, cities) {
            res.send(cities)
        })
    res.end()
})

router.post('/city', function (req, res) {
    let city = req.body 
    // console.log(req.body)
    let newCity = new City({
        name: city.name, 
        updatedAt: city.updatedAt, 
        temperature: city.temperature,
        condition: city.condition,
        conditionPic: city.conditionPic,
    })
    console.log(city)
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