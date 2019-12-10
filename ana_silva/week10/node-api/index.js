const express = require('express');
const ejs = require('ejs');
const axios = require('axios');
const ejsLint = require('ejs-lint');


const server = express();

server.use(express.static('public'));
server.use(express.urlencoded());
server.use(express.json());

server.set('view-engine', ejs);

const PORT = 1337;

server.get('/', (req,res) => {
  res.render('home.ejs', "");


});

server.post('/', (req, res) => {
  const query = req.body.query;
  console.log(query);

  //axios request
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`).then( (response) => {
    const results = response.data.items;
  
    res.render('results.ejs', {results: results});

  });



})


server.listen(PORT, () => console.log(`Now serving on http://localhost:${PORT}`));
