# Ferris Wheel Simulation

Welcome to the Ferris Wheel Simulation project. This project demonstrates a 3D Ferris wheel simulation using Three.js, complete with physics for swinging cabins and a debug GUI for adjusting various parameters.

## Table of Contents

-   [Introduction](#introduction)
-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Contributing](#contributing)
-   [License](#license)

## Introduction

This project showcases a 3D Ferris wheel simulation built with Three.js. It includes physics for swinging cabins and a debug GUI for real-time adjustments of various parameters such as swing amplitude, swing speed, and rotation speed.

## Features

-   3D Ferris wheel with rotating cabins
-   Physics for swinging cabins
-   Debug GUI for adjusting physics and light settings
-   Responsive design

## Installation

To get started with the project, clone this repository and install the dependencies:

```bash
git clone https://github.com/bckslash/Ferris-Wheel.git
cd Ferris-Wheel
npm install
```

```bash
npm run dev
```

# Projektná Dokumentácia (Slovensky)

Tento projekt demonštruje počítačovú grafiku s použitím knižníc Three.js, lil-gui a ďalších nástrojov. Obsahuje interaktívne moduly, post-processing efekty a ovládanie kamery.

## Hlavné Funkcie a Súbory

### main.js

-   Zodpovedný za vytvorenie scény, kamery a renderera.
-   Pridáva Ferris Wheel (koleso) a iné modely do scény.
-   Obsahuje animáciu a logiku na presun kamery do kabínky na kolotoči.

### /src/utils/resize.js

-   Stará sa o zmenu veľkosti okna – aktualizuje rozmery kamery, renderera a post-processing.
-   Umožňuje responzívne prispôsobenie scény pri zmene veľkosti okna.

### /src/scene/wheel.js

-   Vytvára samotné koleso (“Ferris Wheel”), jednotlivé kabínky a ostatné 3D objekty.
-   Umožňuje meniť farbu kolesa a kabíniek cez funkcie updateWheelColor() a updateCabinColor().

### /src/scene/lights.js

-   Inicializuje osvetlenie – DirectionalLight reprezentujúce slnko a PointLight pre dodatočné osvetlenie.
-   Umožňuje manipuláciu s intenzitou a polohou svetiel.

### /src/scene/tree.js

-   Obsahuje triedu Tree a funkcie na načítanie rôznych modelov stromov (klasický strom, borovica, jabloň).
-   Vytvorením viacerých stromov dokáže vytvoriť prírodnú scenériu okolo kolesa.

### /src/scene/island.js

-   Vytvára ostrov – zelenú plochu, trávu, stánky a iné modely pre obohatenie scény.
-   Umožňuje takto tvoriť detaily a dekorácie do prostredia.

### /src/gui/debugGUI.js

-   Slúži na zobrazovanie GUI panelu s možnosťou nastavenia rôznych parametrov scény, napr:
    -   Physics (amplitúda hojdačky, rýchlosť rotácie),
    -   Osvetlenie (intenzita, azimut),
    -   Post-processing (pixelSize, normalEdgeStrength),
    -   Farby kolesa a kabíniek,
    -   Export a import nastavení (kde sa ukladajú parametre do JSON súboru).

### /src/components/githubBanner.js, /src/components/controls.js

-   Voliteľné komponenty, ktoré zobrazujú bannery s informáciami o projekte (GitHub link, ovládanie).

## Postup Spustenia

1. Nainštalujte potrebné závislosti (napr. npm install).
2. Spustite lokálny server (napr. pomocou Vite, Webpack alebo iného nástroja).
3. Otvorte prehliadač na adrese, kde beží server (http://localhost:5173).

## Kódové ukážky

### Hlavná slučka animácie (main.js)

```js
function animate() {
	requestAnimationFrame(animate);
	// Orbit/Odchyt vstupu alebo pohyb
	// ...existing code...
	composer.render();
}
```

Tento blok zabezpečuje nepretržité vykresľovanie scény a spracovanie animácie.

### GUI nastavenia (debugGUI.js)

```js
const exportSettings = {
	export: () => {
		// Uloženie parametrov do JSON súboru
		// ...existing code...
	},
	import: (event) => {
		// Načítanie parametrov z JSON súboru
		// ...existing code...
	},
};
```

Tu sa rieši export a import konfiguračných parametrov scény (osvetlenie, pozície kamery, atď.) do JSON súboru.

## Zhrnutie

Tento projekt demonštruje rôzne grafické a interaktívne prvky – animáciu Ferris Wheel, pohyb kamery, import a export nastavení scény, zvládnutie svetiel i tieňovania. Každý súbor je zameraný na inú časť funkcionality, vďaka čomu je kód prehľadnejší a ľahšie udržiavateľný.

## Ďalšie kódové ukážky

Nasledujúce úryvky ukazujú rôzne časti kódu s krátkym vysvetlením, ako v projekte fungujú.

### Snippet 1: Vytváranie scény (main.js)

```js
// ...existing code...
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Nastavenie farby na čiernu
// ...existing code...
```

Scénu vytvárame pomocou Three.js. Nastavujeme základnú farbu pozadia na čiernu (0x000000).

### Snippet 2: Vytváranie kamery (main.js)

```js
// ...existing code...
const camera = new THREE.PerspectiveCamera(
	50,
	sizes.width / sizes.height,
	0.1,
	1000
);
camera.position.z = 20;
// ...existing code...
```

Tu je ukážka perspektívnej kamery s FOV 50, ktorá je od objektov vzdialená defaultne o 20 jednotiek pozdĺž osi Z.

### Snippet 3: Vznik základného kolesa (wheel.js)

```js
// ...existing code...
const wheel1 = new THREE.Mesh(
	new THREE.TorusGeometry(5, 0.15, 32, 10),
	wheelMaterial
);
// ...existing code...
```

Pre tvorbu kolotočového kolesa (Ferris Wheel) využívame torus (toroid). Využitie TorusGeometry uľahčuje vytvoriť kruhový tvar so šírkou, hrúbkou a počtom segmentov.

### Snippet 4: Osvetlenie scény (lights.js)

```js
// ...existing code...
const sunLight = new THREE.DirectionalLight(0xffffff, 1);
sunLight.position.set(0, 45, 30);
sunLight.castShadow = true;
// ...existing code...
```

Tento úryvok využíva DirectionalLight pre osvetlenie scény podobné slnku. Nastavujeme polohu a povolenie tieňov (castShadow).

### Snippet 5: Nastavenie tieňov (main.js)

```js
// ...existing code...
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// ...existing code...
```

Zapnutie tieňov v rendereri a použitie jemnejšieho tieňového typu PCFSoftShadowMap pre realistickejší vzhľad.

### Snippet 6: Interaktivita GUI (debugGUI.js)

```js
// ...existing code...
const physicsFolder = gui.addFolder("Physics");
physicsFolder.add(physics, "swingAmplitude", 0, 1).name("Swing Amplitude");
// ...existing code...
```

Pomocou lil-gui vytvárame interaktívne ovládanie fyzikálnych parametrov. Umožňujeme meniť amplitúdu hojdania kolesových kabínok.

### Snippet 7: Post-processing efekt (main.js)

```js
// ...existing code...
const renderPixelatedPass = new RenderPixelatedPass(4, scene, camera);
composer.addPass(renderPixelatedPass);
// ...existing code...
```

Kombinujeme composery a rendery pre “pixelovaný” post-processing. Hodnota 4 určuje mieru pixelácie.

### Snippet 8: Kolízia s kabínou (main.js)

```js
// ...existing code...
const intersects = raycaster.intersectObjects(cabins);
if (intersects.length > 0) {
	selectedCabin = intersects[0].object.parent;
	// ...existing code...
}
// ...existing code...
```

Použitie Raycastera umožňuje zisťovať, či užívateľ klikol na kabínu (intersekcia s 3D objektom).

### Snippet 9: Základné nastavenie stromu (tree.js)

```js
// ...existing code...
if (child.isMesh) {
	child.castShadow = true;
	child.receiveShadow = true;
}
// ...existing code...
```

Pri načítaní stromu z GLB modelu zapíname vrhanie a prijímanie tieňov, čím je scéna vizuálne pútavejšia.

### Snippet 10: Funkcia init ostrovčeka (island.js)

```js
// ...existing code...
function createIsland(scene) {
	const ground = new THREE.Mesh(
		new THREE.CylinderGeometry(20, 20, 1, 16),
		new THREE.MeshStandardMaterial({ color: 0x00ff00 })
	);
	// ...existing code...
	scene.add(ground);
}
// ...existing code...
```

Vytvárame základný valec predstavujúci ostrov. Nastavujeme mu materiál s použitou textúrou a pridávame ho do scény.
