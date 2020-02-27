let googleAPI = "AIzaSyDKdwsFsIw1STe6Xf2zUFH0Sk8n6YQza40"
window.addEventListener('load', geocode());
function geocode() {
   
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    // const weatherAPI = ``;

 

  axios
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        latlng: `${lat},${long}`,
        key: googleAPI
      }
    })
    .then(response => {
        // log full response
      //console.log(response);

      //location
      let location1 = response.data.results[7].formatted_address;
      let pinLocation1 = document.querySelector("#location1");

    pinLocation1.textContent += location1.padStart();
      
    })
    .catch(error => {
      console.log(error);
    });


    



    axios
    .get(`https://api.darksky.net/forecast/b20a7ac99ea1d93df5831a1541ba3cb6/${lat},${long}`)
    .then(response =>{
        //log response
        //console.log(response);

        //temperature and summary
        let weather1 = document.querySelector('#weather1');
        const {temperature, summary} = response.data.currently;
    
        weather1.innerHTML = `${temperature}F ${summary}`;
    
    }).catch(error =>{
        console.log(error);
    })

});

}

(function geocode2(){
  let address;
  const getAddress = document.querySelector('#submit');
// receiving parsed input value
  function setLocation(){
  const location1 =  document.querySelector('#location');
  address = location1.value;
  console.log(address)
  return address;
  
  }

 // fetching for location
  function getLocation(){
  vL = document.querySelector('#location').value;

  axios
  .get("https://maps.googleapis.com/maps/api/geocode/json", {
    params: {
      address: vL,
      key: "AIzaSyDKdwsFsIw1STe6Xf2zUFH0Sk8n6YQza40",
    }
  })
  .then(response => {
      // log full response
    console.log(response);

      let location2 = response.data.results[0].address_components[0].long_name;
      let pinLocation2 = document.querySelector("#location2");
      pinLocation2.textContent = location2;

      let lat = response.data.results[0].geometry.location.lat;
      let lng = response.data.results[0].geometry.location.lng;

      axios
    .get(`https://api.darksky.net/forecast/b20a7ac99ea1d93df5831a1541ba3cb6/${lat},${lng}`)
    .then(response =>{
        //log response
        //console.log(response);

        //temperature and summary
        const weather2 = document.querySelector('#weather2');
        const {temperature, summary} = response.data.currently;
    
        weather2.innerHTML = `${temperature} F ${summary}`;
    
    }).catch(error =>{
        console.log(error);
    })
    
  })
  .catch(error => {
    console.log(error);
  });

}
  
getAddress.addEventListener('click', () =>{
  setLocation();
  getLocation();
}) 
  


})();
