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
        <p><strong>Controls:</strong></p>
        <p>Right-click on a cabin to enter it.</p>
        <p>"x" to exit the cabin.</p>
    `;
	document.body.appendChild(banner);
};

export default controlsBanner;
