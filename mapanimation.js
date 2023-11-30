let map;

const markers = [];

document.addEventListener('DOMContentLoaded', initMap);

function initMap() {
    // Set the initial position and zoom level for the map
    const initialPosition = { lat: 42.3601, lng: -71.11 }; // Example: Coordinates for Boston, MA
    const mapOptions = {
        center: initialPosition,
        zoom: 14
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    run();
}

function move() {
    // Example: Set the map to a new location
    const newPosition = { lat: 42.373611, lng: -71.109733 }; // Example: Coordinates for Harvard University
    map.panTo(newPosition);
}

async function run(){
  const locations = await getBusLocations();
  console.log(new Date());
  console.log(locations);

  clearMarkers();

  locations.forEach(bus => {
    const busPosition = {
        lat: parseFloat(bus.attributes.latitude),
        lng: parseFloat(bus.attributes.longitude)
    };

    addMarker(busPosition);
});

  setTimeout(run, 15000);
}

async function getBusLocations(){
  const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
  const response = await fetch(url);
  const json     = await response.json();
  return json.data;
}

function addMarker(position) {
    const marker = new google.maps.Marker({
        position: position,
        map: map,
        title: 'Bus'
    });

    markers.push(marker);
}
function clearMarkers() {
    markers.forEach(marker => {
        marker.setMap(null);
    });

    markers.length = 0;
}
