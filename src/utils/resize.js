const resize = (sizes, camera, renderer) => {
	window.addEventListener("resize", () => {
		//update sizes
		sizes.width = window.innerWidth;
		sizes.height = window.innerHeight;

		//update camera
		camera.aspect = sizes.width / sizes.height;
		camera.updateProjectionMatrix();

		//update renderer
		renderer.setSize(sizes.width, sizes.height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	});
};

export default resize;
