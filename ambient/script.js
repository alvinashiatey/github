setInterval(setGradient, 1000);

let hour = document.querySelector('#hour');

function setGradient () {
    let localDate = new Date();
    let secondsRatio = `${localDate.getSeconds()}`.padStart(2, '0');
    let minutesRatio = `${localDate.getMinutes()}`.padStart(2, '0');
    let hoursRatio = `${localDate.getHours()}`.padStart(2, '0');
    
    if (hoursRatio > 12){
        hoursRatio = localDate.getHours() - 12; 
        hoursRatio = `${hoursRatio}`.padStart(2, '0');
    }
    hour.innerHTML = hoursRatio + ":" + minutesRatio + ":" + secondsRatio;
}

setGradient();