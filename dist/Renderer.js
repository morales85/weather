class Renderer {
    render(cityData) {
        $('.cities').empty()
        const source = $('#city-template').html()
        const template = Handlebars.compile(source)
        const someHTML = template(cityData)
        $('.cities').append(someHTML)
    }

}
