const kyivCoordinates = [50.45, 30.52];
const zoomLevel = 13;
const layerTemplate = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const locationUrl = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=`;

const [form] = document.forms;
const feedback = form.lastElementChild;
const map = leaflet.map('map');
const layer = leaflet.tileLayer(layerTemplate);
let marker;

map.setView(kyivCoordinates, zoomLevel);

layer.addTo(map);

map.on('click', console.log);
form.addEventListener('submit', handleSearch);

async function handleSearch(e) {
    e.preventDefault();

    const query = form.query.value.trim();

    if (!query) return;

    const location = await getLocation(query);

    if (!location) {
        feedback.textContent = 'Location not found';
        return;
    }

    feedback.textContent = '';
    form.reset();
    goTo(location);
}

function goTo(location) {
    const coordinates = [+location.lat, +location.lon];

    map.setView(coordinates);
    addMarker(coordinates);
}

async function getLocation(query) {
    const url = locationUrl + encodeURIComponent(query);
    const response = await fetch(url);
    const [location] = await response.json();

    return location;
}

function addMarker(coordinates) {
    if (marker) map.removeLayer(marker);

    marker = leaflet.marker(coordinates)

    marker.addTo(map);
}

