// show interactive google map of current location with a marker, zoop and drag options

getGoogleMap();

function getGoogleMap() {
	// Check if Geolocation is supported
	// If supported, run the getCurrentPosition() method. If not, display a message to the user
	if (navigator.geolocation) {
		var info = document.getElementById("locAddr");
		var mapCanvas = document.getElementById("mapholder2");
		var address
		var city
		var country

		// If the getCurrentPosition() method is successful, it returns a coordinates object to the function specified in the parameter
		navigator.geolocation.getCurrentPosition(showPosition, showError);

		function getLocationAddress(lat, lng) {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&sensor=true", false);
			xhr.send();

			var resp = JSON.parse(xhr.response);
			console.log(resp);
			address = resp.results[0].formatted_address;
			// city = resp.results[0].address_components[6].long_name;
			// country = resp.results[0].address_components[8].long_name;

			// info.innerText = city + ", " + country;
		}

		function showPosition(pos) {
			var latitude = pos.coords.latitude;
			var longitude = pos.coords.longitude;
			// set the latitude and longitude for google map
			var latlon =  new google.maps.LatLng(latitude, longitude); 	
			
			// getting the location address based on latitude and longitude (reverse geocoding)
			getLocationAddress(latitude, longitude);

			// setting the map
			mapCanvas.style.height = "600px";
			mapCanvas.style.width = "960px";

			// variable object to define the map properties
			var mapOptions = {
			    center: latlon,	// where to center the map (using latitude and longitude)
			    zoom: 18,		// specifies the zoom level for the map
			    mapTypeId: google.maps.MapTypeId.ROADMAP,		// map type view, can be ROADMAP, SATELLITE, HYBRID, TERRAIN
			    mapTypeControl: true,	// display/hide Map and Satelite control on the map
			    navigationControlOptions: {style:google.maps.NavigationControlStyle.SMALL}
		    };

			// place the map with defined map properties on the html document
		    var map = new google.maps.Map(mapCanvas, mapOptions);
		    // place the marker on the map
		    var marker = new google.maps.Marker({
		    	position: latlon, 
		    	// animation: google.maps.Animation.BOUNCE,
		    	title: "You are here!",
		    	// map: map
		    });
		    marker.setMap(map);

		    // put some note on the marker
		    var infoWindow = new google.maps.InfoWindow({content: address});
		    infoWindow.open(map, marker);

		    // attached an event handler on the marker 
		    // zoom when clicking on the marker
		    google.maps.event.addListener(marker, "click", function() {
		    	// save the zoom level
		    	var zoom = map.getZoom();

		    	map.setZoom(22);
		    	map.setCenter(marker.getPosition());

		    	// show info window when clicking on the marker
		    	// infoWindow.open(map, marker);

		    	// after 3 seconds set back the zoom level
		    	window.setTimeout(function() {map.setZoom(zoom);}, 3000);
		    });

		    // add an event click to map
		    google.maps.event.addListener(map, "click", function(event) {
		    	placeMarker(map, event.latLng);
		    });

		    function placeMarker(map, location) {
		    	var marker = new google.maps.Marker({position: location, map: map});
		    	var infoWindow = new google.maps.InfoWindow({content: "Latitude: " + location.lat() + "<br>Longitude: " + location.lng()});
		    	infoWindow.open(map, marker);
		    }
		}

		function showError(error) {
			switch (error.code) {
				case error.PERMISSION_DENIED:
					// console.log("User denied the request for Geolocation.");
					info.innerText = "User denied the request for Geolocation.";
					break;

				case error.POSITION_UNAVAILABLE:
					// console.log("Location information is unavailable.");
					info.innerText = "Location information is unavailable.";
					break;

				case error.TIMEOUT:
					// console.log("The request to get user location timed out.");
					info.innerText = "The request to get user location timed out.";
					break;

				case error.UNKNOWN_ERROR:
					// console.log("An unknown error occurred.");
					info.innerText = "An unknown error occurred.";
					break;
			}
		}

	} else {
		// console.log("Geolocation is not supported by this browser.");
		info.innerText = "Geolocation is not supported by this browser.";
	}
}