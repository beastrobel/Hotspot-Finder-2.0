//get the recent list to add zip and address
// populate the recent searches with the recent searches
//make recent searches clickable to recall searches
let map;
const headers = {'Authorization': 'Basic QUlEZjQ2ZjQ2MmI1ZTZiMjZiYTc3YTFjMjBkM2Y5ZTE5ZmM6ZjIzZGFlMzdlOGQ2OGNlNGQzYmVhMzFmOGExZDk1ZTY='}
const myPosition = {lat: 42.68348312,lng: -84.50691223};
var zip = document.querySelector("#search-bar");
var recent = [];
var searchBtn = document.querySelector("#search-button");
var recentSearch = document.getElementById('recent');
var address = document.getElementById('address');
var addressResult = [];



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
  const { Map } = await google.maps.importLibrary("maps");
  const map = new Map(document.getElementById("map"), {
    zoom: 8,
    center: myPosition,
    mapId: "Wifi_map",});
  

  zip=document.querySelector("#search-bar");
  localSave(zip.value)
  fetch("https://api.wigle.net/api/v2/network/search?onlymine=false&freenet=true&paynet=false&variance=0.02&postalCode="+zip.value+"&resultsPerPage=10", { headers })
  

    .then(function(response) {
      return response.json();
     })
    .then(function(data){
      console.log(data.results[0].trilat, data.results[0].trilong)
    


    
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
          };

        var postalCode = data.results[i].postalcode;
        
        new google.maps.Marker({
          position: {lat: lat,lng: lon},
          icon: "./assets/images/icon.png",
          title: wifiName,
          map});
          window.data=data;

        var li = document.createElement('li')
        var streetAddress = document.createElement('streetAddress')
        var name = document.createElement('addressName')

        streetAddress.innerHTML = houseNumber + ' ' + road + ',' + cityName + ',' + state + ' ' + postalCode;
        name.innerHTML = wifiName
        
        li.appendChild(streetAddress);
        li.appendChild(name);

        address.appendChild(li);
        
        

      }
      if ((!map.getBounds().contains(marker.getPosition())) && (showAllCategoryElements == 0)) { 
        map.setCenter(marker.getPosition());
      

      
}})}


function localLoad(){

  recent = JSON.parse(localStorage.getItem("recent"))
  
  for (let i = 0; i < recent.length ; i++) {
    var li = document.createElement('a');
    li.className = 'search';

    var postal = document.createElement('postalCode');
    postal.innerHTML = recent[i];
    postal.className =('list-group-item list-group-item-action'); 

    li.appendChild(postal);
    recentSearch.appendChild(li); 
    
    zip.innerText = recent[i];
    postal.addEventListener('click', search)
    };
}


function localSave(zip){
  recent.unshift(zip);
    if(recent.length > 5){
      recent.pop();
      }
    localStorage.setItem("recent", JSON.stringify(recent));
    
  localLoad;}
if (recent != null) {
  localLoad()};

window.initMap=initMap;
searchBtn.addEventListener('click',search);