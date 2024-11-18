const resize = (sizes, camera, renderer, composer) => {
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

		//composer
		composer.setSize(sizes.width, sizes.height);
	});
};

export default resize;
