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


$('.cities').on('click', '#save', function(){
    let cityName = $(this).closest('.cityData').find('.name').text()
    console.log(cityName)
    tempmanager.saveCity(cityName)
    loadPage()
})

$('.cities').on('click', '#delete', function(){
    let cityName = $(this).closest('.cityData').find('.name').text()
    console.log(cityName)
    tempmanager.removeCity(cityName)
    loadPage()
})

loadPage()