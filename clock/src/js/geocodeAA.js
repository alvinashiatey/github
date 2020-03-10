const axios = require("axios");
const THREE = require("three");

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

////// left panel

let sunContainer, sunScene, sunCamera, sunRenderer, sunMesh;

let localDate = new Date();
let localHour = localDate.getHours();

function startSun() {
  sunContainer = document.querySelector("#sun-container");
  sunScene = new THREE.Scene();

  sunCameraCreated();
  sunRendereCreated();
  sunMeshCreated();
  setBackgroundColor();
  //   sunControlsCreated();
  sunLightCreated();

  sunRenderer.setAnimationLoop(() => {
    animateSun();
    renderSun();
  });
}

// sunCameraCreated function
function sunCameraCreated() {
  const fv = 55;
  const aspct = sunContainer.clientWidth / sunContainer.clientHeight;
  const nr = 0.1;
  const fr = 100;
  sunCamera = new THREE.PerspectiveCamera(fv, aspct, nr, fr);
  sunCamera.position.set(0, 0, 10);
}

//renderer function created
function sunRendereCreated() {
  sunRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  sunRenderer.setSize(sunContainer.clientWidth, sunContainer.clientHeight);
  sunRenderer.setPixelRatio(window.devicePixelRatio);

  //set the gamm and engine corrections
  sunRenderer.gammaFactor = 2.2;
  sunRenderer.gammaOutput = true;
  sunRenderer.physicallyCorrectLights = true;

  sunContainer.appendChild(sunRenderer.domElement);

  //resize animation when window size changes
  window.addEventListener("resize", () => {
    sunRenderer.setSize(sunContainer.clientWidth, sunContainer.clientHeight);
    sunCamera.aspect = sunContainer.clientWidth / sunContainer.clientHeight;
    sunCamera.updateProjectionMatrix();
  });
}

//sunMesh Function
function sunMeshCreated() {
  const sunGeometry2 = new THREE.SphereBufferGeometry(2, 20, 20);

  // load sun texture
  sunTextureLoader2 = new THREE.TextureLoader();
  sunTexture2 = sunTextureLoader2.load("moon.jpg");

  //encoding
  sunTexture2.encoding = THREE.sRGBEncoding;
  sunTexture2.anisotropy = 16;

  //Material and coloring of obj
  const sunMaterial2 = new THREE.MeshStandardMaterial({
    map: sunTexture2,
    displacementMap: sunTexture2,
    displacementScale: 0.1
  });

  const sunGeometry = new THREE.SphereBufferGeometry(2, 20, 20);

  // load sun texture
  sunTextureLoader = new THREE.TextureLoader();
  sunTexture = sunTextureLoader.load("sun.jpg");

  //encoding
  sunTexture.encoding = THREE.sRGBEncoding;
  sunTexture.anisotropy = 16;

  //Material and coloring of obj
  const sunMaterial = new THREE.MeshStandardMaterial({
    map: sunTexture,
    displacementMap: sunTexture,
    displacementScale: 0.1
  });

  //creating the object by combining the geometry and material
  sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
  sunMesh2 = new THREE.Mesh(sunGeometry2, sunMaterial2);

  sunMesh2.position.set(0, 0, -200);

  sunMesh.position.set(0, 0, 0);

  sunScene.add(sunMesh);
  sunScene.add(sunMesh2);
}

//orbital control function
// function sunControlsCreated() {
//   sunControls = new THREE.OrbitControls(sunCamera, sunContainer);
// }

// sun Light Created
function sunLightCreated() {
  //light
  const sunLight = new THREE.DirectionalLight(0xffffff, 4);
  sunLight.position.set(10, 10, 10);
  sunScene.add(sunLight);

  const sunLightAmbient = new THREE.AmbientLight(0xaaaaaa, 0.5);
  sunScene.add(sunLightAmbient);
}

//animated
function animateSun() {
  //test

  sunMesh2.rotation.x -= 0.002;
  sunMesh2.rotation.y -= 0.002;
  sunMesh2.rotation.z -= 0.002;

  //   const localDate = new Date();

  //   const localHour = localDate.getHours();
  if (localHour >= 6 && localHour <= 18) {
    sunMesh.rotation.x -= 0.002;
    sunMesh.rotation.y -= 0.002;
    sunMesh.rotation.z -= 0.002;
  } else {
    sunMesh2.rotation.x -= 0.001;
    sunMesh2.rotation.y -= 0.001;
    sunMesh2.rotation.z -= 0.001;
  }
}

function setBackgroundColor() {
  let sunCanvasBg, backgroundCanvas;
  sunCanvasBg = document.querySelector("#sun-container");
  backgroundCanvas = [
    "skyblue",
    "#0059b3",
    "#004d99",
    "#001a33",
    "#000d1a",
    "#02020b"
  ];

  if (localHour >= 6 && localHour <= 10) {
    sunCanvasBg.style.backgroundColor = "skyblue";
    sunMesh.position.set(0, -8, 0);
    anime({
      targets: sunMesh.position,
      keyframes: [{ y: -1 }, { y: 0 }],
      delay: -10,
      duration: 10000,
      easing: "cubicBezier(0.405, 0.005, 0.35, 1)"
    });
  } else if (localHour >= 11 && localHour <= 13) {
    sunCanvasBg.style.backgroundColor = backgroundCanvas[1];
  } else if (localHour >= 14 && localHour <= 17) {
    sunCanvasBg.style.backgroundColor = backgroundCanvas[2];
  } else if (localHour >= 18 && localHour <= 23) {
    sunCanvasBg.style.backgroundColor = backgroundCanvas[4];
    anime({
      targets: sunMesh.position,
      keyframes: [{ y: 0 }, { y: 9 }],
      delay: 0,
      duration: 10000,
      easing: "cubicBezier(0.405, 0.005, 0.35, 1)"
    });
    anime({
      targets: sunMesh2.position,
      keyframes: [{ z: -200 }, { z: 0 }],
      delay: 0,
      duration: 15000,
      easing: "cubicBezier(0.405, 0.005, 0.35, 1)"
    });
  } else {
    sunCanvasBg.style.backgroundColor = backgroundCanvas[5];
    sunMesh2.position.set(0, 0, 0);
    sunMesh.position.set(0, 0, -200);
    sunMesh2.rotation.x -= 0.002;
    sunMesh2.rotation.y -= 0.002;
    sunMesh2.rotation.z -= 0.002;
  }
}

//Renderer
function renderSun() {
  sunRenderer.render(sunScene, sunCamera);
}

//  call the sun
startSun();

///////////////////
///////////////////
/// right Panel
//Global variables
let container, scene, camera, renderer, mesh, mesh2, sunIsUP;
sunIsUP = false;
//initiaing function
function init() {
  container = document.querySelector("#scene-container");
  scene = new THREE.Scene();

  cameraCreated();
  rendererCreated();
  meshCreated();
  mesh2Created();
  lightCreated();

  renderer.setAnimationLoop(() => {
    updateSc();
    render();
  });
}

// Camera function
function cameraCreated() {
  //camera
  const fov = 55; //field of view
  const near = 0.1; // the near clipping plane
  const far = 100; // the far clipping plane
  const aspect = container.clientWidth / container.clientHeight;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // note every camera starts at (0x, 0y, 0z) set z to position the camera at a spot where the object can be viewed
  camera.position.set(0, 0, 10);
}

//renderer function
function rendererCreated() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  //gammaFactor and Output
  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;

  //renderer.setClearColor("#000d1a");
  container.appendChild(renderer.domElement);

  //animation is called here

  window.addEventListener("resize", () => {
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  });
}

// mesh geometry funtion for moon and sun

//mesh for sun
function meshCreated() {
  const geometry = new THREE.SphereBufferGeometry(2, 20, 20);

  //settiung up texture loader
  const textureLoader = new THREE.TextureLoader();

  //loading texture
  const texture = textureLoader.load("moon.jpg");

  //texture encoding
  texture.encoding = THREE.sRGBEncoding;

  //reducing bluring at glancing angles
  texture.anisotropy = 16;

  const material = new THREE.MeshStandardMaterial({
    map: texture,
    displacementMap: texture,
    displacementScale: 0.1
  });
  mesh = new THREE.Mesh(geometry, material);

  mesh.position.set(0, 0, 0);
  scene.add(mesh);
}

//messh for sun
function mesh2Created() {
  const geometry2 = new THREE.SphereBufferGeometry(2, 20, 20);

  //settiung up texture loader
  const textureLoader2 = new THREE.TextureLoader();

  //loading texture
  const texture2 = textureLoader2.load("sun.jpg");

  //texture encoding
  texture2.encoding = THREE.sRGBEncoding;

  //reducing bluring at glancing angles
  texture2.anisotropy = 16;

  const material2 = new THREE.MeshStandardMaterial({
    map: texture2,
    displacementMap: texture2,
    displacementScale: 0.1
  });
  mesh2 = new THREE.Mesh(geometry2, material2);

  mesh2.position.set(0, 0, -10);

  scene.add(mesh2);
}

// light function
function lightCreated() {
  //creating light
  var light = new THREE.DirectionalLight(0xffffff, 0.6);

  //light position
  light.position.set(10, 10, 10);

  scene.add(light);
}

//update function
function updateSc() {
  //animating the mesh each frame

  mesh.rotation.z += 0.001;
  mesh.rotation.y += 0.005;
  mesh.rotation.x += 0.001;

  mesh2.rotation.z += 0.001;
  mesh2.rotation.y += 0.005;
  mesh2.rotation.x += 0.001;
}

//render called
function render() {
  //render , or call still image of a scene
  renderer.render(scene, camera);
}

// call to set up everythin
init();

// todo link animation to time

function timeChange(hourUpdate) {
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

  var tl = anime.timeline({
    duration: 5000,
    easing: "cubicBezier(0.405, 0.005, 0.35, 1)"
  });

  function sunUP() {
    mesh2.position.set(0, -8, 0);
    //animating thr sun living
    tl.add({
      targets: mesh.position,
      keyframes: [{ y: 0 }, { y: 9 }]
    })
      // animating sun rising
      .add(
        {
          targets: mesh2.position,
          keyframes: [{ y: -1 }, { y: 0 }]
        },
        "-=1"
      );
    sunIsUP = true;
  }

  function moonUp() {
    mesh.position.set(0, -8, 0);
    mesh2.position.set(0, 0, 0);
    tl.add({
      targets: mesh2.position,
      keyframes: [{ y: 0 }, { y: 9 }]
    }).add(
      {
        targets: mesh.position,
        keyframes: [{ y: -1 }, { y: 0 }]
      },
      "-=1"
    );
    sunIsUP = false;
  }

  if (hourUpdate >= 6 && hourUpdate <= 10) {
    if (!sunIsUP) {
      sceneCanvasBg.style.backgroundColor = backgroundCanvas[0];
      sunUP();
    }
  } else if (hourUpdate >= 11 && hourUpdate <= 13) {
    if (!sunIsUP) {
      //mesh2.position.set(0, 0, 1);
      sunUP();
      sunIsUP = true;
    }
    sceneCanvasBg.style.backgroundColor = backgroundCanvas[1];
  } else if (hourUpdate >= 14 && hourUpdate <= 17) {
    if (!sunIsUP) {
      //mesh2.position.set(0, 0, 1);
      sunUP();
      sunIsUP = true;
    }
    sceneCanvasBg.style.backgroundColor = backgroundCanvas[2];
  } else if (hourUpdate >= 18 && hourUpdate <= 20) {
    if (sunIsUP) {
      // animating sunsetting
      moonUp();
    }
    sceneCanvasBg.style.backgroundColor = backgroundCanvas[3];
  } else if (hourUpdate >= 20 && hourUpdate <= 23) {
    sceneCanvasBg.style.backgroundColor = backgroundCanvas[4];
    if (sunIsUP) {
      // animating sunsetting
      moonUp();
    }
  } else {
    sceneCanvasBg.style.backgroundColor = backgroundCanvas[5];
    if (sunIsUP) {
      // animating sunsetting
      moonUp();
    }
  }
}
