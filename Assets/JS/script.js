// add var for lat lng input
// add for loop for results
// change const marker for input variables
// position = trilat, trilong
// title = ssid
// create local storage 
let map;
const headers= {'Authorization': 'Basic QUlEZjQ2ZjQ2MmI1ZTZiMjZiYTc3YTFjMjBkM2Y5ZTE5ZmM6ZjIzZGFlMzdlOGQ2OGNlNGQzYmVhMzFmOGExZDk1ZTY='}
fetch("https://api.wigle.net/api/v2/network/search?onlymine=false&freenet=true&paynet=false&variance=0.02&postalCode=48910&resultsPerPage=10", { headers })

    .then(function (response){
        return response.json();})
    .then(function (data) {
        console.log(data);})

async function initMap() {
  const position = { lat: 42.732536, lng: -84.555534 };
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 16,
    center: position,
    mapId: "Wifi_map",
  });


  const marker1 = new AdvancedMarkerElement({
    map: map,
    position: { lat: 42.732535, lng: -84.555534 },
    title: "Uluru",
  });
  const marker2 = new AdvancedMarkerElement({
    map: map,
    position: { lat: 42.742535, lng: -84.555534 },
    title: "Uluru",
  });
}


initMap();