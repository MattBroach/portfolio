const path = require('path')

module.exports = {
  entry: {
    landing: './src/js/landing.js' 
  },
  module: {
    rules: [
      {
        test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/,
      },
    ]
  },
  output: {
    filename: '[name]-[has].js',
    path: path.resolve(__dirname, 'build', 'js'),
  }
}
