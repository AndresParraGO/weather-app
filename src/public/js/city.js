const city = location.pathname.substr(6, location.pathname.length - 1)

$('#city-data').html('<img src="/assets/loading.gif" class="icon-loading" />')

function changeCityBg(type) {
  document.body.className = `bg-${type}`
}

function kelvinToCelcius(tempKelvin) {
  return parseInt(tempKelvin - 273.15)
}

function renderErrorCity() {
  $('#city-data').html(`
    <p>❌ Ciudad no encontrada</p>
    <a href="/">Volver al inicio</a>
  `)
}

function getDataOfCity(city) {
  $.ajax({
    url: `/api/city/${city}`,
    success: function(data) {
      if(data.cod === "404") {
        renderErrorCity()
      } else {
        renderData(data)
        renderMap(data.coord.lon, data.coord.lat)
      }
    },
    error: function(err) {
      renderErrorCity()
    }
  })
}


function renderData(data) {
  let iconWeather

  switch(data.weather[0].main) {
    case 'Clouds':
      iconWeather = '/assets/clouds.svg'
      changeCityBg('clouds')
      break
    case 'Rain':
      iconWeather = '/assets/rain.svg'
      changeCityBg('rain')
      break
    case 'Snow':
      iconWeather = '/assets/snow.svg'
      changeCityBg('snow')
      break
    case 'Clear':
      iconWeather = '/assets/clear.svg'
      changeCityBg('clear')
      break
  }

  $('#city-data').html(`
    <h3 class="city-temp text-center fs-2">${kelvinToCelcius(data.main.temp)}°C</h3>
    <h4 class="city-title text-center fs-6 mb-4">${data.name} / ${data.sys.country}</h4>
    <img class="animate__animated animate__bounce city-icon-weather d-block" src=${iconWeather} alt=${data.weather[0].main} />
    <p class="text-center">${data.weather[0].description}</p>
    <div class="row pt-4">
      <div class="text-center col-6">
        <img title="Velocidad del viento" class="me-3 icon-info icon-wind" src="/assets/wind.svg" />
        <span>${data.wind.speed} m/s</span>
      </div>
      <div class="text-center col-6">
        <img title="Porcentaje de nubes en el cielo" class="me-3 icon-info icon-clouds" src="/assets/clouds-counts.svg" />
        <span>${data.clouds.all}%</span>
      </div>
    </div>
  `)
}


// Map

function renderMap(lon, lat) {
  const map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([lon, lat]),
      zoom: 10
    })
  })
}


getDataOfCity(city)
