//check the results are loaded from the data array
//check to make sure the markers are loaded properly
const headers = {'Authorization': 'Basic QUlEZjQ2ZjQ2MmI1ZTZiMjZiYTc3YTFjMjBkM2Y5ZTE5ZmM6ZjIzZGFlMzdlOGQ2OGNlNGQzYmVhMzFmOGExZDk1ZTY='}
const myPosition = {lat: 42.68348312,lng: -84.50691223};
var recent = [];
var address = document.getElementById("address");
var postal = document.getElementById('postal');
let city = {streetAddress:address, zipCode:postal};
const zip = document.getElementById("inputOne");
const wifiImg = document.createElement("img")

wifiImg.src="./Assets/images/Favicon.png"

var searchBtn = document.querySelector(".btn-primary");

let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
   
  const map = new Map(document.getElementById("map"), {
    zoom: 8,
    center: myPosition,
    mapId: "Wifi_map",});
  }

async function search() {
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const { Map } = await google.maps.importLibrary("maps")
  const map = new Map(document.getElementById("map"), {
    zoom: 8,
    center: myPosition,
    mapId: "Wifi_map",});
  fetch("https://api.wigle.net/api/v2/network/search?onlymine=false&freenet=true&paynet=false&variance=0.02&postalCode="+zip.value+"&resultsPerPage=10", { headers })
  

    .then(function(response) {
      return response.json();
     })
    .then(function(data){
      console.log(data.results[0].trilat, data.results[0].trilong)
    
    for (let i = 0; i < 10; i++) {
        var lat= data.results[i].trilat
        var lon= data.results[i].trilong
        
        new google.maps.Marker({
          map,
          position: {lat: lat,lng: lon}})
          window.data=data;          
      }

      localSave(city)
      })}


function localLoad(){
  recent = JSON.parse(localStorage.getItem("recent"))
}

function localSave(city){
  recent.unshift(city);
    if(recent.length > 5){
      recent.pop();
      }
    localStorage.setItem("recent", JSON.stringify(recent));
    }


searchBtn.addEventListener('click',search);
