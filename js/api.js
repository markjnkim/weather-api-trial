var openWeatherAppId = '51120a1852d3bb845834ebad87c9648e';
var openWeatherUrl = 'http://api.openweathermap.org/data/2.5/forecast';

var prepareData = function(units) {
  var cityName = $('#city-name').val()

  if (cityName && cityName !== "") {
    cityName = cityName.trim()
    getData(openWeatherUrl, cityName, openWeatherAppId, units)
  }
  else {
    alert('Please enter the city name')
  }
}

$(document).ready(function() {
  $('.btn-metric, #celsius, #kmph').click(function() {
    prepareData('metric')
  })
  $('.btn-imperial, #faht, #mph').click(function() {
    prepareData('imperial')
  })
})

function getData(url, cityName, appId, units) {
  var request = $.ajax({
    url: url,
    dataType: "jsonp",
    data: { q: cityName, appid: appId, units: units },
    jsonpCallback: "fetchData",
    type: "GET"
  }).fail(function(error){
    console.error(error)
    alert('Error sending request')
  })
}

function fetchData(forecast) {
  console.log(forecast);
  var html= '',
      cityName = forecast.city.name,
      country = forecast.city.country,
      header='';

    header += '<h3> Weather Forecast for ' + cityName + ', ' + country + '</h3>';
    forecast.list.forEach(function(forecastEntry, index, list) {
      html += '<tr>' + '<td>' + forecastEntry.dt_txt + '</td>' + '<td>' + forecastEntry.main.temp + '</td>' + '<td>' + forecastEntry.wind.speed +'</td>' + '<td>' + forecastEntry.main.humidity +'</td>' + '<td>' + forecastEntry.weather[0].description +'</td>' + '<tr>';
    })

    $('#log').html(html);
    $('#header').html(header);
}