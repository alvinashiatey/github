//Global variables
let container, scene, camera, renderer, mesh;

//initiaing function
function init() {
  container = document.querySelector("#scene-container");
  scene = new THREE.Scene();

  cameraCreated();
  rendererCreated();
  meshCreated();
  lightCreated();

  renderer.setAnimationLoop(() => {
    updateSc();
    render();
  });
};



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


// mesh geometry funtion
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

  const material = new THREE.MeshStandardMaterial({ map: texture, displacementMap: texture, displacementScale: 0.1 });
  mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

}

// light function
function lightCreated(){
    //creating light
    var light = new THREE.DirectionalLight(0xffffff, 0.5);
  
    //light position
    light.position.set(10, 10, 10);
  
    scene.add(light);
  };


//update function
function updateSc() {

  //animating the mesh each frame
   mesh.rotation.z += 0.001;
   mesh.rotation.y += 0.005;
   mesh.rotation.x += 0.001;
}


//render called
function render() {
  //render , or call still image of a scene
  renderer.render(scene, camera);
}

// call to set up everythin
init();


// todo link animation to time 


