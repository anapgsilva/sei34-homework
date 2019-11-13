$(document).ready(function () {
  const $searchForm = $('form');

  $searchForm.on('submit', function (event) {
    event.preventDefault();

    const cityName = $('#city').val();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=dc0ba9ecf138c1e8167017659deef39b`;

    $.ajax(url).done(function(data) {
      const icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
      const weather = data.weather[0].main;
      const temp = Math.floor(data.main.temp) + " °C";
      $('#icon').attr('src', icon);
      $('.weather').empty().append(weather);
      $('.temp').empty().append(temp);
    }).done(function (result) {
      console.log(result);
    }).fail(function () {
      alert('Please type a valid city.');
    });
  });
});
