const kyivCoordinates = [50.45, 30.52];
const zoomLevel = 13;
const layerTemplate = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const map = leaflet.map('map');
const layer = leaflet.tileLayer(layerTemplate);
let marker;

map.setView(kyivCoordinates, zoomLevel);

layer.addTo(map);

map.on('click', console.log);
