import * as THREE from "three";

const createWheel = (scene) => {
	const wheel = new THREE.Mesh(
		new THREE.TorusGeometry(5, 0.1, 32, 10),
		new THREE.MeshStandardMaterial({ color: 0x0077ff })
	);
	scene.add(wheel);

	//cabins
	const numberOfCabins = 10;
	const radius = 5;
	const cabins = [];

	for (let i = 0; i < numberOfCabins; i++) {
		const cabin = new THREE.Mesh(
			new THREE.BoxGeometry(1.2, 1, 1.0),
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
		cabins.push(cabin);
		scene.add(cabin);
	}

	return { wheel, cabins, radius };
};

export default createWheel;
