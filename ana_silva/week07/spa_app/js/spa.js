//NASA api key 3YbaVdDiFzxEcdO7sVhifTE4P5HyvKwOwCmoSGcJ
//Open_weather api key 10e736b75728b3f6b48e6c10a6afd7e1
//googlemaps apikey  AIzaSyBBBDW1INGd7FRXpuYnkuyGjHjBCYMoGSQ

$(document).ready(function() {

  //Get NASA image of the day
  const imageURL = "https://api.nasa.gov/planetary/apod?api_key=3YbaVdDiFzxEcdO7sVhifTE4P5HyvKwOwCmoSGcJ"

  $.ajax(imageURL).done(function(data){
    image = data.hdurl;
    $('#image').attr('src', image);
  })

  //TRIVIA fact on click!
  const $fetch_trivia = $('#fetch_trivia');

  const getTrivia = function(){
    const url = 'http://numbersapi.com/random/trivia';
    $.ajax(url).done(function(data){
      console.log(data);
      $('#trivia').text(data);
    });
  }
  $fetch_trivia.on('click', getTrivia);
  getTrivia();


  //what will need update every 5sec.
  setInterval(function() {

  //Get coordinates of ISS
  const issURL = 'http://api.open-notify.org/iss-now.json';
  let lat;
  let lon;

  $.ajax(issURL).done(function(issData){
    lat = issData.iss_position.latitude;
    lon = issData.iss_position.longitude;
    $('.lat').text(lat);
    $('.lon').text(lon);

    //get weather link where ISS is
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${Math.round(lat)}&lon=${Math.round(lon)}&appid=10e736b75728b3f6b48e6c10a6afd7e1`;
    //weather request
    $.ajax(weatherURL).done(function(weatherData){
      let description = weatherData.weather[0].main;
      $('.description').text(description);
      let temp = weatherData.main.temp - 273;
      $('.temp').text(`${Math.round(temp)} ˚C`);
      let icon = weatherData.weather[0].icon;
      $('.weather img').attr("src", `images/${icon}@2x.png`);
    });



    //get satellite view of ISS position
    let mapURL = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBBBDW1INGd7FRXpuYnkuyGjHjBCYMoGSQ&q=${lat},${lon}&zoom=2&maptype=satellite`;

    $('#ISS').attr('src', mapURL);
    })
  }, 15000);


});
