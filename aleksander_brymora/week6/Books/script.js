const btn = document.getElementById('search-btn');

btn.addEventListener('click', function () {
	const bookSearch = document.getElementById('search-input').value;
	const offcanvas = document.getElementById('offcanvas-usage');

	if (bookSearch === "") {
		UIkit.notification('Search cannot be empty', 'danger');
	} else {
		fetchBook(bookSearch)
	}

	UIkit.offcanvas(offcanvas).hide();
})

function fetchBook(book) {
	const searchURL = encodeURI(`https://www.googleapis.com/books/v1/volumes?q=${book}`);
	const xhr = new XMLHttpRequest;
	xhr.open('GET', searchURL);
	xhr.send();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			const response = JSON.parse(xhr.responseText);
			updatePage(response);
		}
	}
}

function updatePage(data) {
	console.log(data);
	data = data.items[0].volumeInfo
	// Container
	const parent = document.createElement('div');
	parent.classList.add("uk-margin-medium-top", "uk-animation-fade", "uk-flex");


	// thumb div
	const thumbDiv = document.createElement('div');
	thumbDiv.classList.add('uk-width-auto');
	parent.appendChild(thumbDiv);

	// Thumbnail
	const thumb = document.createElement('img');
	thumb.classList.add('uk-card', 'uk-card-default', 'uk-card-body');
	thumb.src = data.imageLinks.thumbnail;
	thumbDiv.appendChild(thumb);


	// desc div
	const descDiv = document.createElement('div');
	descDiv.classList.add('uk-width-expand', 'uk-margin-medium-left');
	parent.appendChild(descDiv);

	// Description
	const desc = document.createElement('div');
	desc.classList.add('uk-card', 'uk-card-default', 'uk-card-body');
	descDiv.appendChild(desc);

	// Description Contents
	// --Title
	let title = document.createElement('h1');
	title.innerText = data.title;
	desc.appendChild(title);

	// --Authors
	const authdesc = document.createElement('h3');
	authdesc.innerText = 'Authors';
	desc.appendChild(authdesc);
	let aut = document.createElement('p');
	aut.innerText = data.authors.join(', ');
	desc.appendChild(aut);
	
	// --Desc
	const descdesc = document.createElement('h3');
	descdesc.innerText = 'Description';
	desc.appendChild(descdesc);
	let desctext = document.createElement('p');
	desctext.innerText = data.description;
	desc.appendChild(desctext);

	// Adding to page
	document.getElementById("main-container").appendChild(parent);

	// bookDisplay.src = data.items[0].volumeInfo.imageLinks.thumbnail;
}