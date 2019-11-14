
$(document).ready(() => {

//iss////////////////////////////////////////////////////

let mapISS = L.map('mapISS').setView([51.505, -0.09], 2);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.light',
    accessToken: 'pk.eyJ1Ijoiamluc2VhbCIsImEiOiJjazJ2c2tybDMwOGhnM2JvMXltd2NqYWJlIn0.coec8eyI6d1tTfDQvcffTg'
}).addTo(mapISS);

let issIcon = L.icon({
    iconUrl: 'image/iss.png',
    iconSize: [70, 70],
});

const moveISS = () => {
    $('[src="image/iss.png"]').remove();
    let url = 'http://api.open-notify.org/iss-now.json?callback=?'
    $.getJSON('http://api.open-notify.org/iss-now.json?callback=?', function(data) {
        let lat = data['iss_position']['latitude'];
        let lon = data['iss_position']['longitude'];

        mapISS.panTo([lat, lon], animate=true);

        let marker = L.marker([lat, lon], {icon: issIcon}).addTo(mapISS).on('click', ()=>{
            getAstronauts();
            $('body').toggleClass('show-aside');
            moveISS()});

        marker.bindPopup(`ISS is at {lat: ${lat}, lon: ${lon}}  now.`);

    });
    setTimeout(moveISS, 5000);
}
moveISS()


//astronauts

const getAstronauts = () => {
    $.getJSON('http://api.open-notify.org/astros.json?callback=?', (data) => {
        let number = data.number;
        $('#spacepeeps').text(number+ ' astronauts in ISS');
        $('#astronames').empty();
        data.people.forEach((d) => {
             $('#astronames').append(`<a href="https://en.wikipedia.org/wiki/${d['name']}" target="_blank"><li>` + d['name'] + '</li></a>');
        });
    });
}


//Earth///////////////////////////////////////////////////
let mapEarth = L.map('mapEarth').setView([-33.9, 151.02], 8);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoiamluc2VhbCIsImEiOiJjazJ2c2tybDMwOGhnM2JvMXltd2NqYWJlIn0.coec8eyI6d1tTfDQvcffTg'
}).addTo(mapEarth);

let humanIcon = L.icon({
    iconUrl: 'image/human.png',
    iconSize: [70, 70],
});

const onMapClick = (e) => {
    $('[src="image/human.png"]').remove();
    let lat = e.latlng.lat.toFixed(1)
    let lon = e.latlng.lng.toFixed(1)
    console.log(lat, lon);
    let marker = L.marker([lat, lon], {icon: humanIcon}).addTo(mapEarth);
    let popup = L.popup();

    $.getJSON(
        `http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}&alt=20&n=1&callback=?`,
        (data) => {
        let output = new Date(data.response[0].risetime * 1000).toString();
        popup.setLatLng(e.latlng).setContent(output).openOn(mapEarth);
    });
}

mapEarth.on('click', onMapClick);




window.onresize = () => {
    let height = window.innerHeight;
    $('body').css('height', height+"px")
};

})
