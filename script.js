// DOM elems
const adressInput = document.getElementById('adressInfo');
const button = document.querySelector('#form');
const ipAdress = document.querySelector('#ipAdress');
const city = document.querySelector('#location');
const timezone = document.querySelector('#timezone');
const isp = document.querySelector('#isp');


// Events
button.addEventListener('submit', (evt) => {
  
  const regex = /\D/;
  let domain = '';
  console.log(adressInput);
  const apiKey = 'at_OQBifi7wE5UKnJSsAomiphaW9e9P9';
  let ipAdress = '';
  console.log(adressInput.value.match(regex))
  if (adressInput.value.match(regex)) {
    domain = adressInput.value;
  } else {
    ipAdress = adressInput.value;
  }
  const url = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipAdress}&domain=${domain}`
  getIp(url);
  evt.preventDefault();
})

// API
// leaflet
// Подключаем карту, setView([lat, lon], zoom level)
const mymap = L.map('mapid', {zoomControl: false}).setView([0, 0], 5);
// Для копирайта
const attribution =  
  '&copy; Map data &copy; <a href="https://www.google.com/help/legalnotices_maps/">Google Maps</a> contributors';
const maxZoom = 20;
const subdomains = ['mt0','mt1','mt2','mt3'];

// АПИ карты (можно выбирать разные источники)
const tileUrl = 'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
const tiles = L.tileLayer(tileUrl, {attribution, maxZoom, subdomains})
tiles.addTo(mymap);

// Делаем кастомную иконку маркера на карте
const myIcon = L.icon({
      iconUrl: 'images/icon-location.svg',
      });

// Ставим маркер по умолчанию (до выполнения функции по поиску коорд)
const marker = L.marker([0, 0], {icon: myIcon}).addTo(mymap);


// IP Geolocation API
  
async function getIp(url){
console.log(url);
const response = await fetch(url);
const data = await response.json();
console.log(data);
try{
  let lat = data.location.lat;
let lon = data.location.lng;
console.log(lat,lon);

// Ставим маркер там, где находится спутник после выполнения функции по поиску коорд. 
marker.setLatLng([lat,lon]);
mymap.setView([lat, lon],15);
ipAdress.textContent = data.ip;
city.textContent = data.location.city + ', ' + data.location.region + ' ' + data.location.postalCode;
timezone.textContent = 'UTC' + data.location.timezone;
isp.textContent = data.isp;
} catch(e){
  alert(`Code: ${data.code},
Message: ${data.messages}`);
}


};