// AJAX Flickr Lab
// Support infinite scroll to show all results from Flickr (eventually, after a lot of scrolling).
// Prevent your code from making too many requests: only one at a time, please
// Don't request more images when you reach the last "page" of Flickr results
// Make sure you go back to the first page when searching for a new term!
// Make it beautiful
// Add other features as you see fit
// Bonus: display larger images in an attractive slideshow
// Bonus: add links back to each image's own page on Flickr.com

console.log(_.VERSION, $.fn.jquery);
//initialize variables
let page;
let totalPages;

//get images from JSON and append to doc function
const showImages = function(results) {
  console.log(results.photos);
  //Nested helper function
  const generateURL = function(p) {
    return [
      'http://farm',
      p.farm,
      '.static.flickr.com/',
      p.server,
      '/',
      p.id,
      '_',
      p.secret,
      '_q.jpg' //Change this if you want diff sizes (see docs)
    ].join('');
  };

  //array of all images urls
  // console.log(_(results.photos.photo).map(generateURL));
  totalPages = results.photos.pages;

  _(results.photos.photo).each(function(photo){
    const thumbnailURL = generateURL(photo);
    const imageURL = `https://www.flickr.com/photos/${photo.owner}/${photo.id}/`;
    const $a = $('<a>', {href: imageURL, target: '_blank'});
    const $img = $('<img>', {src: thumbnailURL}); //equivalent to .attr('src', thumbnailURL)
    $img.appendTo($a);
    $a.appendTo('#images');
  });
}; //end of showImages

//make request function
const searchFlickr = function (terms) {
  if (page >= totalPages) { //if no more pages then no request
    return;
  }
  console.log(`Searching Flickr for ${terms}.`);
  page += 1; //everytime we search adds 1 page
  const flickrURL = 'https://api.flickr.com/services/rest?jsoncallback=?';

  //getJSON is a jquery ajax function
  $.getJSON(flickrURL, { //parameters that flickr requires
    method: 'flickr.photos.search',
    api_key: '2f5ac274ecfac5a455f38745704ad084', // This is not a secret key
    text: terms,
    page: page,
    format: 'json'
  }).done(showImages);
};



$(document).ready(function(){
  $('#search').on('submit', function(event) {
    event.preventDefault(); //pass event so we can use this prevent default to stay on the page
    page = 0; //initialize at new submission
    $('#images').empty(); //and empty div
    //get search terms
    const query = $('#query').val();
    //get images for search terms
    searchFlickr(query);
  });

  //Extremely twitchy - find new results to show
  $(window).on('scroll', _.throttle(function(){
    // console.log('scrolltop', $(window).scrollTop());
    // console.log('window height', $(window).height());
    // console.log('document height', $(document).height());
    check_if_needs_more_content();
  }, 3000));

  function check_if_needs_more_content() {
    const scrollBottom = $(document).height() - $(window).scrollTop() - $(window).height();

    if (scrollBottom < 650) {
      //get query
      const query = $('#query').val();
      //search flickr again
      searchFlickr(query);
    }
  }
});



//throttle method: https://css-tricks.com/debouncing-throttling-explained-examples/
