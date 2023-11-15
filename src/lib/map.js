(function () {
    const lat = 20.223653;
    const lng = -97.947119;
    const map = L.map('map').setView([lat, lng], 16);
    let marker
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);  
    marker = new L.marker([lat,lng], {
        draggable: true,
        autoPan: true,
    }).addTo(map);  

    //TODO obtener lat y lng del marker
    marker.on('moveend', function(e){
    marker=e.target
    const position = marker.getLatLng()
        console.log(`El usuario solto el marcador en las siguientes cordenadas: ${position.lat},${position.lng}`)
        map.panTo(new L.LatLng(position.lat, position.lng))
    })
    //TODO obtener la información de la dirección fisica
    geocodeService.reverse().latLng(position, 13).run(function(error, result)
    {
        console.log(`La información calculada por geocoder al intentar hacer la georeferencia inversa es: ${result}`)
        marker.bind.Popup(result.address.LongLabel)
        document.querySelector('.street').textContent=result.address?.Address ?? '';
        document.querySelector('#street').value=result.address?.Address ?? '';
        document.querySelector('#lat').value=result.address?.Address ?? '';
        document.querySelector('#lng').value=result.address?.Address ?? '';

    })

})();
//geocoder , leaflet y sri libreias obligadas para trabajar con LEAFLET VER EN CREATE.PUG

