(function () {
    const lat = 20.223653;
    const lng = -97.947119;
    const leafletMap = l.map('map').setView([lat,lng], 16);

    L.titleLayer('https://{S}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        atributtion:'&copy; <a href="https://www.openstreetmap.org/copyright>OpenStreetMap</a> Contributors"'
    }).addTo(leafletMap);
})();