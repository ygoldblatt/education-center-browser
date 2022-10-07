
const path = require('path');

module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.(png|gif)$/,
    loader: 'file-loader'
  },
  {
    test: /\.jpg$/,
    loader: 'file-loader'
  },
  {
    test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
    loader: 'file-loader',
    options: {
      name: '[name].[hash].[ext]',
      outputPath: 'static/fonts',
      publicPath: './../static/fonts',
      limit: 10000
    }
  },


  
  // Put your webpack loader rules in this array.  This is where you would put
  // your ts-loader configuration for instance:
  /**
   * Typescript Example:
   *
   * {
   *   test: /\.tsx?$/,
   *   exclude: /(node_modules|.webpack)/,
   *   loaders: [{
   *     loader: 'ts-loader',
   *     options: {
   *       transpileOnly: true
   *     }
   *   }]
   * }
   */
];
