import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const cart = (scene, position) => {
	const loader = new GLTFLoader();

	const { x, y, z } = position;
	console.log(x, y, z);

	loader.load(
		"/models/cart/scene.gltf",
		(gltf) => {
			// Scale, position, and rotate model
			gltf.scene.scale.set(x, y, z);
			gltf.scene.position.set(0, 0, 0);

			// Enable shadows for all meshes
			gltf.scene.traverse((node) => {
				if (node.isMesh) {
					node.castShadow = true;
					node.receiveShadow = true; // Enable both cast and receive shadow
				}
			});

			// Add the model to the scene
			scene.add(gltf.scene);
		},
		undefined,
		(error) => {
			console.error("An error happened while loading the model", error);
		}
	);
};

export default cart;
