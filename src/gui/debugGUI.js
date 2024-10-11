import GUI from "lil-gui";

const debugGUI = ({
	swingAmplitude,
	swingSpeed,
	rotationSpeed,
	lights: { light, light2, light3 },
	lightMarkersGroup,
	scene,
	axes,
}) => {
	// GUI
	const gui = new GUI();

	const physicsFolder = gui.addFolder("Physics");
	physicsFolder
		.add({ swingAmplitude }, "swingAmplitude", 0, 1)
		.name("Swing Amplitude")
		.onChange((value) => (swingAmplitude = value));

	physicsFolder
		.add({ swingSpeed }, "swingSpeed", 0, 0.2)
		.name("Swing Speed")
		.onChange((value) => (swingSpeed = value));

	physicsFolder
		.add({ rotationSpeed }, "rotationSpeed", 0, 0.2)
		.name("Rotation Speed")
		.onChange((value) => (rotationSpeed = value));
	physicsFolder.open();

	// Add control for light intensity
	const lightFolder = gui.addFolder("Light Settings");
	const lightSettings = {
		lightIntensity_1: light.intensity,
		lightIntensity_2: light2.intensity,
		lightIntensity_3: light3.intensity,
	};

	lightFolder
		.add(lightSettings, "lightIntensity_1", 0, 100)
		.name("Light 1 Intensity")
		.onChange((value) => {
			light.intensity = value;
		});

	lightFolder
		.add(lightSettings, "lightIntensity_2", 0, 100)
		.name("Light 2 Intensity")
		.onChange((value) => {
			light2.intensity = value;
		});

	lightFolder
		.add(lightSettings, "lightIntensity_3", 0, 100)
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

	return { swingAmplitude, swingSpeed, rotationSpeed };
};

export default debugGUI;
