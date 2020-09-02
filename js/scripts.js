mapboxgl.accessToken = 'pk.eyJ1IjoicGlsZG9uaWNoIiwiYSI6IlNnXzJKU0UifQ.7bFIPCuWgQkCWvrBKg7_uQ';
var map = new mapboxgl.Map ({
	container: 'map',
	style: 'mapbox://styles/mapbox/light-v10',
	zoom: 16, // starting zoom
	center: [82.862601, 54.986764], // starting position
	pitch: 35, // Наклон карты
	bearing: 27.6 // Поворот карты
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

map.on('load', function() {

	var layers = map.getStyle().layers;
 
	var labelLayerId;
	for (var i = 0; i < layers.length; i++) {
		if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
			labelLayerId = layers[i].id;
			break;
		}
	}

	map.addLayer({
		'id': '3d-buildings',
		'source': 'composite',
		'source-layer': 'building',
		'filter': ['==', 'extrude', 'true'],
		'type': 'fill-extrusion',
		'minzoom': 15,
		'paint': {
			'fill-extrusion-color': '#aaa',
 
			// use an 'interpolate' expression to add a smooth transition effect to the
			// buildings as the user zooms in
			'fill-extrusion-height': [
				'interpolate',
				['linear'],
				['zoom'],
				15,
				0,
				15.05,
				['get', 'height']
			],
			'fill-extrusion-base': [
				'interpolate',
				['linear'],
				['zoom'],
				15,
				0,
				15.05,
				['get', 'min_height']
			],
			'fill-extrusion-opacity': 0.6
		}
	},
	labelLayerId
	);

	map.addLayer({ 
		"id": "points",
		"type": "symbol",
		"source": {
			"type": "geojson",
			"data": points
		},
		"layout": {
			"icon-image": "{icon}-15",
			"text-field": "{title}",
			"text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
			"text-offset": [0, 0.6],
			"text-anchor": "top"
		}
	});

	// When a click event occurs on a feature in the places layer, open a popup at the
	// location of the feature, with description HTML from its properties.
	map.on('click', 'points', function(e) {
		var coordinates = e.features[0].geometry.coordinates.slice();
		var description = e.features[0].properties.description;
 
		// Ensure that if the map is zoomed out such that multiple
		// copies of the feature are visible, the popup appears
		// over the copy being pointed to.
		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
		coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
		}
 
		new mapboxgl.Popup()
			.setLngLat(coordinates)
			.setHTML(description)
			.addTo(map);
	});
 	
	// Change the cursor to a pointer when the mouse is over the places layer.
	map.on('mouseenter', 'points', function() {
		map.getCanvas().style.cursor = 'pointer';
	});
 
	// Change it back to a pointer when it leaves.
	map.on('mouseleave', 'points', function() {
		map.getCanvas().style.cursor = '';
	});

/*
	var toggleLayer = ['points'];

	for(let i = 0; i < toggleLayer.length; i++) {
		let id = toggleLayer[i];
		var link = document.createElement('a');
		link.href = '#';
		link.className = 'active';
		link.textContent = id;


		link.textContent = (e) => {
			let clickLayer = this.textContent;
			e.preventDefault();
			e.stopPropagation();

			let visibility = map.getLayoutProperty(clickLayer, 'visibility');

			if (visibility === 'visible') {
				map.setLayoutProperty(clickLayer, 'visibility', 'none');
				this.className = '';
		    } else {
		    	this.className = 'active';
		    	map.setLayoutProperty(clickLayer, 'visibility', 'visible');
		    }
		    var layers = document.getElementByid('menu');
		    layers.appendChild(link);

		}
	}

*/
})
