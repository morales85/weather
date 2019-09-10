const express = require('express')
const router = express.Router()
const City = require('../model/City')
const request = require('request')
const moment = require('moment')






router.get('/city/:cityName', function(req, res){
    let cityName = req.params.cityName
    request(`http://api.apixu.com/v1/current.json?key=6f7b00dbd3454f8fa1332803191807&q=${cityName}`, function(err, respond, body) {
    let cityInfo = JSON.parse(body || "{}")
    if(cityInfo.location){
        let updatedAt = moment(cityInfo.current.last_updated, 'YYYY-MM-DD HH:mm.sss').format('DD.MM.YYYY HH:mm')
    let newCity = new City({
        name: cityInfo.location.name, 
        updatedAt: updatedAt, 
        temperature: cityInfo.current.temp_c,
        condition: cityInfo.current.condition.text,
        conditionPic: cityInfo.current.condition.icon,
    })
    newCity.updatedAt = moment(newCity.updatedAt, 'YYYY-MM-DD HH:mm.sss').format('DD.MM.YYYY HH:mm')
    res.send(newCity)
} else {
    res.send("no city was found")
}
    })
})

router.get('/cities', function(req, res){
        City.find({}).exec(function(err, data) {
            res.send(data)
        })
})

router.post('/city', function (req, res) {
    let city = req.body 
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