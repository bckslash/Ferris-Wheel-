import * as THREE from "three";

const setupLights = (scene) => {
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
	sunLight.position.set(0, 45, 30);
	sunLight.castShadow = true;
	sunLight.shadow.mapSize.width = 4096;
	sunLight.shadow.mapSize.height = 4096;

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

	// Light
	const light = new THREE.PointLight(0xffffff, 100, 100);
	light.position.set(0, 15, 0);
	scene.add(light);

	return { light, sunLight, sunLightMarker };
};

export default setupLights;
