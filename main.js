import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPixelatedPass } from "three/examples/jsm/Addons.js";
import { OutputPass } from "three/examples/jsm/Addons.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";

import setupLights from "./src/scene/lights";
import createWheel from "./src/scene/wheel";

import debugGUI from "./src/gui/debugGUI";

import githubBanner from "./src/components/githubBanner";
import controlsBanner from "./src/components/controls";
import aboutButton from "./src/components/aboutButton";

import resize from "./src/utils/resize";
import { Tree } from "./src/scene/tree";
import { createIsland } from "./src/scene/island";

// Load textures
const textureLoader = new THREE.TextureLoader();

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
const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
renderer.setSize(sizes.width, sizes.height);

// composer
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

// Pixelated post-processing effect
const renderPixelatedPass = new RenderPixelatedPass(4, scene, camera);
composer.addPass(renderPixelatedPass);

const outputPass = new OutputPass();
composer.addPass(outputPass);

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

// Island
createIsland(scene);

// Create trees in two circles around the wheel
const createTreeRing = (count, distance) => {
	for (let i = 0; i < count; i++) {
		const angle = (i / count) * Math.PI * 2;
		const random = Math.random();
		const randomTree =
			random < 0.33
				? Tree.createTree()
				: random < 0.66
				? Tree.createPine()
				: Tree.createAppleTree();
		randomTree.position.set(
			Math.cos(angle) * distance,
			-6,
			Math.sin(angle) * distance
		);

		// set all trees same scale
		randomTree.scale.set(1, 1, 1);
		scene.add(randomTree);
	}
};
// Create two rings of trees
createTreeRing(10, radius + 6);
createTreeRing(10, radius + 12);

// skybox
const skyboxGeometry = new THREE.SphereGeometry(100, 32, 32);
const skyboxMaterial = new THREE.MeshBasicMaterial({
	color: 0x87ceeb,
	side: THREE.BackSide,
});
const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
skybox.position.y = -5;

// Load skybox texture
const skyboxTexture = textureLoader.load("./assets/skybox_2.png");
skyboxMaterial.map = skyboxTexture;
skyboxMaterial.needsUpdate = true;
scene.add(skybox);

//point camera at the sphere
camera.lookAt(wheel.position);

//controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(wheel.position.x, wheel.position.y, wheel.position.z);
controls.update();

// Setup lights
const { light, sunLight, sunLightMarker } = setupLights(scene);

// Create axes
const axes = new THREE.AxesHelper(5);
scene.add(axes);

// Setup GUI
debugGUI({
	physics,
	lights: { light, sunLight, sunLightMarker },
	scene,
	axes,
	renderPixelatedPass,
	skybox,
	camera,
});

//Github Link Banner
githubBanner();

// Controls banner
controlsBanner();

// About Button
aboutButton();

// Raycasting for selecting cabins
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Pointer lock controls
const pointerLockControls = new PointerLockControls(camera, document.body);

// Outline effect
const outlinePass = new OutlinePass(
	new THREE.Vector2(window.innerWidth, window.innerHeight),
	scene,
	camera
);

// Set outline parameters
outlinePass.edgeStrength = 5.0; // Edge strength
outlinePass.edgeGlow = 1; // Edge glow
outlinePass.edgeThickness = 1.0; // Edge thickness
outlinePass.pulsePeriod = 1; // Pulse period
outlinePass.visibleEdgeColor.set("#ffffff"); // Edge color when visible

composer.addPass(outlinePass);

// Update outline effect on mouse move
window.addEventListener("mousemove", (event) => {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);
	const intersects = raycaster.intersectObjects(cabins);

	if (intersects.length > 0) {
		outlinePass.selectedObjects = [intersects[0].object];
	} else {
		outlinePass.selectedObjects = [];
	}
});

//resize
resize(sizes, camera, renderer, composer);

// Click to enter cabin
let selectedCabin = null;
const cabinWorldPosition = new THREE.Vector3();
const direction = new THREE.Vector3();

// Pointer lock controls
window.addEventListener("click", (event) => {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);
	const intersects = raycaster.intersectObjects(cabins);
	const sceneIntersects = raycaster.intersectObjects(scene.children, true); // Check all children in the scene

	// Select the cabin when clicked
	if (intersects.length > 0) {
		selectedCabin = intersects[0].object.parent;
		controls.enabled = false; // Disable orbit controls
		pointerLockControls.lock(); // Enable pointer lock controls
		console.log("Cabin position:", selectedCabin.position);
		console.log("Cabin clicked:", selectedCabin);
	}
	// Log the intersection point in the scene
	if (sceneIntersects.length > 0) {
		const sceneIntersect = sceneIntersects[0];
		const point = sceneIntersect.point;
		console.log(`x=${point.x},\n y=${point.y},\n z=${point.z}`);
	}
});

window.addEventListener("click", (event) => {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);
	const intersects = raycaster.intersectObjects(cabins);
	const sceneIntersects = raycaster.intersectObjects(scene.children, true); // Check all children in the scene

	// Select the cabin when clicked

	if (intersects.length > 0) {
		// Find the highest-level cabin group
		let cabin = intersects[0].object;
		while (cabin.parent && !cabins.includes(cabin)) {
			cabin = cabin.parent;
		}

		if (cabins.includes(cabin)) {
			selectedCabin = cabin;
			controls.enabled = false; // Disable orbit controls
			pointerLockControls.lock(); // Enable pointer lock controls

			// Get cabin's world position
			const cabinWorldPosition = new THREE.Vector3();
			selectedCabin.getWorldPosition(cabinWorldPosition);
			console.log("Cabin world position:", cabinWorldPosition);
		}
	}
	// Log the intersection point in the scene
	if (sceneIntersects.length > 0) {
		const sceneIntersect = sceneIntersects[0];
		const point = sceneIntersect.point;
		console.log(`x=${point.x},\n y=${point.y},\n z=${point.z}`);
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

//render
function animate() {
	requestAnimationFrame(animate);

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
		selectedCabin.getWorldPosition(cabinWorldPosition);
		camera.position.copy(cabinWorldPosition);

		camera.getWorldDirection(direction);
		direction.add(camera.position);
		camera.lookAt(direction);
	}

	composer.render();
}

animate();
