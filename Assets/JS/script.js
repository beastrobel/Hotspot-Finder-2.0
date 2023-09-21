//get the recent list to add zip and address
// populate the recent searches with the recent searches
//make recent searches clickable to recall searches
const headers = {'Authorization': 'Basic QUlEZjQ2ZjQ2MmI1ZTZiMjZiYTc3YTFjMjBkM2Y5ZTE5ZmM6ZjIzZGFlMzdlOGQ2OGNlNGQzYmVhMzFmOGExZDk1ZTY='}
const myPosition = {lat: 42.68348312,lng: -84.50691223};
const zip = document.getElementById("inputOne");
let recent = [];
var searchBtn = document.querySelector(".btn-primary");
var recentSearch = document.getElementById('recent');

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
        var ssid = data.results[i].ssid
        
        new google.maps.Marker({
          map,
          position: {lat: lat,lng: lon},
          icon: "./Assets/images/Favicon.png",
          title: ssid})
          window.data=data;          
      }

      localSave()
      })}


function localLoad(){
  recent = JSON.parse(localStorage.getItem("recent"))

  for (let i = 0; i < recent.length; i++) {
    var li = document.createElement('li');
    li.className = 'search';

    var postal = document.createElement('postalCode');
    postal.innerHTML = recent[i];

    li.appendChild(postal);
    recentSearch.appendChild(li); 
  }
}


function localSave(){
  let city = zip.value;
  recent.unshift(city);
    if(recent.length > 5){
      recent.pop();
      }
    localStorage.setItem("recent", JSON.stringify(recent));
    
  localLoad;}

localLoad();
searchBtn.addEventListener('click',search);