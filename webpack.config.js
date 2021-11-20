const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

let htmlPageNames = ['login', 'join'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: [`${name}`] // respective JS files
  })
});

module.exports = {

  mode:"development",

  entry: {
    main: './src/index.js',
    login: './src/login.js',
    join: './src/join.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].js',
    sourceMapFilename: '[name].[hash:8].map',
    chunkFilename: '[id].[hash:8].js'
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
      template: path.resolve(__dirname, 'src', 'index.html'),
      filename: 'index.html',
      chunks: ['main'],
    }),
  ].concat(multipleHtmlPlugins)

}