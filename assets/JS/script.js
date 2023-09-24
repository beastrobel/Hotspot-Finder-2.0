//get the recent list to add zip and address
// populate the recent searches with the recent searches
//make recent searches clickable to recall searches
let map;
const headers = {'Authorization': 'Basic QUlEZjQ2ZjQ2MmI1ZTZiMjZiYTc3YTFjMjBkM2Y5ZTE5ZmM6ZjIzZGFlMzdlOGQ2OGNlNGQzYmVhMzFmOGExZDk1ZTY='}
var myPosition = {lat: 42.68348312,lng: -84.50691223};
var zip = document.querySelector("#search-bar");
var searchBtn = document.querySelector("#search-button");
var recentSearch = document.getElementById('recent-searches');
var address = document.getElementById('address');
var addressResult = [];
var recent = [];


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
  

  localSave(zip.value)
  console.log(zip.value,"zip");
  fetch("https://api.wigle.net/api/v2/network/search?onlymine=false&freenet=true&paynet=false&variance=0.02&postalCode="+zip.value+"&resultsPerPage=10", { headers })
  

    .then(function(response) {
      return response.json();
     })
    .then(function(data){
      console.log(data.results[0].trilat, data.results[0].trilong)

    map.setCenter({lat:data.results[0].trilat, lng:data.results[0].trilong});
    document.getElementById("address").textContent='';
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

        var li = document.createElement('a')
        li.className = "href = './assets/images/icon.png'"
        var streetAddress = document.createElement('addressName')
        var name = document.createElement('streetAddress')

        name.innerHTML = houseNumber + ' ' + road + ',' + cityName + ',' + state + ' ' + postalCode + ' ';
        streetAddress.innerHTML = wifiName+' ';
        li.classList.add('card','col-sm-12','col-lg-6','card-body',)
        streetAddress.classList.add('card-title')
        
        li.appendChild(streetAddress);
        li.appendChild(name);
        
        
        address.appendChild(li);

        

      }

      

      
})}


function localLoad(){
  var recent = JSON.parse(localStorage.getItem("recent"));
  console.log("local load");

  if (recent === null) {
    console.log("null load");
    return
    
  }
  document.getElementById('recent-searches').textContent=''
    for (let i = 0; i < 5 ; i++) {
    var li = document.createElement('a');
    li.className = 'search';

    var postal = document.createElement('postalCode');
    postal.innerHTML = recent[i];
    postal.className =('list-group-item list-group-item-action'); 

    li.append(postal);
    recentSearch.appendChild(li); 
    
    zip.value = recent[i];
    postal.addEventListener('click', search)
    };}



function localSave(zip){
  console.log("local save");
 var recent = JSON.parse(localStorage.getItem('recent'))
  if (localStorage.getItem('recent') === null || undefined){
    console.log("save null");
    var recent = [zip];
    localStorage.setItem("recent",JSON.stringify(recent));
    localLoad();
    return}
  else{
    console.log("saving");
    recent.unshift(zip)
    console.log("else");};
  if(recent.length > 5){
      recent.pop()
      console.log("load pop");;
      }
  localStorage.setItem("recent", JSON.stringify(recent));
  console.log("stored");
  localLoad()};  

  localLoad()

window.initMap=initMap;
searchBtn.addEventListener("click", search);