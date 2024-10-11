const controlsBanner = () => {
	const banner = document.createElement("div");
	banner.style.display = "flex";
	banner.style.flexDirection = "column";
	banner.style.position = "absolute";
	banner.style.bottom = "10px";
	banner.style.left = "10px";
	banner.style.padding = "10px";
	banner.style.color = "white";
	banner.style.fontFamily = "Arial, sans-serif";
	banner.style.fontSize = "14px";
	banner.style.zIndex = "1000";
	banner.style.gap = "5px";

	banner.innerHTML = `
        <p>Right-click to enter cabin</p>
        <p>"X" to exit</p>
    `;
	document.body.appendChild(banner);
};

export default controlsBanner;
