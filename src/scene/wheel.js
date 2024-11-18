import * as THREE from "three";

const createWheel = (scene) => {
	const wheel1 = new THREE.Mesh(
		new THREE.TorusGeometry(5, 0.15, 32, 10),
		new THREE.MeshStandardMaterial({ color: 0x0077ff })
	);
	wheel1.castShadow = true; // Enable shadows for the wheel
	wheel1.receiveShadow = true; // Enable shadows for the wheel

	const wheel2 = new THREE.Mesh(
		new THREE.TorusGeometry(5, 0.15, 32, 10),
		new THREE.MeshStandardMaterial({ color: 0x0077ff })
	);
	wheel2.castShadow = true; // Enable shadows for the wheel
	wheel2.receiveShadow = true; // Enable shadows for the wheel

	wheel1.position.z = 0.65;
	wheel2.position.z = -0.65;

	const wheel = new THREE.Group();
	wheel.add(wheel1);
	wheel.add(wheel2);
	scene.add(wheel);

	//cabins
	const numberOfCabins = 10;
	const radius = 5;
	const cabins = [];

	for (let i = 0; i < numberOfCabins; i++) {
		const cabin = new THREE.Mesh(
			new THREE.BoxGeometry(1.3, 1.2, 1.0),
			new THREE.MeshStandardMaterial({ color: 0xff7700 })
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
