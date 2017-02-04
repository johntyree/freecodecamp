
function updateForecast(lat, lon) {
  var url = "https://crossorigin.me/" +                                             "https://api.darksky.net/forecast/" +
            "9f481c54fa08e1cdd930c7b9fefd1d41/" +
            lat + "%2C" + lon;
  var params = {
    units: 'us',
    exclude: 'minutely,hourly,daily,alerts,flags'
  };
  $.getJSON(url, params)
    .done(function(json) {
      var tempF = Math.round(json.currently.temperature);
      var tempC = Math.round((tempF - 32) * 5 / 9);
      $('#tempC').html(tempC);
      $('#tempF').html(tempF);
      $('#description').html(json.currently.summary);
      var iconDesc = json.currently.icon.toUpperCase().replace(/-/g, '_');
      iconDesc = iconDesc === 'HAIL' ? 'SLEET' : iconDesc;
      var icon = new Skycons({color: '#FFFFFF'});
      console.log(iconDesc);
      icon.add('icon', Skycons[iconDesc]);
      icon.play();
    })
    .fail(function(e) {
      console.error(e);
    });
}

function updateCity(lat, lon) {
  var url = "https://maps.googleapis.com/maps/api/geocode/json";
  var params = {
    latlng: lat + "," + lon,
    sensor: true
  };
  $.getJSON(url, params)
    .done(function(json) {
      json.results[0].address_components.forEach(function(comp) {
        if (comp.types.includes('country')) {
          $('#country').html(comp.short_name);
        } else if (comp.types.includes('administrative_area_level_1')) {
          $('#state').html(comp.short_name);
        } else if (comp.types.includes('sublocality_level_1')) {
          $('#state').html(comp.long_name);
        }
      });
    })
    .fail(function(e) {
      console.error(e);
    });
}

$(document).ready(function() {
      var O = new Skycons({color: '#FFFFFF'});
      O.add('O', Skycons.CLOUDY);
      O.play();
  $('#units').click(function() {
    if ($(this).html() === 'C') {
      $('#tempC').attr('hidden', true);
      $('#tempF').attr('hidden', false);
      $(this).html('F');
    } else {
      $('#tempF').attr('hidden', true);
      $('#tempC').attr('hidden', false);
      $(this).html('C');
    }
  });
  navigator.geolocation.getCurrentPosition(function(pos) {
    updateCity(pos.coords.latitude, pos.coords.longitude);
    updateForecast(pos.coords.latitude, pos.coords.longitude);
  });
});
