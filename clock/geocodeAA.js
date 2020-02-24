
(function geocode() {
   
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    // const weatherAPI = ``;

    axios
.get(`https://api.darksky.net/forecast/b20a7ac99ea1d93df5831a1541ba3cb6/${lat},${long}`)
.then(response =>{
    //log response
    console.log(response);
    console.log('hi');
    //temperature and summary
    let weather1 = document.querySelector('#weather1');
    const {temperature, summary} = response.data.currently;

    weather1.innerHTML = `${temperature}&deg; ${summary}`;

}).catch(error =>{
    console.log(error);
})

  axios
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        latlng: `${lat},${long}`,
        key: "AIzaSyDKdwsFsIw1STe6Xf2zUFH0Sk8n6YQza40"
      }
    })
    .then(response => {
        // log full response
      console.log(response);

      //location
      let location1 = response.data.results[7].formatted_address;
      let pinLocation1 = document.querySelector("#location1");

    pinLocation1.textContent = location1;
      
    })
    .catch(error => {
      console.log(error);
    });


});

})();

