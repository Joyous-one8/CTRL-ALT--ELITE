let map;
let userMarker;
let facilityMarkers = [];

function initMap() {
    map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLocation = [position.coords.latitude, position.coords.longitude];
            map.setView(userLocation, 13);

            userMarker = L.marker(userLocation).addTo(map)
                .bindPopup('Your Location')
                .openPopup();
        }, () => {
            alert('Geolocation failed. Please allow location access.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function updateRadiusValue() {
    const radius = document.getElementById('radius').value;
    document.getElementById('radius-value').innerText = radius;
}

function findFacilities() {
    const selectedType = document.getElementById('facility-type').value;
    const radius = document.getElementById('radius').value * 1000; // Convert km to meters

    // Clear previous markers
    facilityMarkers.forEach(marker => map.removeLayer(marker));
    facilityMarkers = [];

    // Define Overpass API query
    const query = `
        [out:json];
        node["amenity"="${selectedType}"](around:${radius},${map.getCenter().lat},${map.getCenter().lng});
        out body;
    `;

    fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            data.elements.forEach(element => {
                const marker = L.marker([element.lat, element.lon])
                    .addTo(map)
                    .bindPopup(element.tags.name || 'Unknown name');
                facilityMarkers.push(marker);
            });
        })
        .catch(error => {
            console.error('Error fetching data from Overpass API:', error);
        });
}

document.addEventListener("DOMContentLoaded", initMap);