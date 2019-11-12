const fetchBook = function() {

  let input = document.getElementById('title');
  let inputValue = input.value
  let title = inputValue.toLowerCase().split(" ").join('');
  console.log(title);

  const xhr = new XMLHttpRequest();
  xhr.open('GET',`https://www.googleapis.com/books/v1/volumes?q=${title}`);
  xhr.send();

  xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) {
      return;
    }
    const data = JSON.parse(xhr.responseText);
    const bookData = data.items[0];
    console.log(bookData);
    const div = document.createElement("div");
    div.classList.add("mr-5");
    div.classList.add("mt-5");
    div.classList.add("align-self-center");

    const a = document.createElement("a");
    a.href = bookData.volumeInfo.previewLink;
    a.target = "_blank"

    const p = document.createElement('p');
    p.innerHTML = bookData.volumeInfo.title;
    a.appendChild(p);

    const img = document.createElement('img');
    img.src = bookData.volumeInfo.imageLinks.thumbnail;
    a.appendChild(img);
    div.appendChild(a);

    document.getElementById('results').appendChild(div);
  }
}


document.getElementById('button').addEventListener('click', fetchBook);
