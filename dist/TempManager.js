class TempManager {
    constructor() {
        this.cityData = []
    }

async getDataFromDB(){
    let data = await $.get('/cities')
    this.cityData = data
}

async getCityData(cityName){
    let data = await $.get(`/city/:${cityName}`)
    this.cityData.push(data)
    }


saveCity(cityName) {
    for (let city of this.cityData) {
        if (city.name == cityName) {
            alert(cityName + ' was added to your favourites')
            $.post('/city', city)
        }
    }
}

removeCity(cityName){
    $.ajax({
        method: "DELETE",
        url: `/city/${cityName}`,
        success: function(){
            alert(cityName + ' was removed from your favourites')

        }
    })
}


}