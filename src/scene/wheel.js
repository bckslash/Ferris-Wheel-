import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const wheelDistanceZ = 0.65;
const wheelColor = 0x0077ff;
const cabinColor = 0xffa500;

// textures
const textureLoader = new THREE.TextureLoader();

const wheelTexture = textureLoader.load("/assets/metal.jpg");
const cabinTexture = textureLoader.load("/assets/wood.jpg");

let wheelMaterial = new THREE.MeshPhongMaterial({
	map: wheelTexture,
	color: wheelColor,
});
let cabinMaterial = new THREE.MeshStandardMaterial({
	map: cabinTexture,
	color: cabinColor,
});

const createWheel = (scene) => {
	const wheel1 = new THREE.Mesh(
		new THREE.TorusGeometry(5, 0.15, 32, 10),
		wheelMaterial
	);
	wheel1.castShadow = true;
	wheel1.receiveShadow = true;

	const wheel2 = new THREE.Mesh(
		new THREE.TorusGeometry(5, 0.15, 32, 10),
		wheelMaterial
	);
	wheel2.castShadow = true;
	wheel2.receiveShadow = true;

	wheel1.position.z = wheelDistanceZ;
	wheel2.position.z = -wheelDistanceZ;

	const wheel = new THREE.Group();
	wheel.add(wheel1);
	wheel.add(wheel2);
	wheel.position.y = 0.3;
	scene.add(wheel);

	// Create center X support
	const createX = () => {
		const geometry = new THREE.CylinderGeometry(0.1, 0.1, 9.8);
		const material = new THREE.MeshPhongMaterial({ color: 0x666666 });
		const support1 = new THREE.Mesh(geometry, material);
		const support2 = new THREE.Mesh(geometry, material);
		support1.rotation.z = Math.PI / 4;
		support2.rotation.z = -Math.PI / 4;
		support1.castShadow = true;
		support2.castShadow = true;
		return [support1, support2];
	};

	// Create center Y support
	const createY = () => {
		const geometry = new THREE.CylinderGeometry(
			0.2,
			0.2,
			wheelDistanceZ * 3
		);
		const material = new THREE.MeshPhongMaterial({ color: 0x666666 });
		const support = new THREE.Mesh(geometry, material);
		support.rotation.x = Math.PI / 2;
		support.castShadow = true;
		return support;
	};

	// Create legs
	const createLegs = () => {
		const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 6);
		const legMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
		const legs = [];
		for (let i = 0; i < 4; i++) {
			const leg = new THREE.Mesh(legGeometry, legMaterial);
			const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
			leg.position.set(Math.cos(angle) * 6, -3, Math.sin(angle) * 4);
			leg.castShadow = true;
			leg.receiveShadow = true;
			legs.push(leg);
		}

		// Adjust the first leg to point from ground to wheel center
		// First leg
		legs[0].position.set(2.2, -3, 2.8);
		legs[0].rotation.z = Math.PI / 6;
		legs[0].rotation.x = -Math.PI / 6;
		legs[0].scale.y = 1.5;

		// Second leg
		legs[1].position.set(-2.2, -3, 2.8);
		legs[1].rotation.z = -Math.PI / 6;
		legs[1].rotation.x = -Math.PI / 6;
		legs[1].scale.y = 1.5;

		// Third leg
		legs[2].position.set(-2.2, -3, -2.8);
		legs[2].rotation.z = -Math.PI / 6;
		legs[2].rotation.x = Math.PI / 6;
		legs[2].scale.y = 1.5;

		// Fourth leg
		legs[3].position.set(2.2, -3, -2.8);
		legs[3].rotation.z = Math.PI / 6;
		legs[3].rotation.x = Math.PI / 6;
		legs[3].scale.y = 1.5;

		return legs;
	};

	const [backSupportPipe1, backSupportPipe2] = createX();
	const supportBack = new THREE.Group();
	supportBack.add(backSupportPipe1, backSupportPipe2);
	supportBack.position.z = wheelDistanceZ;
	supportBack.rotation.z = Math.PI + 1;
	wheel.add(supportBack);

	const [frontSupportPipe1, frontSupportPipe2] = createX();
	const supportFront = new THREE.Group();
	supportFront.add(frontSupportPipe1, frontSupportPipe2);
	supportFront.position.z = -wheelDistanceZ;
	wheel.add(supportFront);

	const centerSupport = createY();
	wheel.add(centerSupport);

	const legs = createLegs();
	legs.forEach((leg) => scene.add(leg));

	//cabins
	const numberOfCabins = 12;
	const radius = 5;
	const cabins = [];

	for (let i = 0; i < numberOfCabins; i++) {
		const cabin = createCabin();

		// Store the original angle for rotation reference
		const angle = (i / numberOfCabins) * Math.PI * 2;
		cabin.userData.angle = angle;
		cabin.userData.swing = Math.random() * Math.PI * 2; // Random starting swing angle

		// Initially position the cabin (will be updated in the animation loop)
		cabin.position.set(
			Math.cos(angle) * radius,
			Math.sin(angle) * radius,
			0
		);

		cabins.push(cabin);
		scene.add(cabin);
	}

	return { wheel, cabins, radius };
};

function createCabin() {
	const cabin = new THREE.Group();

	// Load GLB model
	const loader = new GLTFLoader();
	loader.load(
		"/models/cabin_generated.glb",
		function (gltf) {
			const model = gltf.scene;
			model.traverse((child) => {
				if (child.isMesh) {
					child.castShadow = true;
					child.receiveShadow = true;
					child.material = cabinMaterial;
				}
			});

			model.scale.set(1.3, 0.75, 0.9);
			model.position.set(0, 0, 0);

			cabin.add(model);
		},
		undefined,
		function (error) {
			console.error("Error loading GLB model:", error);
		}
	);

	return cabin;
}

export function updateWheelColor(color) {
	wheelMaterial.color.set(color);
}

export function updateCabinColor(color) {
	cabinMaterial.color.set(color);
}

export default createWheel;
