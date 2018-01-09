(function (w, undefined) {
	var maps = document.querySelectorAll('.leaflet-map');
	console.log(maps)
	if (!maps.length) {
		return
	}

	maps.forEach((map) => {
		const id = map.getAttribute('id') || 0
		const lat = map.getAttribute('data-lat') || 0
		const lng = map.getAttribute('data-lng') || 0
		const zoom = map.getAttribute('data-zoom') || 11
		console.log(id, lat, lng, zoom)
		const leaflet_map = L.map(id).setView([lat, lng], zoom)
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(leaflet_map);
		this.marker = L.marker([lat, lng]).addTo(leaflet_map);
	})
})(window)