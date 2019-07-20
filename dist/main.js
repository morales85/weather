const renderer = new Renderer()
const tempmanager = new TempManager()


let loadPage = async function() {
    await tempmanager.getDataFromDB()
    renderer.render(tempmanager.cityData)
}

let handleSearch = async function(){
let weatherInput = $('.weather-input').val()
await tempmanager.getCityData(weatherInput)
renderer.render(tempmanager.cityData)
}



