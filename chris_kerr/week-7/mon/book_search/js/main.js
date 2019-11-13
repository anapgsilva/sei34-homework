// Specification

// Build a search form that lets the user enter a book title. The Sinatra app will use HTTParty to fetch the data for the chosen book from Google Books and display it on the page. Display the cover, as a bare minimum.

// Sample URL

// https://www.googleapis.com/books/v1/volumes?q=title:Ulysses



let run = function() {
    let input = $('#search-box').val();

    console.log('click')
    const xhr = new XMLHttpRequest();

    console.log(`https://www.googleapis.com/books/v1/volumes?q=title:${input}`)

    xhr.open("GET", `https://www.googleapis.com/books/v1/volumes?q=title:${input}`);
    xhr.send();


    xhr.onload = function() {
        let data = JSON.parse(xhr.responseText)
        let title = data.items[0].volumeInfo.title
        let image = data.items[0].volumeInfo.imageLinks.smallThumbnail
        let description = data.items[0].volumeInfo.description

        $('div').append($(`<h3>${title}</h3>`))
        $('div').append($(`<img src='${image}'></img>`))
        $('div').append($(`<p>${description}</p>`))
    }




    $('#search-box').val('')
}

