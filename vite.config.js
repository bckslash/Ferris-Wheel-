import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";

export default defineConfig({
	plugins: [glsl()], // Adds GLSL shader support
	server: {
		port: 5173, // Optional: Change default dev server port
	},
	build: {
		outDir: "dist", // Output directory for production builds
	},
});
