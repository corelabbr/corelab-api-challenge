module.exports = {
  extends: [
    'eslint:recommended', // Regras recomendadas do ESLint
    'plugin:@typescript-eslint/recommended', // Regras recomendadas para TypeScript
    'plugin:adonis/recommended', // Regras específicas para AdonisJS
    'plugin:prettier/recommended', // Integração com Prettier
  ],
  plugins: ['@typescript-eslint', 'adonis', 'prettier'],
  parserOptions: {
    ecmaVersion: 2021, // Versão do ECMAScript
    sourceType: 'module', // Usar módulos ES
  },
  rules: {
    'prettier/prettier': 'error', // Mostrar erros do Prettier como erros do ESLint
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Desativar exigência de tipos explícitos
    '@typescript-eslint/no-explicit-any': 'off', // Permitir o uso de `any`
  },
  env: {
    node: true, // Ambiente Node.js
    es2021: true, // Usar recursos do ES2021
  },
};
