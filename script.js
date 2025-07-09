// List of visited countries and images
const visitedCountries = {
  "US": "imgs/us.jpg",
  "FR": "imgs/france.jpeg",
  "JP": "imgs/japan.jpeg"
};

// Map init
const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);

// Load GeoJSON world borders
$.getJSON("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json", function(data) {
  L.geoJSON(data, {
    style: feature => {
      return {
        color: "#333",
        fillColor: visitedCountries[feature.properties.iso_a2] ? "#2ecc71" : "#ccc",
        fillOpacity: 0.6,
        weight: 1
      };
    },
    onEachFeature: (feature, layer) => {
      const countryCode = feature.properties.iso_a2;
      layer.on('click', function() {
        if (visitedCountries[countryCode]) {
          const img = visitedCountries[countryCode];
          layer.bindPopup(`<strong>${feature.properties.name}</strong><br><img src="${img}" alt="${feature.properties.name}" />`).openPopup();
        } else {
          // If not visited, mark as visited dynamically
          visitedCountries[countryCode] = "imgs/default.jpg"; // placeholder
          layer.setStyle({ fillColor: "#2ecc71" });
          alert(`${feature.properties.name} marked as visited. Add an image in your JS to customize.`);
        }
      });
    }
  }).addTo(map);
});
