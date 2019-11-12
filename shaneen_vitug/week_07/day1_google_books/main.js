function foo() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `https://www.googleapis.com/books/v1/volumes?q=title:${document.getElementById("search-book").value}`);
  // When the readystate of the request changes...
  xhr.onreadystatechange = function () {
    // ... if the readystate is 4 (that is, the request has been returned and is ready
    // to be used)...
    if (xhr.readyState === 4) {
      // ... store the response in a variable called 'received_data', and...
      let received_data = JSON.parse(xhr.responseText);
      // ... append that to the body element of the page.
      console.log(received_data.items[0].volumeInfo.imageLinks.thumbnail);
      if (!document.getElementsByTagName('img').length) {
        var elem = document.createElement("img");
        elem.setAttribute("src", received_data.items[0].volumeInfo.imageLinks.thumbnail);
        document.getElementById("image").appendChild(elem);
      } else {
        document.getElementsByTagName('img')[0].src = received_data.items[0].volumeInfo.imageLinks.thumbnail;
      }
    }
  }
  xhr.send();
};

document.getElementById("book").addEventListener("click", foo);