import * as THREE from "three";

const setupLights = (scene) => {
	// Function to create light markers
	function createLightMarker(position) {
		const marker = new THREE.Mesh(
			new THREE.SphereGeometry(5, 16, 16),
			new THREE.MeshBasicMaterial({ color: 0xffff00 })
		);
		marker.position.copy(position);
		return marker;
	}

	// Sun Light
	const sunLight = new THREE.DirectionalLight(0xffffff, 1);
	sunLight.position.set(0, 35, 30);
	sunLight.castShadow = true; // Enable shadows for the sun light
	sunLight.shadow.mapSize.width = 4096; // Adjust shadow map size
	sunLight.shadow.mapSize.height = 4096; // Adjust shadow map size

	// Configure shadow camera
	const d = 100;
	sunLight.shadow.camera.left = -d;
	sunLight.shadow.camera.right = d;
	sunLight.shadow.camera.top = d;
	sunLight.shadow.camera.bottom = -d;
	sunLight.shadow.camera.near = 0.1;
	sunLight.shadow.camera.far = 500;

	scene.add(sunLight);

	const sunLightMarker = createLightMarker(sunLight.position);
	scene.add(sunLightMarker);
	// const sunLightHelper = new THREE.DirectionalLightHelper(sunLight, 10);
	// scene.add(sunLightHelper);

	// Light 1
	const light = new THREE.PointLight(0xffffff, 100, 100);
	light.position.set(0, 15, 0);
	light.castShadow = true; // Enable shadows for this light
	light.shadow.mapSize.width = 1024; // Optional: Adjust shadow map size
	light.shadow.mapSize.height = 1024; // Optional: Adjust shadow map size
	scene.add(light);

	// const lightHelper = new THREE.PointLightHelper(light, 10);
	// scene.add(lightHelper);

	return { light, sunLight, sunLightMarker };
};

export default setupLights;
