// fetching data from Api
// displaying received datat on UI

//geolocating 

var geoLocate = (function (){

    var gAPI ="AIzaSyDKdwsFsIw1STe6Xf2zUFH0Sk8n6YQza40";



    navigator.geolocation.getCurrentPosition(position =>{
    var geoLo = {
            lat : position.coords.latitude,
            long : position.coords.longitude
        }
        return geoLo
                        
        })
  
        console.log(geoLo);

    

})();


var Pol = (function(Gel){

var Pal = Gel;
console.log(Pal)
    
})(geoLocate);

