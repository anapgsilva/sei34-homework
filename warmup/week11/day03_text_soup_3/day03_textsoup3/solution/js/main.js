// - Use jQuery to get the contents of the div as a string, then split up the string into an array of words.
// - Use jQuery to 1) create a new DIV with that word as its contents, 2) set the DIV to appear at a random position on the page , and 3) append it to the DOM.

console.log("hello");



$(document).ready(function(){

//Capture the ID of the setInterval timer we create, so we can cancel and re-create it
  let timerID = null;

  let wikiContent;

//create a new GUI object which we call  methods on to add graphical controls
  const controls = {
    fadeIn: 2000,
    fadeOut: 2000,
    fontSize: 30,

    wordTimerInterval: 100,
    addWord: ''
  };

  const gui = new dat.GUI();

  gui.add(controls, 'fadeIn', 0, 5000);
  gui.add(controls, 'fadeOut', 0, 5000);
  gui.add(controls, 'fontSize', 10, 200);
  gui.add(controls, 'addWord');

  gui.add(controls, 'wordTimerInterval', 1, 1000)
  .onFinishChange(function(newValue){
     // This code will run when the slider has stopped being dragged by the user
    console.log(newValue);
    window.clearInterval(timerID );
    timerID = window.setInterval( displayWord, newValue);

  });

//https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  const url = new URLSearchParams(window.location.search);
  console.log(url);
  let page = url.get('page');
  console.log(page);

  // found the api link from stackoverflow https://stackoverflow.com/questions/2381642/returning-data-from-wikipedia-using-ajax

  $.getJSON("http://en.wikipedia.org/w/api.php?action=parse&format=json&callback=?", {page: page, prop: "text"})
  .done( data => {
    if(data.error) return;

    console.log(data);
    let wikiHTML = JSON.stringify(data.parse.text["*"]);
      // this is the shape of the object returned by the Wikipedia API
    // console.log(wikiHTML);

    //use jquery to make a detached DOM node, set its HTML contents from the API repsonse
  // and then just get the .text() version of the HTML . . .

    let text = $('<div>').html(wikiHTML).text();
    console.log(text);
    wikiContent = text.split(/\W+/);
    timerID = setInterval( displayWord, 100 );

  });


  // const divContents = $("#book").text().split(/\W+/);
  // console.log( divContents );

  const randomValue = function(max){
    return Math.floor( Math.random()*max );
  }

  // ** change divContents to story
  const displayWord = function(){
    const randomIndex = randomValue( wikiContent.length );
    // console.log( randomIndex );

    let randomWord = wikiContent[randomIndex];
    // console.log( randomWord );

    // Use the value from the GUI text input approx half the time
      // (but only if the string has contents)
    if(controls.addWord.length > 0 && Math.random() > 0.5){
      randomWord = controls.addWord;
    }


    const $wordDiv = $('<div class="word">');
    $wordDiv.text(randomWord);

    const xRand = randomValue( window.innerWidth );
    const yRand = randomValue( window.innerHeight );

    const colorRand = `rgb(${randomValue(255)}, ${randomValue(255)}, ${randomValue(255)} )`;

    $wordDiv.css({
      top: yRand,
      left: xRand,
      color: colorRand,
      // some extra randomness
      // fontSize: `${15 + randomValue(30)}pt`,
      fontSize: `${controls.fontSize}pt`,
      transform: `rotate(${randomValue(360)}deg`,
    })

    $('body').append($wordDiv);

    $wordDiv.fadeIn(controls.fadeIn).fadeOut(controls.fadeOut, function(){
      // remove div from DOM when the fadeout is finished
      $(this).remove();
    })

  }

  // displayWord();

// add timer ID

  // timerID = setInterval( displayWord, 100 );

})
