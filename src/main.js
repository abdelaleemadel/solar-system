import * as THREE from "three";
import { setupLighting, setupOrbitControls, setupSun } from "./setup.js";
import { Planet, planetsArray } from "./planet.js";
import { setupUI } from "./ui.js";

//Global Config
const BASE_SCREEN_WIDTH = 1200;
const clock = new THREE.Clock();
let scaleFactor = window.innerWidth / BASE_SCREEN_WIDTH;
let isPaused = false;
let offset = 0;
let mouseX = 0;
let mouseY = 0;
// Scene setup
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 40, 150);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Orbit controls
const controls = setupOrbitControls(camera, renderer, scaleFactor);

//Lighting

const { ambientLight, sunLight, fillLight } = setupLighting();
scene.add(ambientLight);
scene.add(sunLight);
scene.add(fillLight);

// Sun
const { sun, sunGlow } = setupSun(scaleFactor);
scene.add(sun);
scene.add(sunGlow);

//Creating plantes
const planets = planetsArray.map(
  (p) =>
    new Planet({
      name: p.name,
      size: p.size * scaleFactor,
      orbitRadius: p.orbitRadius * scaleFactor,
      color: p.color,
      speed: p.speed,
      scene,
    })
);

//SetupUI (sliders, pause button)
setupUI(
  planets,
  () => {
    isPaused = !isPaused;
  },
  () => clock.getElapsedTime(),
  (elapsed) => (offset += elapsed),
  () => isPaused
);

// Handle window resize
window.addEventListener("resize", () => {
  scaleFactor = window.innerWidth / BASE_SCREEN_WIDTH;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.set(
    0,
    Math.max(40 / scaleFactor, 40),
    Math.max(150 / scaleFactor, 150)
  );
});

//Stars Texture
const textureLoader = new THREE.CubeTextureLoader();
const starTexture = textureLoader.load([
  "/stars.webp",
  "/stars.webp",
  "/stars.webp",
  "/stars.webp",
  "/stars.webp",
  "/stars.webp",
]);

scene.background = starTexture;

//Mouse Tracking
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const tooltip = document.getElementById("tooltip");
const planetsMesh = planets.map((p) => p.mesh);

window.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  mouseX = e.clientX;
  mouseY = e.clientY;
});

//Animate
function animate() {
  requestAnimationFrame(animate);
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(planetsMesh);

  if (intersects.length > 0 && window.innerWidth < 768) {
    const planetMesh = intersects[0].object;
    const planet = planets.find((p) => p.mesh === planetMesh);

    if (planet) {
      tooltip.style.display = "block";
      tooltip.textContent = planet.name;
      tooltip.style.left = `${mouseX + 10}px`;
      tooltip.style.top = `${mouseY + 10}px`;
    }
  } else {
    tooltip.style.display = "none";
  }
  let time = 0;
  controls.update();
  if (!isPaused) {
    time = clock.getElapsedTime() - offset;
    planets.forEach((planet) => planet.update(time));
  }

  renderer.render(scene, camera);
}
animate();
