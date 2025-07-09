// Visited countries with image paths (use 2-letter ISO codes from GeoJSON 'id' field)
const visitedCountries = {
  "US": "imgs/us.jpg",
  "TR": "imgs/japan.jpg",
  "IR": "imgs/france.jpg"
};

// Initialize map
const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);

// Load country borders GeoJSON
$.getJSON("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json", function(data) {
  L.geoJSON(data, {
    style: function(feature) {
      const code = feature.id;
      return {
        color: "#333",
        fillColor: visitedCountries[code] ? "#2ecc71" : "#ccc", // green if visited, grey otherwise
        fillOpacity: 0.6,
        weight: 1
      };
    },
    onEachFeature: function(feature, layer) {
      const code = feature.id;

      // Only make visited countries interactive
      if (visitedCountries[code]) {
        const imgPath = visitedCountries[code];
        const popupHtml = `
          <strong>${feature.properties.name}</strong><br>
          <img src="${imgPath}" alt="${feature.properties.name}" width="150" style="border-radius: 8px;" />
        `;
        layer.bindPopup(popupHtml);

        // Optional: open on click
        layer.on('click', function () {
          layer.openPopup();
        });
      }
    }
  }).addTo(map);
});
