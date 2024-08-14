import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/server.ts"], // Arquivo de entrada principal
	outDir: "dist", // Pasta de saída
	sourcemap: true, // Gerar sourcemaps
	clean: true, // Limpar a pasta de saída antes de buildar
	format: ["cjs", "esm"], // Formatos de saída (CommonJS e ESM)
	target: "node18", // Versão alvo do Node.js
	splitting: false, // Evitar code splitting (mais comum para APIs)
	dts: true, // Gerar arquivos .d.ts (declarações de TypeScript)
	minify: true // Minificar o código
});
