// let data;



const fetchFact = function() {
  // console.log('hello');
  const xhr = new XMLHttpRequest();
  let query = document.getElementById("bookimage").value;
  xhr.open('GET', `https://www.googleapis.com/books/v1/volumes?q=${query}`);

  xhr.send(); // Asynchronous

  xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) {
      return; // It's too soon for us to see any complete data.
    }
    // Convert the JSON string into an actual JS object.
    const data = JSON.parse(xhr.responseText);
    const urllink = data.items[0]["volumeInfo"]["imageLinks"]["thumbnail"];
    const urllink = data.items[0]["volumeInfo"]["imageLinks"]["thumbnail"];

    let img = document.createElement('img');
    img.style = 'position:fixed;top:10px;left:10px;width:100px';


    // show it
    img.src = urllink;
    document.body.append(img);
    // document.body.appendChild("img");
  };
};

document.getElementById('find').addEventListener('click', fetchFact);
// fetchFact();
