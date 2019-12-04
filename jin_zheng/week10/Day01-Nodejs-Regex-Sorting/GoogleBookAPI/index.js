const express = require('express')
const axios = require('axios')
const ejs = require('ejs');
var bodyParser = require('body-parser');

const PORT = 1337

const server = express();
server.use(express.static('public'))
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json())
server.set('view-engine', ejs);

server.get('/', (req, res) => {
    res.render('home.ejs')
})

server.post('/', (req, res) => {
    console.log(req.body.query);
    const query = req.body.query;
    const url = `https://www.googleapis.com/books/v1/volumes?q=title:${query}`;
    axios.get(url, { params: {maxResults: 40, filter: 'ebooks', printTpye: 'books', orderBy:'relevance'}}).then(result => {
        books = [];
        result.data.items.forEach(book => {
            const img = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : './image.png';
            let title = book.volumeInfo.title;
            const link = book.volumeInfo.infoLink
            const des = book.volumeInfo.description;
            books.push({img: img, title: title, link: link, des: des})
        })

        res.render('search.ejs', {books: books
    })
});
});


server.listen(PORT, () => console.log(`Now serving on http://localhost:${PORT}`));
