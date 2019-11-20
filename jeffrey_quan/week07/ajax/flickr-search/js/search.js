console.log( _.VERSION, $.fn.jquery );
let pageNo = 1;
let keepScrolling = "on";

const showImages = function (results) {
  // Nested helper function
  const generateURL = function (p) {
    return [
      'http://farm',
      p.farm,
      '.static.flickr.com/',
      p.server,
      '/',
      p.id,
      '_',
      p.secret,
      '_q.jpg' // Change this to something else for different sizes (see docs)
    ].join('');
  };

  _(results.photos.photo).each(function (photo) {
    const thumbnailURL = generateURL( photo );
    const $img = $('<img>', {src: thumbnailURL}); // equivalent to .attr('src', thumbnailURL)
    $img.appendTo('#images');
  })
};

const searchFlickr = function (terms) {
  console.log(`Searching Flickr for`, terms);

  const flickrURL = 'https://api.flickr.com/services/rest?jsoncallback=?';

  $.getJSON(flickrURL, {
    method: 'flickr.photos.search',
    api_key: '2f5ac274ecfac5a455f38745704ad084', // This is not a secret key
    text: terms,
    page: pageNo,
    format: 'json'
  }).done(showImages).done(console.log);
}

$(document).ready(function() {
  $('#search').on('submit', function(event) {
    event.preventDefault(); // Stay on this page
    $('#images').empty();
    pageNo = 1;
    // get the search terms
    const query = $('#query').val();
    searchFlickr( query );
    // fetch images for those search terms
  });

  // Extremely twitchy
  $(window).on('scroll', function() {
    const scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
    console.log( scrollBottom );
    if (scrollBottom < 650 && keepScrolling === "on") {
      // get the query
      const query = $('#query').val();
      pageNo += 1;
      // search flickr
      searchFlickr( query );
      keepScrolling = "off";
    } else if (scrollBottom > 650) {
      keepScrolling = "on";
    }
    // console.log('scrolltop', $(window).scrollTop());
    // console.log('window height', $(window).height());
    // console.log('document height', $(document).height());
  });
});
