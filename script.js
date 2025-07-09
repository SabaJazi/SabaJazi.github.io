// List of visited countries and their image paths
const visitedCountries = {
  "US": "imgs/us.jpg",
  "FR": "imgs/france.jpg",
  "JP": "imgs/japan.jpg"
};

// Initialize the map
const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);

// Load GeoJSON world borders
$.getJSON("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json", function(data) {
  L.geoJSON(data, {
    style: function(feature) {
      const code = feature.id; // <-- use feature.id instead of iso_a2
      return {
        color: "#333",
        fillColor: visitedCountries[code] ? "#2ecc71" : "#ccc",
        fillOpacity: 0.6,
        weight: 1
      };
    },
    onEachFeature: function(feature, layer) {
      const code = feature.id; // <-- match the same code key here

      // Pre-bind popup if visited
      if (visitedCountries[code]) {
        const img = visitedCountries[code];
        layer.bindPopup(`<strong>${feature.properties.name}</strong><br><img src="${img}" alt="${feature.properties.name}" width="150"/>`);
      }

      layer.on('click', function() {
        if (visitedCountries[code]) {
          layer.openPopup();
        } else {
          // Mark dynamically as visited
          visitedCountries[code] = "imgs/default.jpg"; // placeholder image
          layer.setStyle({ fillColor: "#2ecc71" });
          alert(`${feature.properties.name} marked as visited. Add an image to visitedCountries if desired.`);
        }
      });
    }
  }).addTo(map);
});
