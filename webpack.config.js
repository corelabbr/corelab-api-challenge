/* eslint-disable node/no-unpublished-require */
const path = require('path')
const NodemonPlugin = require('nodemon-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  target: 'node',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new NodemonPlugin(),
    new ESLintPlugin({
      extensions: ['js', 'ts']
    })
  ],
  externals: [nodeExternals()]
}
