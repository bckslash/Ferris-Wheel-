import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

function createIsland(scene) {
	//create ground
	const ground = new THREE.Mesh(
		new THREE.CylinderGeometry(20, 20, 1, 16),
		new THREE.MeshStandardMaterial({ color: 0x00ff00 }) // Grass green color
	);
	// Load texture
	const textureLoader = new THREE.TextureLoader();
	const groundTexture = textureLoader.load("./assets/grass.jpg");
	groundTexture.wrapS = THREE.RepeatWrapping;
	groundTexture.wrapT = THREE.RepeatWrapping;
	groundTexture.repeat.set(5, 5);

	// Apply texture to ground material
	ground.material.map = groundTexture;
	ground.material.needsUpdate = true;

	ground.position.y = -6.2;
	ground.receiveShadow = true; // Enable shadows for the ground

	scene.add(ground);

	// Add grass
	const grassGroup = grass();
	grassGroup.position.y = -6.1;
	scene.add(grassGroup);

	// Add ticket booth
	const ticketBooth = ticket_booth();
	ticketBooth.position.set(3, -5.7, 6.6);
	scene.add(ticketBooth);

	// Add fence
	const fence1 = fence();
	const fence2 = fence();
	fence1.position.set(-1.5, -5.7, 5);
	fence2.position.set(1.5, -5.7, 5);
	const fenceGroup = new THREE.Group();
	fenceGroup.add(fence1);
	fenceGroup.add(fence2);
	scene.add(fenceGroup);

	// Add food cart
	const foodCart = food_cart();
	foodCart.position.set(-2, -5.7, 6);
	scene.add(foodCart);

	// Add autodrom
	const autodrom1 = autodrom();
	autodrom1.position.set(0, -5.7, -7);
	scene.add(autodrom1);
}

function grass() {
	const grass = new THREE.Group();

	// Load GLB model
	const loader = new GLTFLoader();
	loader.load(
		"/models/grass.glb",
		function (gltf) {
			grass.add(gltf.scene);
			gltf.scene.traverse((child) => {
				if (child.isMesh) {
					child.castShadow = true;
					child.receiveShadow = true;
				}

				// Apply color to grass
				if (child.parent && child.parent.name === "Gress_02") {
					child.material = child.material.clone(); // Clone material
					child.material.color.setHex(0x228b22); // Forest green for grass cubes
				}
			});

			grass.scale.set(0.4, 0.4, 0.4);

			// Create multiple grass instances
			for (let i = 0; i < 100; i++) {
				const clone = gltf.scene.clone();
				// Use square root to spread more grass towards the edges
				const radius = Math.sqrt(Math.random()) * 45; // Random distance from center
				const angle = Math.random() * Math.PI * 2; // Random angle
				const x = Math.cos(angle) * radius;
				const z = Math.sin(angle) * radius;
				clone.position.set(x, 0, z);
				clone.rotation.y = Math.random() * Math.PI * 2; // Random rotation
				grass.add(clone);
			}
		},
		undefined,
		function (error) {
			console.error("Error loading GLB model:", error);
		}
	);

	return grass;
}

function ticket_booth() {
	const ticket_booth = new THREE.Group();

	const loader = new GLTFLoader();
	loader.load(
		"/models/ticket_booth.glb",
		function (gltf) {
			ticket_booth.add(gltf.scene);
			gltf.scene.traverse((child) => {
				if (child.isMesh) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			});

			ticket_booth.scale.set(0.5, 0.5, 0.5);

			// rotate 180
			ticket_booth.rotation.y = Math.PI;
		},
		undefined,
		function (error) {
			console.error("Error loading GLB model:", error);
		}
	);

	return ticket_booth;
}

function fence() {
	const fence = new THREE.Group();

	const loader = new GLTFLoader();
	loader.load(
		"/models/fence.glb",
		function (gltf) {
			fence.add(gltf.scene);
			gltf.scene.traverse((child) => {
				if (child.isMesh) {
					child.castShadow = true;
					child.receiveShadow = true;
					console.log(child);
				}

				// Apply color
				if (child.parent && child.parent.name.includes("Fence01")) {
					child.material = child.material.clone(); // Clone material
					child.material.color.setHex(0x8b4513); // Brown color for fence
				}
			});

			// rotate 90
			fence.rotation.y = Math.PI / 2;
		},
		undefined,
		function (error) {
			console.error("Error loading GLB model:", error);
		}
	);

	return fence;
}

function food_cart() {
	const food_cart = new THREE.Group();

	const loader = new GLTFLoader();
	loader.load(
		"/models/food_cart.glb",
		function (gltf) {
			food_cart.add(gltf.scene);
			gltf.scene.traverse((child) => {
				if (child.isMesh) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			});

			food_cart.scale.set(0.5, 0.5, 0.5);

			food_cart.rotation.y = Math.PI / 2;
		},
		undefined,
		function (error) {
			console.error("Error loading GLB model:", error);
		}
	);

	return food_cart;
}

function autodrom() {
	const autodrom = new THREE.Group();

	const loader = new GLTFLoader();
	loader.load(
		"/models/autodrom.glb",
		function (gltf) {
			autodrom.add(gltf.scene);
			gltf.scene.traverse((child) => {
				if (child.isMesh) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			});

			autodrom.scale.set(0.25, 0.25, 0.25);

			autodrom.rotation.y = -Math.PI / 2;
		},
		undefined,
		function (error) {
			console.error("Error loading GLB model:", error);
		}
	);

	return autodrom;
}

export { createIsland };
