import GUI from "lil-gui";
import * as THREE from "three";

const debugGUI = ({
	physics,
	lights: { light, sunLight, sunLightMarker },
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
		sunIntensity: sunLight.intensity,
		azimuth: 0, // Horizontal angle
		elevation: 30, // Vertical angle
	};

	lightFolder
		.add(lightSettings, "lightIntensity_1", 0, 200)
		.name("Light 1 Intensity")
		.onChange((value) => {
			light.intensity = value;
		})
		.setValue(0);

	lightFolder
		.add(lightSettings, "sunIntensity", 0, 4)
		.name("Sun Light Intensity")
		.onChange((value) => {
			sunLight.intensity = value;
		})
		.setValue(sunLight.intensity);

	lightFolder
		.add(lightSettings, "azimuth", -180, 180)
		.name("Sun Azimuth")
		.onChange(updateSunLightPosition);

	lightFolder
		.add(lightSettings, "elevation", 0, 360)
		.name("Sun Elevation")
		.onChange(updateSunLightPosition);

	lightFolder.open();

	function updateSunLightPosition() {
		const azimuth = THREE.MathUtils.degToRad(lightSettings.azimuth);
		const elevation = THREE.MathUtils.degToRad(lightSettings.elevation);
		const radius = 80; // Distance from the origin

		sunLight.position.set(
			radius * Math.cos(elevation) * Math.sin(azimuth),
			radius * Math.sin(elevation),
			radius * Math.cos(elevation) * Math.cos(azimuth)
		);
		sunLight.target.position.set(0, 0, 0);
		sunLight.target.updateMatrixWorld();

		// Update the sun light marker position
		sunLightMarker.position.copy(sunLight.position);
	}

	const otherSettings = gui.addFolder("Other Settings");
	otherSettings.add(scene, "visible").name("Show Scene");
	otherSettings.add(axes, "visible").name("Show Axes").setValue(false);

	const lightMarkersSettings = {
		showLightMarkers: true,
	};
	otherSettings
		.add(lightMarkersSettings, "showLightMarkers")
		.name("Show Sun")
		.onChange((value) => {
			lightMarkersGroup.visible = value;
		})
		.setValue(true);
	otherSettings.open();

	const postProcessingSettings = gui.addFolder("Post Processing Settings");

	let params = {
		pixelSize: Math.max(1, Math.floor(window.innerWidth / 384)),
		/* Explanation:
		 * - If window is 1920px wide: 1920/384 = 5 pixels
		 * - If window is 768px wide: 768/384 = 2 pixels
		 * - If window is 300px wide: Math.max(1, Math.floor(300/384)) = 1 pixel
		 *
		 * This creates a responsive scaling where pixels get larger on bigger screens
		 * while ensuring they never get smaller than 1px on tiny screens
		 */
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

	gui.close();

	return physics;
};

export default debugGUI;
