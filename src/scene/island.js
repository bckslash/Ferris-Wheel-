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

				// Apply color to each cube in the grass
				if (child.parent && child.parent.name === "Gress_02") {
					child.material = child.material.clone(); // Clone material
					child.material.color.setHex(0x228b22); // Forest green for grass cubes
				}
			});

			// Scale the grass
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

export { createIsland };
