// CustomJsonReporter.js
const fs = require('fs');
const path = require('path');

class CustomJsonReporter {
    constructor(globalConfig, options) {
        this._globalConfig = globalConfig;
        this._options = options || {};
    }

    onRunComplete(contexts, results) {
        const outputPath = this._options.outputPath || 'test-results.json';
        // Escreve o arquivo com indentação de 2 espaços para formatação legível
        fs.writeFileSync(
            path.resolve(outputPath),
            JSON.stringify(results, null, 2),
            'utf8'
        );
        console.log(`\nArquivo de resultados gerado em: ${outputPath}`);
    }
}

module.exports = CustomJsonReporter;
