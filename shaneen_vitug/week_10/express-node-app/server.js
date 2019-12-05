const express = require('express');
const ejs = require('ejs');
const request = require('request');

const server = express();
server.use(express.static('public'));
server.set('view-engine', ejs);

const PORT = 1337;

server.get('/weather', (req, res) => {
  let searchTerm = req.query.searchterm;
  console.log(searchTerm);
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=dc0ba9ecf138c1e8167017659deef39b`;
  request(url, (error, response, body) => {
    weather_json = JSON.parse(body);
    console.log(weather_json);

    let weather = {
      city: searchTerm,
      weather: weather_json.weather[0].main,
      temperature: Math.round(weather_json.main.temp),
      description: weather_json.weather[0].description,
      icon: weather_json.weather[0].icon
    };

    let weather_data = {weather: weather}

    res.render('weather.ejs', weather_data);

  });
})

server.get('/', (req, res) => {
  res.render('search.ejs')
})

// server.get('/', (req, res) => {
//   const url = `http://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&units=metric&appid=dc0ba9ecf138c1e8167017659deef39b`;
//   axios.get(url).then(response => {
//     res.json({
//       weather: response.data.weather[0].main,
//       temperature: Math.floor(response.data.main.temp) + " °C"
//     })}
//    );
// })

server.listen(PORT, () => console.log(`Now serving on http://localhost:${PORT}`));