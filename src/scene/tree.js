import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Create a tree
class Tree {
	constructor() {
		this.tree = new THREE.Group();
		this.size = 1;
	}

	static createPine() {
		return createPineTree();
	}

	static createTree() {
		return createTree();
	}

	static createAppleTree() {
		return createAppleTree();
	}
}

function createTree() {
	const tree = new THREE.Group();

	// Load GLB model
	const loader = new GLTFLoader();
	loader.load(
		"/models/tree.glb",
		function (gltf) {
			tree.add(gltf.scene);
			gltf.scene.traverse((child) => {
				if (child.isMesh) {
					child.castShadow = true;
					child.receiveShadow = true;
				}

				// Create separate materials to avoid conflicts
				if (child.name.includes("leaf")) {
					child.material = child.material.clone(); // Clone material
					child.material.color.setHex(0x228b22); // Green for leaves
				} else if (child.name.includes("Cylinder")) {
					child.material = child.material.clone(); // Clone material
					child.material.color.setHex(0x8b4513); // Brown for trunk
				}
			});
		},
		undefined,
		function (error) {
			console.error("Error loading GLB model:", error);
		}
	);

	return tree;
}

function createAppleTree() {
	const tree = new THREE.Group();

	// Load GLB model
	const loader = new GLTFLoader();
	loader.load(
		"/models/appleTree.glb",
		function (gltf) {
			tree.add(gltf.scene);
			gltf.scene.traverse((child) => {
				if (child.isMesh) {
					child.castShadow = true;
					child.receiveShadow = true;
				}

				// Check parent or group names and apply colors
				if (child.parent && child.parent.name.includes("fruit")) {
					child.material = child.material.clone(); // Clone material
					child.material.color.setHex(0xff0000); // Red for fruit
				} else if (child.name.includes("trunk")) {
					child.material = child.material.clone();
					child.material.color.setHex(0x8b4513); // Brown for trunk
				} else if (child.name.includes("branch")) {
					child.material = child.material.clone();
					child.material.color.setHex(0x228b22); // Forest green for branches
				}
			});
		},
		undefined,
		function (error) {
			console.error("Error loading GLB model:", error);
		}
	);

	return tree;
}

function createPineTree() {
	const tree = new THREE.Group();

	// Load GLB model
	const loader = new GLTFLoader();
	loader.load(
		"/models/pine.glb",
		function (gltf) {
			tree.add(gltf.scene);
			gltf.scene.traverse((child) => {
				if (child.isMesh) {
					child.castShadow = true;
					child.receiveShadow = true;
				}

				// Check parent or group names and apply colors
				if (child.name.includes("trunk")) {
					child.material = child.material.clone();
					child.material.color.setHex(0x8b4513); // Brown for trunk
				} else if (child.name.includes("leaf")) {
					child.material = child.material.clone();
					child.material.color.setHex(0x228b22); // Forest green for branches
				}
			});

			// Scale the pine tree
			tree.scale.set(0.7, 0.7, 0.7);
		},
		undefined,
		function (error) {
			console.error("Error loading GLB model:", error);
		}
	);

	return tree;
}

export { Tree };
