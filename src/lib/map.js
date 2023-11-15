(function () {
    const lat = 20.223653;
    const lng = -97.947119;
    const map = L.map('map').setView([lat, lng], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);  
    L.marker([lat, lng]).addTo(map)
    .bindPopup('MI CASA.<br> NEFTAHOUSE.')
    .openPopup();      
})();

