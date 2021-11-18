const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {

  mode:"development",

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },

  devServer: {
    host: "localhost",
    port: 8080,
  },

  module: {
    rules: [
      {
				test: /\.js$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.s|css$/,
          use: [
            {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
			},
      {
        test: /\.(jpe?g|png|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[hash][ext]'
        }
      },
		]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')
    }),
  ]

}