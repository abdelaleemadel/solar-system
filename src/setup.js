import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export function setupLighting() {
  const ambientLight = new THREE.AmbientLight(0x040404, 0.8);
  const sunLight = new THREE.PointLight(0xffffff, 50000, 0);
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.1);

  sunLight.position.set(0, 0, 0);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 1024;
  sunLight.shadow.mapSize.height = 1024;
  sunLight.shadow.camera.near = 0.5;
  sunLight.shadow.camera.far = 1000;

  fillLight.position.set(0, 0, 1);

  return { ambientLight, sunLight, fillLight };
}

export function setupOrbitControls(camera, renderer, scaleFactor) {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 20 * scaleFactor;
  controls.maxDistance = 200 * scaleFactor;
  return controls;
}

export function setupSun(scaleFactor) {
  const sunGeometry = new THREE.SphereGeometry(4 * scaleFactor, 32, 32);
  const sunMaterial = new THREE.MeshStandardMaterial({
    emissive: 0xffaa00,
    emissiveIntensity: 5,
    transparent: true,
    color: 0xffcc00,
    roughness: 1,
    metalness: 0,
  });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);

  const sunGlowGeometry = new THREE.SphereGeometry(4.5 * scaleFactor, 32, 32);
  const sunGlowMaterial = new THREE.MeshBasicMaterial({
    color: 0xffaa00,
    transparent: true,
    opacity: 0.2,
  });

  const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
  return { sun, sunGlow };
}
