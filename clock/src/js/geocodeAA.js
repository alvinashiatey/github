const axios = require("axios");

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
  async function googleMapRequest(lat, lng) {
    var googleAPI = "AIzaSyDKdwsFsIw1STe6Xf2zUFH0Sk8n6YQza40";
    await axios
      .get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          latlng: `${lat},${lng}`,
          key: googleAPI
        }
      })
      .then(response => {
        // console.log(response);
        let location1 = response.data.results[5].formatted_address;
        let pinLocation1 = document.querySelector("#location1");

        pinLocation1.textContent += location1.padStart();
      })
      .catch(error => {
        console.log(error);
      });
  }

  async function darkSky(lat, lng) {
    await axios
      .get(
        `https://api.darksky.net/forecast/b20a7ac99ea1d93df5831a1541ba3cb6/${lat},${lng}`
      )
      .then(response => {
        //console.log(response);
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
var UIrequest = (function() {
  let address;
  const getAddress = document.querySelector("#submit");
  // receiving parsed input value
  function setLocation() {
    const location1 = document.querySelector("#location");
    address = location1.value;
    getLocation(address);
  }

  async function getLocation(address) {
    // vL = document.querySelector("#location").value;
    await axios
      .get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: address,
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
            // console.log(response);

            //temperature and summary
            const weather2 = document.querySelector("#weather2");
            const { temperature, summary } = response.data.currently;
            const timeZone = response.data.timezone;
            let celsius = Math.floor(((temperature - 32) * 5) / 9);

            weather2.innerHTML = `${celsius} &#176; ${summary}`;
            timeOffset(timeZone);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Button to call functions
  getAddress.addEventListener("click", setLocation);
  document.addEventListener("keypress", e => {
    if (e.keyCode === 13 || e.which === 13) {
      setLocation();
    }
  });
})();

async function timeOffset(timeZne) {
  await axios
    .get(`http://worldtimeapi.org/api/timezone/${timeZne}`)
    .then(response => {
      const offSet = response.data.utc_offset;
      let newDate = new Date();
      let utc = newDate.getTime() + newDate.getTimezoneOffset() * 60000;
      let nd = new Date(utc + 3600000 * offSet.split(":", 1));
      let dynamicHour = nd.getHours();

      // testing code
      timeChange(dynamicHour);

      // console.log(nd);
    });
}

function timeDisplay() {
  let date, hDate, mDate, sDate;
  date = new Date();
  hDate = date.getHours();
  mDate = date.getMinutes();
  sDate = date.getSeconds();

  if (hDate > 12) {
    hDate -= 12;
  }

  document.title = `${hDate} : ${mDate} : ${sDate}`;
}

setInterval(timeDisplay, 1000);

/*

L
E
F
T

P
A
N
E
L


*/
///////////////////////////////
/////////////////////////////////
