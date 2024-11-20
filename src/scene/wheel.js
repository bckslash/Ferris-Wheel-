import * as THREE from "three";

const wheelDistanceZ = 0.65; // Distance between the wheel and the cabins
const wheelColor = 0x0077ff; // Color of the wheel
const cabinColor = 0xff7700; // Color of the cabins

const createWheel = (scene) => {
	const wheel1 = new THREE.Mesh(
		new THREE.TorusGeometry(5, 0.15, 32, 10),
		new THREE.MeshStandardMaterial({ color: wheelColor })
	);
	wheel1.castShadow = true; // Enable shadows for the wheel
	wheel1.receiveShadow = true; // Enable shadows for the wheel

	const wheel2 = new THREE.Mesh(
		new THREE.TorusGeometry(5, 0.15, 32, 10),
		new THREE.MeshStandardMaterial({ color: wheelColor })
	);
	wheel2.castShadow = true; // Enable shadows for the wheel
	wheel2.receiveShadow = true; // Enable shadows for the wheel

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
		const material = new THREE.MeshStandardMaterial({ color: 0x666666 });
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
		const material = new THREE.MeshStandardMaterial({ color: 0x666666 });
		const support = new THREE.Mesh(geometry, material);
		support.rotation.x = Math.PI / 2;
		support.castShadow = true;
		return support;
	};

	// Create legs
	const createLegs = () => {
		const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 6);
		const legMaterial = new THREE.MeshStandardMaterial({ color: 0x666666 });
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
		const cabin = new THREE.Mesh(
			new THREE.BoxGeometry(1.3, 1.2, 1.0),
			new THREE.MeshStandardMaterial({ color: cabinColor })
		);
		const angle = (i / numberOfCabins) * Math.PI * 2;
		cabin.position.set(
			Math.cos(angle) * radius,
			Math.sin(angle) * radius,
			0
		);
		cabin.userData.angle = angle; // Store the original angle for rotation reference
		cabin.userData.swing = Math.random() * Math.PI * 2; // Random starting swing angle
		cabin.castShadow = true; // Enable shadows for the cabins
		cabin.receiveShadow = true; // Enable shadows for the cabins
		cabins.push(cabin);
		scene.add(cabin);
	}

	return { wheel, cabins, radius };
};

export default createWheel;
