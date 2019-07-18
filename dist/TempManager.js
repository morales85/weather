class TempManager {
    constructor() {
        this.cityData = []
    }

getDataFromDB(){
    $.get('/cities'), function(city){
        if(city){
this.cityData = city
    }}
}

async getCityData(cityName){
    let city = await $.get(`/city/:${cityName}`)
    this.cityData.push(city)
}}


