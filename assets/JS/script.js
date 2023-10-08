$(function(){

const headers = { 'Authorization': 'Basic QUlEMzE5ZTFiZmJkNGEwYWI5ZDg4YWZlMmNiMGEwNzc0MGQ6YjVjZTYzNjRjNTkzZTVkNWQzMTEwZTU4YWMxYjI0Yjg=' };
var userLocation = {lat: 40.7128, lng: -74.0060};
var input = document.querySelector('#search-bar');
var searchBtn = document.querySelector('#search-button');
var recentSearch = document.getElementById('recent-searches');
var address = document.getElementById('address');
var addressResult = [];
var recent = [];

//Initialize map
let map = google.maps.Map;
async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
   map = new Map(document.getElementById("map"), {
    center: userLocation,
    mapId: "Wifi_map",
    zoom: 12,
  })
}
initMap();

// Geolocation from W3 Schools, modified for this project
function getLocation() { 
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    userLocation.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) { 
  navigator.permissions.query({ name: "geolocation" }).then((result) => {
    if (result.state === "denied") {
      console.log("geolocation denied");
    } else {
      var myLat = position.coords.latitude;
      var myLng = position.coords.longitude; 
      userLocation = { lat: myLat, lng: myLng };
      localStorage.setItem('User Location', JSON.stringify(userLocation)); 
      fetchResults();
    }
    }); 
}
getLocation();

//Fetch results from WiGLE API
function fetchResults(){
    userLocation = JSON.parse(localStorage.getItem('User Location'));
    fetch("https://api.wigle.net/api/v2/network/search?onlymine=false&freenet=true&paynet=false&variance=0.02&closestLat=" + userLocation.lat + "&closestLong=" + userLocation.lng + "&resultsPerPage=10", { headers })
      .then(function(response) {
        return response.json();
        })
      .then(function(data){
        console.log(data);
        map.setCenter({lat:data.results[0].trilat, lng:data.results[0].trilong});
        
        for (let i = 0; i < 10; i++) {
          var lat = data.results[i].trilat
          var lon = data.results[i].trilong
          var wifiName = data.results[i].ssid
          var housenumber = data.results[i].housenumber;
          var road = data.results[i].road
          var postalCode = data.results[i].postalcode;
            
          if (data.results[i].housenumber == null) {
            console.log('incomplete address');
          } else {
          new google.maps.Marker({
            position: {lat: lat,lng: lon},
            icon: "./assets/images/icon.png",
            title: wifiName,
            map});
          window.data=data;
            
          //Appends hotspot location search results
          function appendResults(){
          var searchResultsList = document.getElementById("search-results");
          var card = searchResultsList.appendChild(document.createElement("div"));
          card.classList.add('card', 'col-sm-12', 'col-lg-12');  
          var cardBody = card.appendChild(document.createElement("div"));
          cardBody.classList.add('card-body');
          var cardTitle = cardBody.appendChild(document.createElement("h3"));
          cardTitle.classList.add('card-title');
          var cardIcon = cardBody.appendChild(document.createElement("img"));
          cardIcon = cardTitle.insertAdjacentElement('beforebegin', cardIcon);
          cardIcon.setAttribute("src", "./assets/images/icon.png");
          cardIcon.classList.add('search-icon');
          cardTitle.innerHTML =wifiName;
          var hotspotAddress = cardBody.appendChild(document.createElement("p"));
          hotspotAddress.classList.add('search-result');
          hotspotAddress.innerHTML = housenumber + ' ' + road + ', ' + postalCode;
          }
          appendResults();
          }
        }
      });
}

//Search bar input
function search(event) {
  event.preventDefault();
  console.log('it works!');
  console.log(input.value);
  //Geocodes input into latitude and longitude
  fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + input.value + '&key=AIzaSyCesHKRVi91uiS1swWs0Imn__c0tQZI_jY')
  .then(function(response) {
    return response.json();
    })
  .then(function(data){
    console.log(data);
    userLocation = data.results[0].geometry.location;
    console.log(userLocation);
    fetchResults();
  });
}
searchBtn.addEventListener("click", search);

//   function search(event) {
//     event.preventDefault();
//     console.log(zip.value);
//     //localSave(zip.value);
//   }

// //Fetch from the  wigle API
//   fetch("https://api.wigle.net/api/v2/network/search?onlymine=false&freenet=true&paynet=false&variance=0.02&postalCode=" + zip.value +"&resultsPerPage=10", { headers })
//     .then(function(response) {
//       return response.json();
//      })
//     .then(function(data){
//       console.log(data.results[0].trilat, data.results[0].trilong)

//     map.setCenter({lat:data.results[0].trilat, lng:data.results[0].trilong});

// //The function to save to the local storage

//   function localSave(zip){
//     console.log("local save");
//    var recent = JSON.parse(localStorage.getItem('recent'))
//     if (recent === null || undefined){
//       console.log("save null");
//       var recent = [zip];
//       localStorage.setItem("recent",JSON.stringify(recent));
//       localLoad();
//       return}
//     else{
//       console.log("saving");
//       recent.unshift(zip);
//       console.log("else");};
//     if(recent.length > 5){
//         recent.pop();
//         console.log("load pop");
//         }
//     localStorage.setItem("recent", JSON.stringify(recent));
//     console.log("stored");
    
//     localLoad()};  
  
// // The function for the load of the local Storage    

//     function localLoad(){
//       var recent = JSON.parse(localStorage.getItem("recent"));
//       console.log(recent);
//       document.getElementById("saved-searches").textContent='';
//         for (let i = 0; i < 5 ; i++) {
//           if (recent[i] === null) {
//             console.log("null load");
//       }
//       else {
//       var savedSearchesList = document.getElementById("saved-searches");
//       var savedSearch = savedSearchesList.appendChild(document.createElement("button"));
//       savedSearch.classList.add('saved-search');
//       savedSearch.innerHTML = recent[i];
//       savedSearch.addEventListener('click', search);
//         }
//       }  
//     }

// Initialization functions and event listener
//localLoad();


});