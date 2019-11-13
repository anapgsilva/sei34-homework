
let issLoc;

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(data) {
        $('#user > #lat').text('Latitude: ' + data.coords.latitude.toFixed(4));
        $('#user > #long').text('Longitude: ' + data.coords.longitude.toFixed(4));
        let marker = L.marker([data.coords.latitude, data.coords.longitude], {icon: meIcon}).addTo(mymap);

    });
    
  } else {}
}

let issMarker;

function setIssLocation() {
    $.ajax('http://api.open-notify.org/iss-now.json').done(function(data){
        $('#iss > #lat').text('Latitude: ' + data.iss_position.latitude);
        $('#iss > #long').text('Longitude: ' + data.iss_position.longitude);
        issMarker = L.marker([data.iss_position.latitude, data.iss_position.longitude], {icon: issIcon}).addTo(mymap);
    })
}

function updateIssLocation() {
    $.ajax('http://api.open-notify.org/iss-now.json').done(function(data){
        $('#iss > #lat').text('Latitude: ' + data.iss_position.latitude);
        $('#iss > #long').text('Longitude: ' + data.iss_position.longitude);
        mymap.removeLayer(issMarker);
        issMarker = L.marker([data.iss_position.latitude, data.iss_position.longitude], {icon: issIcon}).addTo(mymap);
    })
}


let mymap = L.map('mapid').setView([20, 10], 2);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.outdoors',
    accessToken: 'pk.eyJ1IjoiY2hyc2tlcnIiLCJhIjoiY2sydmIxOWZyMDM4OTNncW1tcW5sN3B3YiJ9.yhVwv9L_YGGRTOHNangK3w'
}).addTo(mymap);

const issIcon = L.icon({
    iconUrl: 'images/iss.png',

    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
});

const meIcon = L.icon({
    iconUrl: 'images/me.png',

    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
});

getUserLocation();
setIssLocation();
const interval1 = setInterval(updateIssLocation, 2000);
