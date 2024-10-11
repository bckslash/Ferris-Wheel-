import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import setupLights from "./src/scene/lights";
import createWheel from "./src/scene/wheel";

import debugGUI from "./src/gui/debugGUI";

import githubBanner from "./src/components/githubBanner";

//sizes
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

//create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Dark blue color

//create camera
const camera = new THREE.PerspectiveCamera(
	50,
	sizes.width / sizes.height,
	0.1,
	1000
);
camera.position.z = 20;

//create renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

// Variables for physics
var physics = {
	swingAmplitude: 0.2,
	swingSpeed: 0.05,
	rotationSpeed: 0.02,
};

// Wheel
const { wheel, cabins, radius } = createWheel(scene);

//create ground
const ground = new THREE.Mesh(
	new THREE.CylinderGeometry(15, 15, 1, 16),
	new THREE.MeshStandardMaterial({ color: 0x808080 })
);

ground.position.y = -6.2;
scene.add(ground);

//point camera at the sphere
camera.lookAt(wheel.position);

//controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(wheel.position.x, wheel.position.y, wheel.position.z);
controls.update();

// Setup lights
const { light, light2, light3, lightMarkersGroup } = setupLights(scene);

// Create axes
const axes = new THREE.AxesHelper(5);
scene.add(axes);

// Setup GUI
debugGUI({
	physics,
	lights: { light, light2, light3 },
	lightMarkersGroup,
	scene,
	axes,
});

//Github Link Banner
const banner = githubBanner();

//resize
window.addEventListener("resize", () => {
	//update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	//update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	//update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//render
function animate() {
	requestAnimationFrame(animate);
	controls.update();

	// Rotate the Ferris wheel
	wheel.rotation.z += physics.rotationSpeed;

	// Rotate the cabins around the wheel without spinning
	cabins.forEach((cabin, index) => {
		const angle = cabin.userData.angle + wheel.rotation.z;

		// Calculate the cabin's position along the wheel
		cabin.position.set(
			Math.cos(angle) * radius,
			Math.sin(angle) * radius,
			0
		);

		// Apply simple physics for swinging effect
		const swingOffset =
			Math.sin(cabin.userData.swing) * physics.swingAmplitude;
		cabin.userData.swing += physics.swingSpeed; // Increment swing angle over time

		// Keep the cabin upright (no spinning)
		cabin.rotation.z = swingOffset; // Swinging effect without spinning
	});

	renderer.render(scene, camera);
}

animate();
