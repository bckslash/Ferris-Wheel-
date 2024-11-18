import GUI from "lil-gui";

const debugGUI = ({
	physics,
	lights: { light, light2, light3 },
	lightMarkersGroup,
	scene,
	axes,
	renderPixelatedPass,
}) => {
	// GUI
	const gui = new GUI();

	const physicsFolder = gui.addFolder("Physics");
	physicsFolder.add(physics, "swingAmplitude", 0, 1).name("Swing Amplitude");

	physicsFolder.add(physics, "swingSpeed", 0, 0.2).name("Swing Speed");

	physicsFolder
		.add(physics, "rotationSpeed", -0.2, 0.2)
		.name("Rotation Speed");

	physicsFolder
		.add(physics, "wheelAnimationSpeed", -10, 10)
		.name("Wheel Animation Speed");
	physicsFolder.open();

	// Add control for light intensity
	const lightFolder = gui.addFolder("Light Settings");
	const lightSettings = {
		lightIntensity_1: light.intensity,
		lightIntensity_2: light2.intensity,
		lightIntensity_3: light3.intensity,
	};

	lightFolder
		.add(lightSettings, "lightIntensity_1", 0, 200)
		.name("Light 1 Intensity")
		.onChange((value) => {
			light.intensity = value;
		});

	lightFolder
		.add(lightSettings, "lightIntensity_2", 0, 200)
		.name("Light 2 Intensity")
		.onChange((value) => {
			light2.intensity = value;
		});

	lightFolder
		.add(lightSettings, "lightIntensity_3", 0, 200)
		.name("Light 3 Intensity")
		.onChange((value) => {
			light3.intensity = value;
		});
	lightFolder.open();

	const otherSettings = gui.addFolder("Other Settings");
	otherSettings.add(scene, "visible").name("Show Scene");
	otherSettings.add(axes, "visible").name("Show Axes");

	const lightMarkersSettings = {
		showLightMarkers: true,
	};
	otherSettings
		.add(lightMarkersSettings, "showLightMarkers")
		.name("Show Light Markers")
		.onChange((value) => {
			lightMarkersGroup.visible = value;
		});
	otherSettings.open();

	const postProcessingSettings = gui.addFolder("Post Processing Settings");
	let params = {
		pixelSize: 5,
		normalEdgeStrength: 0.3,
	};
	postProcessingSettings
		.add(params, "pixelSize")
		.min(1)
		.max(16)
		.step(1)
		.onChange(() => {
			renderPixelatedPass.setPixelSize(params.pixelSize);
		});

	postProcessingSettings
		.add(renderPixelatedPass, "normalEdgeStrength")
		.min(0)
		.max(2)
		.step(0.05);

	postProcessingSettings.open();

	return physics;
};

export default debugGUI;
