// using JSONP for AJAX today to show that it exists, no strictly mandatory for this program

console.log( _.VERSION, $.fn.jquery) // confirming all 3 js libraries opened


let targetPage = 1;
let totalPages = 1;
const searchFlickr = function( searchTerms ) {
    console.log('Searching Flickr for ' + searchTerms)

    const flickrUrl = 'https://api.flickr.com/services/rest?jsoncallback=?';

    if (targetPage <= totalPages) { // only run if more pages exist
        $.getJSON(flickrUrl, {
            // data being sent to flickr for JSONP
            method: 'flickr.photos.search', // here meant in the function Flickr will perform
            api_key: '2f5ac274ecfac5a455f38745704ad084',
            text: searchTerms, 
            format: 'json',
            page: targetPage
        }).done(showImages).done(function(result){
            console.log('retrieving page', targetPage, 'of', result.photos.pages)
            totalPages = result.photos.pages;
            targetPage ++;
            // reset totalPages to pages total from JSON, just in case it changes (more added maybe?)
            // increment targetPage (the next one to be retreived for next loop)
        });
    }   

}

const showImages = function(results) {
    
    const generateUrl = function (p) { 
        // only needed inside this function, so limited scope to here
        // we'll use an array join here for speed purposes
        return [
            'http://farm',
            p.farm,
            '.static.flickr.com/',
            p.server,
            '/',
            p.id,
            '_',
            p.secret,
            '_z.jpg' // change this to something else for different sizes and types (see Flirk docs)
        ].join('');
    }

    const generalHref = function (p) {
        return [
            'https://www.flickr.com/photos/',
            p.owner,
            '/',
            p.id
        ].join('');
    }

    _(results.photos.photo).each( function(photo, i) {
        let thumbnailUrl = generateUrl(photo);
        const thumbHref = generalHref(photo);
        const $img = $('<a target="_blank" class="thumb"></a>');
        if (i%7===0) {
            thumbnailUrl = thumbnailUrl.replace('_z.jpg', '_b.jpg')
            $img.addClass('wideThumb');
        }
        $img.css('background-image', 'url('+ thumbnailUrl + ')');
        $img.attr('href', thumbHref);
        $($img).appendTo('#images')
    })

}

$(document).ready(function() {

    let lastScrollBottom = 0;

    $('#search').on('submit', function(event) {
        event.preventDefault();
        const query = $('#query').val();
        targetPage = 1;
        $('#images').empty();
        searchFlickr(query);
    });


    $(window).on('scroll', function(){

        const scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();

        if (scrollBottom < 650 && lastScrollBottom >= 650) {
            console.log('Search Flickr Again')
            const query = $('#query').val();
            searchFlickr(query);
        }


        lastScrollBottom = scrollBottom;
        // this and the test above make sure that this only triggers when scrolling down over the 650px mark
    })
});

