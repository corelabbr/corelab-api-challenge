import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src") // Ajuste o caminho para o diretório correto
		}
	},
	test: {
		// Outras configurações do Vitest
	}
});
