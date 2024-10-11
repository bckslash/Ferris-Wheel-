import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";

import setupLights from "./src/scene/lights";
import createWheel from "./src/scene/wheel";

import debugGUI from "./src/gui/debugGUI";

import githubBanner from "./src/components/githubBanner";
import controlsBanner from "./src/components/controls";
import GLTFwheel from "./src/scene/GLTFwheel";

import resize from "./src/utils/resize";

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
	60,
	sizes.width / sizes.height,
	0.1,
	1000
);
camera.position.z = 20;

//create renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
// shadows
renderer.shadowMap.enabled = true; // Enable shadow maps
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optional: Choose shadow map type

// Variables for physics
var physics = {
	swingAmplitude: 0.04,
	swingSpeed: 0.03,
	rotationSpeed: 0.005,
	wheelAnimationSpeed: 1.5,
};

// Wheel
const { wheel, cabins, radius } = createWheel(scene);

//create ground
const ground = new THREE.Mesh(
	new THREE.CylinderGeometry(20, 15, 1, 16),
	new THREE.MeshStandardMaterial({ color: 0x808080 })
);

ground.position.y = -6.2;
ground.receiveShadow = true; // Enable shadows for the ground
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
githubBanner();

// Controls banner
controlsBanner();

// Right-click to enter cabin
window.addEventListener("contextmenu", (event) => {
	event.preventDefault();
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);
	const intersects = raycaster.intersectObjects(cabins);

	if (intersects.length > 0) {
		selectedCabin = intersects[0].object;
		controls.enabled = false; // Disable orbit controls
		pointerLockControls.lock(); // Enable pointer lock controls
		console.log("Cabin right-clicked:", selectedCabin);
	}
});

//resize
resize(sizes, camera, renderer);

// Raycasting for selecting cabins
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let selectedCabin = null;

// Pointer lock controls
const pointerLockControls = new PointerLockControls(camera, document.body);

window.addEventListener("click", (event) => {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);
	const intersects = raycaster.intersectObjects(cabins);

	if (intersects.length > 0) {
		selectedCabin = intersects[0].object;
		controls.enabled = false; // Disable orbit controls
		pointerLockControls.lock(); // Enable pointer lock controls
		console.log("Cabin clicked:", selectedCabin);
	}
});

function resetCameraPosition() {
	camera.position.set(0, 0, 20); // Adjust these values to your base position
	camera.lookAt(wheel.position);
}

// Reset camera position when pressing 'x'
window.addEventListener("keydown", (event) => {
	if (event.key === "x") {
		selectedCabin = null;
		controls.enabled = true; // Enable orbit controls
		pointerLockControls.unlock(); // Disable pointer lock controls
		resetCameraPosition();
	}
});

// GLTFwheel - Load Model and receive mixer via callback
let mixer = null;
let animationAction = null;
GLTFwheel(
	scene,
	(loadedMixer) => {
		mixer = loadedMixer;
		animationAction = mixer.existingAction(mixer._actions[0]._clip);
	},
	physics
);

// Clock for animation timing
const clock = new THREE.Clock();

// Track previous animation speed
let previousAnimationSpeed = physics.wheelAnimationSpeed;

//render
function animate() {
	requestAnimationFrame(animate);

	const delta = clock.getDelta();
	if (mixer) {
		mixer.update(delta);
	}

	// Update animation speed if it has changed
	if (
		animationAction &&
		physics.wheelAnimationSpeed !== previousAnimationSpeed
	) {
		animationAction.timeScale = physics.wheelAnimationSpeed;
		previousAnimationSpeed = physics.wheelAnimationSpeed;
	}

	if (!selectedCabin) {
		controls.update();
	} else {
		pointerLockControls.update();
	}
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

	// camera look at selected cabin
	if (selectedCabin) {
		camera.position.copy(selectedCabin.position);
		camera.position.z += 1;

		// camera in the cabin movement
		const direction = new THREE.Vector3();
		camera.getWorldDirection(direction);
		camera.lookAt(camera.position.clone().add(direction));
	}

	renderer.render(scene, camera);
}

animate();
