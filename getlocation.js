// only show the image map of current location 

getLocation();

function getLocation() {
	// Check if Geolocation is supported
	// If supported, run the getCurrentPosition() method. If not, display a message to the user
	if (navigator.geolocation) {
		var x = document.getElementById("mapholder");
		
		// If the getCurrentPosition() method is successful, it returns a coordinates object to the function specified in the parameter
		navigator.geolocation.getCurrentPosition(
			function(pos) {
				var latitude = pos.coords.latitude;
				var longitude = pos.coords.longitude;
				var latlon =  latitude + "," + longitude;

				var img_url = "https://maps.googleapis.com/maps/api/staticmap?center=" + latlon + "&zoom=14&size=400x300&sensor=false&key=AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU";
				// x.innerHTML = "<p>" + latlon + "</p>";
				x.innerHTML = "<img src='" + img_url + "'>";
			}, 
			function(error) {
				switch (error.code) {
					case error.PERMISSION_DENIED:
						console.log("User denied the request for Geolocation.");
						break;

					case error.POSITION_UNAVAILABLE:
						console.log("Location information is unavailable.");
						break;

					case error.TIMEOUT:
						console.log("The request to get user location timed out.");
						break;

					case error.UNKNOWN_ERROR:
						console.log("An unknown error occurred.");
						break;
				}
			}
		);

	} else {
		console.log("Geolocation is not supported by this browser.");
	}
}