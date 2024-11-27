const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Automatically generates the index.html

// Load your Webpack rules
const rules = require('./webpack.rules');

// Add a rule for CSS processing
rules.push({
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
});

// Export the configuration
module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development', // Use appropriate mode
  entry: './src/renderer.js', // Entry point for the renderer process
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory for bundled files
    filename: 'renderer.js', // Output filename
  },
  target: 'electron-renderer', // Target Electron's renderer process
  module: {
    rules, // Use your existing rules plus the CSS rule
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Path to your main HTML template
      filename: 'index.html', // Output HTML file
    }),
  ],
  devServer: {
    port: 3000, // Port for the Webpack Dev Server
    hot: true, // Enable Hot Module Replacement
    static: {
      directory: path.resolve(__dirname, 'dist'), // Serve static files from dist folder
    },
  },
};
