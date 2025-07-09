// List of visited countries and images
const visitedCountries = {
  "US": "SabaJazi.github.io/imgs/us.jpg",
  "FR": "imgs/france.jpg",
  "JP": "imgs/japan.jpg"
};

// Map init
const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);

// Load GeoJSON world borders
$.getJSON("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json", function(data) {
  L.geoJSON(data, {
    style: function(feature) {
      const countryCode = feature.properties.iso_a2;
      // Highlight visited countries in green, others in gray
      return {
        color: "#333",
        fillColor: visitedCountries[countryCode] ? "#2ecc71" : "#ccc",
        fillOpacity: 0.6,
        weight: 1
      };
    },
    onEachFeature: function(feature, layer) {
      const countryCode = feature.properties.iso_a2;

      // If visited, bind popup immediately
      if (visitedCountries[countryCode]) {
        const img = visitedCountries[countryCode];
        layer.bindPopup(`<strong>${feature.properties.name}</strong><br><img src="${img}" alt="${feature.properties.name}" />`);
      }

      // Add click functionality
      layer.on('click', function() {
        if (visitedCountries[countryCode]) {
          layer.openPopup();
        } else {
          visitedCountries[countryCode] = "imgs/default.jpg"; // fallback image
          layer.setStyle({ fillColor: "#2ecc71" });
          alert(`${feature.properties.name} marked as visited. Add an image to visitedCountries if desired.`);
        }
      });
    }
  }).addTo(map);
});
