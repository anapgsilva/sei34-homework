// Specification

// Build a search form that lets the user enter a book title. The Sinatra app will use HTTParty to fetch the data for the chosen book from Google Books and display it on the page. Display the cover, as a bare minimum.

// Sample URL

// https://www.googleapis.com/books/v1/volumes?q=title:Ulysses



$('#search-form').on('submit', function(event) { // this makes the form submit on enter-press or on submit click.
    
    event.preventDefault(); // this prevents the form submission to server, which refreshes the page. Instead just allows AJAX below to run.

    let input = $('#search-box').val();

    const xhr = new XMLHttpRequest();

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
});
