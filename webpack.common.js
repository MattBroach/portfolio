const path = require('path')

module.exports = {
  entry: {
    landing: './src/js/landing.js',
    menu: './src/js/menu.js',
    project: './src/js/project.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/,
      },
    ]
  },
  output: {
    filename: '[name]-[hash].js',
    path: path.resolve(__dirname, 'build', 'js'),
  }
}
