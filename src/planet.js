import * as THREE from "three";

export class Planet {
  constructor({ name, size, orbitRadius, color, speed, scene }) {
    this.name = name;
    this.orbitRadius = orbitRadius;
    this.speed = speed;

    // Create Sphere mesh

    const geometry = new THREE.SphereGeometry(size, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.6,
      metalness: 0.2,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.x = orbitRadius;
    scene.add(this.mesh);

    const orbitGeometry = new THREE.RingGeometry(
      orbitRadius - 0.1,
      orbitRadius + 0.1,
      64
    );

    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbit.rotation.x = Math.PI / 2;
    scene.add(orbit);
  }

  update(time) {
    this.mesh.position.x = this.orbitRadius * Math.cos(time * this.speed);
    this.mesh.position.z = this.orbitRadius * Math.sin(time * this.speed);
  }

  setSpeed(newSpeed) {
    this.speed = newSpeed;
  }
}
export const planetsArray = [
  {
    name: "Mercury",
    size: 1,
    orbitRadius: 10,
    color: 0xaaaaaa,
    speed: 12.5,
  },
  {
    name: "Venus",
    size: 0.9,
    orbitRadius: 15,
    color: 0xffcc66,
    speed: 4.8,
  },
  {
    name: "Earth",
    size: 1,
    orbitRadius: 20,
    color: 0x3399ff,
    speed: 3,
  },
  {
    name: "Mars",
    size: 0.8,
    orbitRadius: 25,
    color: 0xff3300,
    speed: 1.6,
  },
  {
    name: "Jupiter",
    size: 2,
    orbitRadius: 35,
    color: 0xff9966,
    speed: 0.25,
  },
  {
    name: "Saturn",
    size: 1.7,
    orbitRadius: 45,
    color: 0xffcc99,
    speed: 0.1,
  },
  {
    name: "Uranus",
    size: 1.4,
    orbitRadius: 55,
    color: 0x66ccff,
    speed: 0.04,
  },
  {
    name: "Neptune",
    size: 1.3,
    orbitRadius: 65,
    color: 0x3366ff,
    speed: 0.02,
  },
];
