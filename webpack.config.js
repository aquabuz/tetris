const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },

  devServer: {
    host: "localhost",
    port: 8080,
    // https: true
  },

  module: {
    rules: [
			{
        // test: /\.scss$/,
        test: /\.s|css$/,
          use: [{
            loader: "style-loader"
          }, {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }, {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }]
				// use: ["style-loader", "css-loader", "sass-loader"] // css type을 바꾼 후, style을 적용해야 되므로 순서에 유의할 것 (LIFO)
			},
      {
				test: /\.js$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			}
		]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'myApp',
      template: path.resolve(__dirname, 'src', 'index.html')
    }),
  ]

}