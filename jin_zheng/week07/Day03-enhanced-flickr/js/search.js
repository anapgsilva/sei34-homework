console.log(_.VERSION, $.fn.jquery);

let page = 1;
let photoURL = [];
const showImages = (results) => {
    const generateURL = (p) => {
        return [ 'http://farm', p.farm, '.static.flickr.com/', p.server, '/', p.id, '_', p.secret, '_q.jpg' ].join("")
    }
    _(results.photos.photo).each((photo) => {
        photoURL.push(generateURL(photo))
        const $el = $(`<a href='${generateURL(photo)}'><img src="${generateURL(photo)}"></a>`)
        $el.appendTo('#image')
    });
};

const searchFlickr = (terms) => {
    console.log('Searching Flickr for:', terms, 'page: ', page);
    const flickrURL = 'https://api.flickr.com/services/rest?jsoncallback=?'

    $.getJSON(flickrURL, {
        method: 'flickr.photos.search',
        api_key: '2f5ac274ecfac5a455f38745704ad084',
        text: terms,
        format: 'json',
        page: page
    }).done((results) => {
        if (results.photos.pages >= page) {
            showImages(results);
            page += 1}
    });
};

$(document).ready(() => {

    $('#search').submit((event) => {
        event.preventDefault()
        $('#image').empty();
        page = 1
        photoURL=[]
        searchFlickr($("#query").val());
    });

    const debouncedSearchFlickr = _.debounce(searchFlickr, 1000, { trailing: false });

    $(window).scroll(() => {
        let scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
        scrollBottom < 200 && debouncedSearchFlickr($("#query").val())});

    let map = L.map('map').setView([0, 0], 10);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 18,
        id: 'mapbox.light',
        accessToken: 'pk.eyJ1Ijoiamluc2VhbCIsImEiOiJjazJ2c2tybDMwOGhnM2JvMXltd2NqYWJlIn0.coec8eyI6d1tTfDQvcffTg'
    }).addTo(map);

    L.TileLayer.Photo = L.TileLayer.extend({
        getTileUrl: function(coords) {
            return _(photoURL).sample();
        },
    });

    L.tileLayer.photo = function() {
        return new L.TileLayer.Photo();
    }

    L.tileLayer.photo().addTo(map);
});
