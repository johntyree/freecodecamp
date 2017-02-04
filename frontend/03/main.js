'use strict';

var updateColor = function() {
  var r = Math.floor(Math.random() * 125) + 35;
  var g = Math.floor(Math.random() * 125) + 35;
  var b = Math.floor(Math.random() * 125) + 35;
  var newColor = "rgb(" + r + "," + g + "," + b + ")";
  console.log(newColor);
  $('.colored').css("color", newColor);
  $('.back-colored').css("background-color", newColor);
};

var requestQuote = function() {
  var data = {
    headers: {
      "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: "https://andruxnet-random-famous-quotes.p.mashape.com/cat=",
    dataType: 'json'
  };
  $.ajax(data)
    .done(function(json) {
      updateColor();
      $('.colored').animate({'opacity': 0}, 500, function() {
      $('#quote').html(json.quote);
      $('#author').html(json.author);
      $('.colored').animate({'opacity': 1}, 500);
      });
    })
    .fail(function(e) {
      console.error("error:", e);
    });
};

$(document).ready(function() {
  $('.quote-button').click(function() {
    requestQuote();
  });
  updateColor();
})
