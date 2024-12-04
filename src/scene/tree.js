import * as THREE from "three";

// Create a tree
class Tree {
	constructor() {
		this.tree = new THREE.Group();
		this.size = 1;
	}

	static createTree(size) {
		return createTree();
	}

	static createPine() {
		return createPineTree();
	}

	static createOak() {
		return createOakTree();
	}
}

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
	leaves.scale.y = 1.3;
	tree.add(leaves);

	// shadows
	trunk.castShadow = true;
	trunk.receiveShadow = true;
	leaves.castShadow = true;
	leaves.receiveShadow = true;

	return tree;
}

function createPineTree() {
	const tree = new THREE.Group();

	// Create the trunk
	const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 3, 32);
	const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
	const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
	trunk.position.y = 1.5;
	tree.add(trunk);

	// Create the leaves
	const leavesGeometry = new THREE.ConeGeometry(1.5, 3, 32);
	const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });

	const leavesGroup = new THREE.Group();

	const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
	leaves.position.y = 3.8 + 0.5;
	leaves.scale.set(0.3, 0.3, 0.3);
	leavesGroup.add(leaves);

	const leaves2 = new THREE.Mesh(leavesGeometry, leavesMaterial);
	leaves2.position.y = 3 + 0.5;
	leaves2.scale.set(0.5, 0.5, 0.5);
	leavesGroup.add(leaves2);

	const leaves3 = new THREE.Mesh(leavesGeometry, leavesMaterial);
	leaves3.position.y = 2 + 0.5;
	leaves3.scale.set(0.8, 0.8, 0.8);
	leavesGroup.add(leaves3);

	tree.add(leavesGroup);

	// shadows
	trunk.castShadow = true;
	trunk.receiveShadow = true;

	for (let i = 0; i < leavesGroup.children.length; i++) {
		leavesGroup.children[i].castShadow = true;
		leavesGroup.children[i].receiveShadow = true;
	}

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

	// shadows
	trunk.castShadow = true;
	trunk.receiveShadow = true;
	leaves.castShadow = true;
	leaves.receiveShadow = true;

	return tree;
}

export { Tree };
