const aboutButton = () => {
	const banner = document.createElement("div");
	banner.style.position = "absolute";
	banner.style.top = "10px";
	banner.style.left = "50px";
	banner.style.padding = "5px";
	banner.style.borderRadius = "3px";
	banner.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" viewBox="0 0 24 24">
        <path fill="#ffffff" d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.033 16.01c.564-1.789 1.632-3.932 1.821-4.474.273-.787-.211-1.136-1.74.209l-.34-.64c1.744-1.897 5.335-2.326 4.113.613-.763 1.835-1.309 3.074-1.621 4.03-.455 1.393.694.828 1.819-.211.153.25.203.331.356.619-2.498 2.378-5.271 2.588-4.408-.146zm4.742-8.169c-.532.453-1.32.443-1.761-.022-.441-.465-.367-1.208.164-1.661.532-.453 1.32-.442 1.761.022.439.466.367 1.209-.164 1.661z"/>
    </svg>
`;

	document.body.appendChild(banner);

	const modal = document.createElement("div");
	modal.innerHTML =
		"Robert Smrek<br/>Dušan Mikloš<br/><br/>KPI FEI TUKE<br/>2024/2025";
	modal.style.position = "absolute";
	modal.style.fontFamily = "Arial, sans-serif";
	modal.style.fontSize = "14px";
	modal.style.top = "40px";
	modal.style.left = "70px";
	modal.style.padding = "10px";
	modal.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
	modal.style.color = "rgba(0, 0, 0, 0.8)";
	modal.style.borderRadius = "8px";
	modal.style.display = "none";
	document.body.appendChild(modal);

	banner.addEventListener("mouseover", () => {
		modal.style.display = "block";
	});
	banner.addEventListener("mouseout", () => {
		modal.style.display = "none";
	});
};

export default aboutButton;
