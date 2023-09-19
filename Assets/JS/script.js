//check the results are loaded from the data array
//check to make sure the markers are loaded properly
//finish setting up the local storage
//link the buttons to the index.html files
// create local storage 
const headers= {'Authorization': 'Basic QUlEZjQ2ZjQ2MmI1ZTZiMjZiYTc3YTFjMjBkM2Y5ZTE5ZmM6ZjIzZGFlMzdlOGQ2OGNlNGQzYmVhMzFmOGExZDk1ZTY='}

const recent = [];

var searchBtn = document.querySelector(".searchBtn");

let map;

async function initMap() {
  
    const position = {lat: 42.68348312,lng: -84.50691223};
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  fetch("https://api.wigle.net/api/v2/network/search?onlymine=false&freenet=true&paynet=false&variance=0.02&postalCode=48910&resultsPerPage=10", { headers })
  
    .then(function(response) {
      return response.json();
     })
    .then(function(data){
      console.log(data.results[0].trilat)
    
    for (let i = 0; i < 10; i++) {
        var ssid= data.results[i].ssid
        var lat= data.results[i].trilat
        var lon= data.results[i].trilong
        var wiLat = parseFloat(lat)
        var wiLon = parseFloat(lon)
        
        console.log(wiLat);
        console.log(wiLon);
        
        const marker = new google.maps.marker.AdvancedMarkerElement({
          map:map,
          position: {lat: wiLat,lng: wiLon},
          title:ssid})
          window.data=data
        
  
      }})

    

     map = new Map(document.getElementById("map"), {
      zoom: 16,
      center: position,
      mapId: "Wifi_map",
        })
      
      }

function localSave(){
  recent.unshift(recentSearch);
    if(recent.length > 5){
      recent.pop();
      }
    }


window.initMap = initMap;
searchBtn.addEventListener('click',initMap);