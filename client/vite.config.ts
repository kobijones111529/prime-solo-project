import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const port = Number(process.env["SERVER_PORT"]) || 5000;

export default defineConfig({
	build: {
		outDir: "build",
	},
	plugins: [react()],
	server: {
		proxy: {
			"^/api/": {
				target: `http://localhost:${port}`,
				changeOrigin: true,
			},
		},
	},
});
