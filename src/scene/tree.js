import * as THREE from "three";

function createTree() {
	const tree = new THREE.Group();

	// Create the trunk
	const trunkGeometry = new THREE.CylinderGeometry(0.25, 0.25, 2.5, 32);
	const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
	const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
	trunk.position.y = 1.25;
	tree.add(trunk);

	// Create the leaves
	const leavesGeometry = new THREE.SphereGeometry(1.5, 32, 32);
	const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
	const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
	leaves.position.y = 3.5;
	tree.add(leaves);

	return tree;
}

export { createTree };

function createPineTree() {
	const tree = new THREE.Group();

	// Create the trunk
	const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 3, 32);
	const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
	const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
	trunk.position.y = 1.5;
	tree.add(trunk);

	// Create the leaves
	const leavesGeometry = new THREE.ConeGeometry(1.5, 4, 32);
	const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
	const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
	leaves.position.y = 4;
	tree.add(leaves);

	return tree;
}

function createOakTree() {
	const tree = new THREE.Group();

	// Create the trunk
	const trunkGeometry = new THREE.CylinderGeometry(0.3, 0.3, 3, 32);
	const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
	const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
	trunk.position.y = 1.5;
	tree.add(trunk);

	// Create the leaves
	const leavesGeometry = new THREE.SphereGeometry(2, 32, 32);
	const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x006400 });
	const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
	leaves.position.y = 4;
	tree.add(leaves);

	return tree;
}

export { createPineTree, createOakTree };
