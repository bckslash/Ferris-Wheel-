import * as THREE from "three";

class Ball {
	constructor(scene, x = 0, y = 0, z = 0) {
		this.mesh = new THREE.Mesh(
			new THREE.SphereGeometry(1, 32, 32),
			new THREE.MeshStandardMaterial({ color: 0xff0000 })
		);
		this.mesh.position.set(x, y, z);

		// Enable shadows for the ball
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;

		scene.add(this.mesh);
	}
}

export default Ball;
