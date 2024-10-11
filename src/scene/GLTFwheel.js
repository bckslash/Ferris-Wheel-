import * as THREE from "three";
// import gltf
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const GLTFwheel = (scene, onLoadCallback, physics) => {
	const loader = new GLTFLoader();

	loader.load(
		"/models/ferriswheel/scene.gltf",
		(gltf) => {
			// Scale, position, and rotate model
			gltf.scene.scale.set(0.2, 0.2, 0.2);
			gltf.scene.position.set(10, -5.6, 0);
			gltf.scene.rotation.y = Math.PI / -3;

			// Enable shadows for all meshes
			gltf.scene.traverse((node) => {
				if (node.isMesh) {
					node.castShadow = true;
					node.receiveShadow = true; // Enable both cast and receive shadow
				}
			});

			// Add the model to the scene
			scene.add(gltf.scene);

			let mixer = null;

			// Create an AnimationMixer and play the animation if available
			if (gltf.animations.length > 0) {
				mixer = new THREE.AnimationMixer(gltf.scene);
				const action = mixer.clipAction(gltf.animations[0]);
				action.setLoop(THREE.LoopRepeat);
				action.timeScale = physics.wheelAnimationSpeed;
				action.play();
				console.log("Animation started successfully");
			} else {
				console.warn("No animations found in the GLTF model.");
			}

			// Call the callback with the mixer
			if (onLoadCallback && mixer) {
				onLoadCallback(mixer);
			}
		},
		undefined,
		(error) => {
			console.error("An error happened while loading the model", error);
		}
	);
};

export default GLTFwheel;
