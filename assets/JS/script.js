//get the recent list to add zip and address
// populate the recent searches with the recent searches
//make recent searches clickable to recall searches
const headers = {'Authorization': 'Basic QUlEZjQ2ZjQ2MmI1ZTZiMjZiYTc3YTFjMjBkM2Y5ZTE5ZmM6ZjIzZGFlMzdlOGQ2OGNlNGQzYmVhMzFmOGExZDk1ZTY='}
const myPosition = {lat: 42.68348312,lng: -84.50691223};
var zip = document.getElementById("inputOne");
var recent = [];
var searchBtn = document.querySelector(".btn-primary");
var recentSearch = document.getElementById('recent');
var address = document.getElementById('address');
var addressResult = [];

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
 ;
  fetch("https://api.wigle.net/api/v2/network/search?onlymine=false&freenet=true&paynet=false&variance=0.02&postalCode="+zip.value+"&resultsPerPage=10", { headers })
  

    .then(function(response) {
      return response.json();
     })
    .then(function(data){
      console.log(data.results[0].trilat, data.results[0].trilong)
    localSave()
    for (let i = 0; i < 10; i++) {
        var lat= data.results[i].trilat
        var lon= data.results[i].trilong
        var wifiName = data.results[i].ssid
        var state = data.results[i].region
        var cityName = data.results[i].city
        var road = data.results[i].road
        if (houseNumber != null){
          var houseNumber = data.results[i].housenumber}
          else{
            var houseNumber = ''
          }

        var postalCode = data.results[i].postalcode
        
        new google.maps.Marker({
          map,
          position: {lat: lat,lng: lon},
          icon: "./assets/images/icon.png",
          title: wifiName})
          window.data=data;

        var li = document.createElement('li')
        var streetAddress = document.createElement('streetAddress')
        var name = document.createElement('addressName')

        streetAddress.innerHTML = houseNumber + ' ' + road + ',' + cityName + ',' + state + ' ' + postalCode;
        name.innerHTML = wifiName
        
        li.appendChild(streetAddress);
        li.appendChild(name);

        address.appendChild(li);
           
        const map = new Map(document.getElementById("map"), {
          zoom: 8,
          center: {lat: data.results[0].trilat,lng: data.results[0].trilong},
          mapId: "Wifi_map",})
      }

      
      })}


function localLoad(){

  recent = JSON.parse(localStorage.getItem("recent"))
  console.log("nope");
  
  for (let i = 0; i < recent.length ; i++) {
    var li = document.createElement('a');
    li.className = 'search';

    var postal = document.createElement('postalCode');
    postal.innerHTML = recent[i];
    postal.className =('list-group-item list-group-item-action'); 

    li.appendChild(postal);
    recentSearch.appendChild(li); 

    postal.addEventListener('click', search)
    zip = recent[i]};
}


function localSave(){
  let city = zip.value;
  recent.unshift(city);
    if(recent.length > 5){
      recent.pop();
      }
    localStorage.setItem("recent", JSON.stringify(recent));
    
  localLoad;}
if (recent === null) {
  localLoad()};

searchBtn.addEventListener('click',search);