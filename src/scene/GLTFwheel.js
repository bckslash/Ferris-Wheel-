// import gltf
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const GLTFwheel = (scene) => {
	const loader = new GLTFLoader();
	loader.load(
		"/public/models/ferriswheel/scene.gltf",
		(gltf) => {
			gltf.scene.scale.set(0.2, 0.2, 0.2);
			Object.assign(gltf.scene.position, { x: 10, y: -5.6, z: 0 });
			gltf.scene.rotation.y = Math.PI / 1.5;

			// Enable shadows for all meshes
			gltf.scene.traverse((node) => {
				if (node.isMesh) {
					node.castShadow = true;
				}
			});

			// receive shadows
			gltf.scene.traverse((node) => {
				if (node.isMesh) {
					node.receiveShadow = true;
				}
			});

			scene.add(gltf.scene);

			console.log("Model loaded successfully");
		},
		undefined,
		(error) => {
			console.error("An error happened while loading the model", error);
		}
	);
};

export default GLTFwheel;
