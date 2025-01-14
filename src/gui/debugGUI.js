import GUI from "lil-gui";
import * as THREE from "three";
import { updateWheelColor, updateCabinColor } from "../scene/wheel.js";

const debugGUI = ({
	physics,
	lights: { light, sunLight, sunLightMarker },
	scene,
	axes,
	renderPixelatedPass,
	skybox,
	camera,
}) => {
	const gui = new GUI();

	const physicsFolder = gui.addFolder("Physics");
	physicsFolder.add(physics, "swingAmplitude", 0, 1).name("Swing Amplitude");

	physicsFolder.add(physics, "swingSpeed", 0, 0.2).name("Swing Speed");

	physicsFolder
		.add(physics, "rotationSpeed", -0.2, 0.2)
		.name("Rotation Speed");

	physicsFolder.open();

	// Add control for light intensity
	const lightFolder = gui.addFolder("Light Settings");
	const lightSettings = {
		lightIntensity: light.intensity,
		sunIntensity: sunLight.intensity,
		azimuth: 0, // Horizontal angle
		elevation: 30, // Vertical angle
	};

	lightFolder
		.add(lightSettings, "lightIntensity", 0, 200)
		.name("Light Intensity")
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

	const skyboxSettings = {
		changeSkybox: () => {
			const input = document.createElement("input");
			input.type = "file";
			input.accept = "image/*";
			input.onchange = (event) => {
				const file = event.target.files[0];
				const reader = new FileReader();
				reader.onload = (e) => {
					new THREE.TextureLoader().load(
						e.target.result,
						(texture) => {
							skybox.material.map = texture;
							skybox.material.needsUpdate = true;
						}
					);
				};
				reader.readAsDataURL(file);
			};
			input.click();
		},
	};

	otherSettings
		.add(skyboxSettings, "changeSkybox")
		.name("Change Skybox Image");

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

	const colorSettings = {
		wheelColor: "#0077ff",
		cabinColor: "#ffa500",
	};

	const colorFolder = gui.addFolder("Color Settings");
	colorFolder
		.addColor(colorSettings, "wheelColor")
		.name("Wheel Color")
		.onChange((value) => {
			updateWheelColor(value);
		});

	colorFolder
		.addColor(colorSettings, "cabinColor")
		.name("Cabin Color")
		.onChange((value) => {
			updateCabinColor(value);
		});

	colorFolder.open();

	const exportSettings = {
		export: () => {
			const settings = {
				physics: {
					swingAmplitude: physics.swingAmplitude,
					swingSpeed: physics.swingSpeed,
					rotationSpeed: physics.rotationSpeed,
				},
				lightSettings: {
					lightIntensity: light.intensity,
					sunIntensity: sunLight.intensity,
					azimuth: lightSettings.azimuth,
					elevation: lightSettings.elevation,
				},
				sceneVisible: scene.visible,
				axesVisible: axes.visible,
				showLightMarkers: lightMarkersSettings.showLightMarkers,
				postProcessing: {
					pixelSize: params.pixelSize,
					normalEdgeStrength: renderPixelatedPass.normalEdgeStrength,
				},
				colorSettings: {
					wheelColor: colorSettings.wheelColor,
					cabinColor: colorSettings.cabinColor,
					cameraPosition: {
						x: camera.position.x,
						y: camera.position.y,
						z: camera.position.z,
					},
				},
			};
			const dataStr =
				"data:text/json;charset=utf-8," +
				encodeURIComponent(JSON.stringify(settings));
			const downloadAnchorNode = document.createElement("a");
			downloadAnchorNode.setAttribute("href", dataStr);
			downloadAnchorNode.setAttribute("download", "settings.json");
			document.body.appendChild(downloadAnchorNode);
			downloadAnchorNode.click();
			downloadAnchorNode.remove();
		},
		import: (event) => {
			const file = event.target.files[0];
			const reader = new FileReader();
			reader.onload = (e) => {
				const settings = JSON.parse(e.target.result);
				Object.assign(physics, settings.physics);
				Object.assign(lightSettings, settings.lightSettings);
				light.intensity = lightSettings.lightIntensity;
				sunLight.intensity = lightSettings.sunIntensity;
				scene.visible = settings.sceneVisible;
				axes.visible = settings.axesVisible;
				lightMarkersSettings.showLightMarkers =
					settings.showLightMarkers;
				Object.assign(params, settings.postProcessing);
				Object.assign(colorSettings, settings.colorSettings);
				updateWheelColor(colorSettings.wheelColor);
				updateCabinColor(colorSettings.cabinColor);
				updateSunLightPosition();
				renderPixelatedPass.setPixelSize(params.pixelSize);
				camera.position.set(
					settings.colorSettings.cameraPosition.x,
					settings.colorSettings.cameraPosition.y,
					settings.colorSettings.cameraPosition.z
				);
				gui.updateDisplay();
			};
			reader.readAsText(file);
		},
	};

	const exportFolder = gui.addFolder("Export/Import Settings");
	exportFolder.add(exportSettings, "export").name("Export Settings");
	const importInput = document.createElement("input");
	importInput.type = "file";
	importInput.accept = ".json";
	importInput.style.display = "none";
	importInput.addEventListener("change", exportSettings.import);
	document.body.appendChild(importInput);
	exportFolder
		.add({ import: () => importInput.click() }, "import")
		.name("Import Settings");
	exportFolder.open();

	gui.close();

	return physics;
};

export default debugGUI;
