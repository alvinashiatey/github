// displaying received datat on UI

//geolocating
var geoLocate = (function() {
  navigator.geolocation.getCurrentPosition(getLocation);

  function getLocation(position) {
    var geoLo = {
      lat: position.coords.latitude,
      long: position.coords.longitude
    };
    googleMapRequest(geoLo.lat, geoLo.long);
    darkSky(geoLo.lat, geoLo.long);
  }

  // fetching data from Api
  function googleMapRequest(lat, lng) {
    var googleAPI = "AIzaSyDKdwsFsIw1STe6Xf2zUFH0Sk8n6YQza40";
    axios
      .get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          latlng: `${lat},${lng}`,
          key: googleAPI
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function darkSky(lat, lng) {
    axios
      .get(
        `https://api.darksky.net/forecast/b20a7ac99ea1d93df5831a1541ba3cb6/${lat},${lng}`
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
})();
