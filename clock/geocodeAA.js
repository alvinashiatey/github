let googleAPI;
googleAPI = "AIzaSyDKdwsFsIw1STe6Xf2zUFH0Sk8n6YQza40";

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
    axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        latlng: `${lat},${lng}`,
        key: googleAPI
      }
    })
    .then(response => {
        console.log(response);
        let location1 = response.data.results[7].formatted_address;
        let pinLocation1 = document.querySelector("#location1");

        pinLocation1.textContent += location1.padStart();
    })
    .catch(error => {
        console.log(error);
      });
  }

  function darkSky(lat, lng){
    axios
      .get(
        `https://api.darksky.net/forecast/b20a7ac99ea1d93df5831a1541ba3cb6/${lat},${lng}`
      )
      .then(response => {  
          console.log(response);
          let weather1 = document.querySelector("#weather1");
        const { temperature, summary } = response.data.currently;

        let celsius = Math.floor(((temperature - 32) * 5) / 9);

        weather1.innerHTML = `${celsius}&#176; ${summary}`;
      })
      .catch(error => {
        console.log(error);
      });
  }

})();



/// fine tune into modules 
(function geocode2() {
  let address;
  const getAddress = document.querySelector("#submit");
  // receiving parsed input value
  function setLocation() {
    const location1 = document.querySelector("#location");
    address = location1.value;
    console.log(address);
    return address;
  }

  // fetching for location
  function getLocation() {
    vL = document.querySelector("#location").value;

    axios
      .get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: vL,
          key: "AIzaSyDKdwsFsIw1STe6Xf2zUFH0Sk8n6YQza40"
        }
      })
      .then(response => {
        // log full response
        //console.log(response);

        let location2 =
          response.data.results[0].address_components[0].long_name;
        let pinLocation2 = document.querySelector("#location2");
        pinLocation2.textContent = location2;

        let lat = response.data.results[0].geometry.location.lat;
        let lng = response.data.results[0].geometry.location.lng;

        axios
          .get(
            `https://api.darksky.net/forecast/b20a7ac99ea1d93df5831a1541ba3cb6/${lat},${lng}`
          )
          .then(response => {
            //log response
            console.log(response);

            //temperature and summary
            const weather2 = document.querySelector("#weather2");
            const { temperature, summary } = response.data.currently;
            const timeZone = response.data.timezone;
            let celsius = Math.floor(((temperature - 32) * 5) / 9);

            weather2.innerHTML = `${celsius} &#176; ${summary}`;

            axios
              .get(`http://worldtimeapi.org/api/timezone/${timeZone}`)
              .then(response => {
                const offSet = response.data.utc_offset;
                let newDate = new Date();
                let utc =newDate.getTime() + newDate.getTimezoneOffset() * 60000;
                let nd = new Date(utc + 3600000 * offSet.split(":", 1));
                let dynamicHour = nd.getHours()
                console.log(nd)
                let sceneCanvasBg, backgroundCanvas;
                sceneCanvasBg = document.querySelector("#scene-container");
                backgroundCanvas = [
                  "skyblue",
                  "#0059b3",
                  "#004d99",
                  "#001a33",
                  "#000d1a",
                  "#02020b"
                ];

                if (dynamicHour  >= 6 && dynamicHour <= 10){
                  sceneCanvasBg.style.backgroundColor = backgroundCanvas[0];
                } else if (dynamicHour  >= 11 && dynamicHour >= 13){
                  sceneCanvasBg.style.backgroundColor = backgroundCanvas[1];
                } else if (dynamicHour  >= 14 && dynamicHour >= 17){
                  sceneCanvasBg.style.backgroundColor = backgroundCanvas[2];
                } else if (dynamicHour  >= 18 && dynamicHour >= 23){
                  sceneCanvasBg.style.backgroundColor = backgroundCanvas[4];
                }else{
                  sceneCanvasBg.style.backgroundColor = backgroundCanvas[5];
                }







              });
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  function newtime() {}

  // Button to call functions
  getAddress.addEventListener("click", () => {
    setLocation();
    getLocation();
    newtime();
  });
})();
