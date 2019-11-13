
const input = document.getElementById('book-search');
const attribType = document.getElementById('attrib')
const sortType = document.getElementById('sort')
const resultsDiv = document.getElementById('results')
const submit = document.getElementById('search-form');
const xhr = new XMLHttpRequest
const baseURL = 'https://www.googleapis.com/books/v1/volumes?q='

const createTile = function(book) {
    cover = book.volumeInfo.imageLinks.thumbnail
    title = book.volumeInfo.title
    preview = book.volumeInfo.previewLink
    if (cover.length > 0) {
      tile = `<a href="${preview}" target="_blank" alt="Google Books preview of ${title}"><img src="${cover}" title="${title}"><p>${title}</p></a>`;
      div = document.createElement('div');
      div.classList.add('tile');
      div.innerHTML = tile
      resultsDiv.appendChild(div);
    }
};

const getSearchResults = function(q, attrib, sort) {
  event.preventDefault();
  let attribType = "";
  switch (attrib) {
		case "Author":
			attribType = "+inauthor:";
			break;
		case "Title":
			attribType = "+intitle:";
			break;
		default:
			attribType = "";
	}
  let sortType = "";
	switch (sort){
		case "Relevance":
			sortType = "";
			break;
		case "Publish Date":
			sortType = "&orderBy=newest";
			break;
		default:
			sortType = "";
	}
  console.log(baseURL + attribType + q + sortType)
  xhr.open('GET', baseURL + attribType + q + sortType)
  xhr.send()
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;
    const hits = JSON.parse(xhr.response).items
    resultsDiv.innerHTML = ""
    hits.forEach((hit) => createTile(hit));
  };
};

submit.addEventListener('submit', () => getSearchResults(input.value, attrib.value, sort.value));
// input.addEventListener('keyup', function(event) {
//   if (event.keyCode === 13) { //user presses enter
//     event.preventDefault()
//     btn.click()
//   }
// });
